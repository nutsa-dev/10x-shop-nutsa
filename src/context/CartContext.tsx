import { createContext, useContext, useState, useEffect, useMemo } from "react";
import type { CartItem } from "@/types/cart";
import type { Product } from "@/types/product";
import { getDiscountedPrice } from "@/utils/format";
import { storageGet, storageGetJSON, storageRemove, storageSet } from "@/utils/storage";

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  rawSubtotal: number;
  subtotal: number;
  savings: number;
  promoCode: string | null;
  promoDiscount: number;
  totalPrice: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "shop_cart";
const PROMO_STORAGE_KEY = "shop_promo";

function isCartItem(val: unknown): val is CartItem {
  if (!val || typeof val !== "object") return false;
  const obj = val as Record<string, unknown>;
  return (
    typeof obj.productId === "number" &&
    typeof obj.title === "string" &&
    typeof obj.price === "number" &&
    typeof obj.quantity === "number"
  );
}

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const parsed = storageGetJSON<unknown>(CART_STORAGE_KEY, []);
    const rawList = Array.isArray(parsed)
      ? parsed
      : parsed && typeof parsed === "object" && Array.isArray((parsed as Record<string, unknown>).items)
      ? (parsed as Record<string, unknown>).items
      : [];
    return Array.isArray(rawList) ? rawList.filter(isCartItem) : [];
  });

  const [promoCode, setPromoCode] = useState<string | null>(() => {
    return storageGet(PROMO_STORAGE_KEY);
  });

  // LocalStorage sync
  useEffect(() => {
    const safeItems = Array.isArray(items) ? items : [];
    storageSet(CART_STORAGE_KEY, JSON.stringify(safeItems));
  }, [items]);

  useEffect(() => {
    if (promoCode) {
      storageSet(PROMO_STORAGE_KEY, promoCode);
    } else {
      storageRemove(PROMO_STORAGE_KEY);
    }
  }, [promoCode]);

  // Add product to cart
  const addItem = (product: Product, quantity = 1) => {
    if (product.stock <= 0) return;

    setItems((prevItems) => {
      const currentList = Array.isArray(prevItems) ? prevItems : [];
      const existingIndex = currentList.findIndex((i) => i.productId === product.id);

      if (existingIndex > -1) {
        const existing = currentList[existingIndex];
        const newQuantity = Math.min(existing.quantity + quantity, product.stock);

        const updated = [...currentList];
        updated[existingIndex] = {
          ...existing,
          quantity: newQuantity,
          stock: product.stock,
          price: product.price,
          discountPercentage: product.discountPercentage,
        };
        return updated;
      }

      const newItem: CartItem = {
        productId: product.id,
        title: product.title,
        thumbnail: product.thumbnail,
        price: product.price,
        discountPercentage: product.discountPercentage,
        stock: product.stock,
        quantity: Math.min(Math.max(1, quantity), product.stock),
      };

      return [...currentList, newItem];
    });
  };

  // Remove from cart
  const removeItem = (productId: number) => {
    setItems((prev) => {
      const currentList = Array.isArray(prev) ? prev : [];
      return currentList.filter((item) => item.productId !== productId);
    });
  };

  // Update item quantity
  // Update item quantity (strictly 1 <= quantity <= stock)
  const updateQuantity = (productId: number, quantity: number) => {
    setItems((prev) => {
      const currentList = Array.isArray(prev) ? prev : [];
      return currentList.map((item) => {
        if (item.productId === productId) {
          const clampedQty = Math.max(1, Math.min(quantity, item.stock));
          return { ...item, quantity: clampedQty };
        }
        return item;
      });
    });
  };

  // Clear cart
  const clearCart = () => {
    setItems([]);
    setPromoCode(null);
  };

  // Promo code
  const applyPromoCode = (code: string): boolean => {
    const formatted = code.trim().toUpperCase();
    if (formatted === "10X10") {
      setPromoCode("10X10");
      return true;
    }
    return false;
  };

  const removePromoCode = () => {
    setPromoCode(null);
  };

  // Consistent calculations with getDiscountedPrice
  const { totalItems, rawSubtotal, subtotal, promoDiscount, totalPrice, savings } =
    useMemo(() => {
      const safeItems = Array.isArray(items) ? items : [];
      let count = 0;
      let rawTotal = 0;
      let discountedTotal = 0;

      for (const item of safeItems) {
        count += item.quantity;
        rawTotal += item.price * item.quantity;
        const unitPrice = getDiscountedPrice(item.price, item.discountPercentage);
        discountedTotal += unitPrice * item.quantity;
      }

      // Promo Code 10X10 -> 10% discount on top of atelier prices
      const promoRate = promoCode === "10X10" ? 0.1 : 0;
      const promoSaving = discountedTotal * promoRate;
      const finalPrice = Math.max(0, discountedTotal - promoSaving);
      const totalSavings = (rawTotal - discountedTotal) + promoSaving;

      return {
        totalItems: count,
        rawSubtotal: Number(rawTotal.toFixed(2)),
        subtotal: Number(discountedTotal.toFixed(2)),
        promoDiscount: Number(promoSaving.toFixed(2)),
        totalPrice: Number(finalPrice.toFixed(2)),
        savings: Number(totalSavings.toFixed(2)),
      };
    }, [items, promoCode]);

  const safeItems = Array.isArray(items) ? items : [];

  return (
    <CartContext.Provider
      value={{
        items: safeItems,
        totalItems,
        rawSubtotal,
        subtotal,
        savings,
        promoCode,
        promoDiscount,
        totalPrice,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        applyPromoCode,
        removePromoCode,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
