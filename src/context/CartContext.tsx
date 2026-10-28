import { createContext, useContext, useState, useEffect, useMemo } from "react";
import type { CartItem } from "@/types/cart";
import type { Product } from "@/types/product";

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

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved) as CartItem[];
      }
    } catch (e) {
      console.error("Failed to load cart from localStorage", e);
    }
    return [];
  });

  const [promoCode, setPromoCode] = useState<string | null>(() => {
    try {
      return localStorage.getItem(PROMO_STORAGE_KEY);
    } catch {
      return null;
    }
  });

  // LocalStorage სინქრონიზაცია
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [items]);

  useEffect(() => {
    try {
      if (promoCode) {
        localStorage.setItem(PROMO_STORAGE_KEY, promoCode);
      } else {
        localStorage.removeItem(PROMO_STORAGE_KEY);
      }
    } catch (e) {
      console.error("Failed to save promoCode to localStorage", e);
    }
  }, [promoCode]);

  // პროდუქტის დამატება კალათაში
  const addItem = (product: Product, quantity = 1) => {
    if (product.stock <= 0) return;

    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((i) => i.productId === product.id);

      if (existingIndex > -1) {
        const existing = prevItems[existingIndex];
        const newQuantity = Math.min(existing.quantity + quantity, product.stock);

        const updated = [...prevItems];
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

      return [...prevItems, newItem];
    });
  };

  // კალათიდან ამოშლა
  const removeItem = (productId: number) => {
    setItems((prev) => prev.filter((item) => item.productId !== productId));
  };

  // რაოდენობის შეცვლა
  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }

    setItems((prev) =>
      prev.map((item) => {
        if (item.productId === productId) {
          const clampedQty = Math.min(quantity, item.stock);
          return { ...item, quantity: clampedQty };
        }
        return item;
      })
    );
  };

  // კალათის სრული გასუფთავება
  const clearCart = () => {
    setItems([]);
    setPromoCode(null);
  };

  // პრომო კოდის გამოყენება (PRD: "10X10" იძლევა 10%-იან ფასდაკლებას)
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

  // გამოთვლები
  const { totalItems, rawSubtotal, subtotal, promoDiscount, totalPrice, savings } =
    useMemo(() => {
      let count = 0;
      let rawTotal = 0;
      let discountedTotal = 0;

      for (const item of items) {
        count += item.quantity;
        rawTotal += item.price * item.quantity;

        const hasDiscount = item.discountPercentage > 1;
        const unitPrice = hasDiscount
          ? item.price * (1 - item.discountPercentage / 100)
          : item.price;

        discountedTotal += unitPrice * item.quantity;
      }

      // Promo Code 10X10 -> 10% ფასდაკლება
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

  return (
    <CartContext.Provider
      value={{
        items,
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
