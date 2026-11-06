/**
 * ფასის ფორმატირება ($X,XXX.XX)
 */
export function formatPrice(price: number): string {
  const parts = Number(price || 0).toFixed(2).split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `$${parts.join(".")}`;
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
