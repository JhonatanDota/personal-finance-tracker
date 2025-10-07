import { useEffect, useState } from "react";

import { TABLE_SEARCH_DELAY_MS } from "../constants/delay";

export function useDebounce<T>(
  value: T,
  delay: number = TABLE_SEARCH_DELAY_MS
): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
