import { useState, useEffect } from "react";

/**
 * useDebounce - მნიშვნელობის დაყოვნება (default: 400ms)
 * გამოიყენება საძიებო ველში ზედმეტი რექვესთების თავიდან ასაცილებლად.
 */
export function useDebounce<T>(value: T, delay = 400): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
