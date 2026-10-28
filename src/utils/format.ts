/**
 * ფასის ფორმატირება ($X.XX)
 */
export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

/**
 * ფასდაკლებული ფასის გამოთვლა
 */
export function getDiscountedPrice(price: number, discountPercentage: number): number {
  if (discountPercentage <= 1) return price;
  const discounted = price * (1 - discountPercentage / 100);
  return Number(discounted.toFixed(2));
}

/**
 * თარიღის ფორმატირება
 */
export function formatDate(dateString?: string): string {
  if (!dateString) return "";
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateString;
  }
}
