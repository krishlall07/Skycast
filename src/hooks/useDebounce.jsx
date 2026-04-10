// src/hooks/useDebounce.jsx
import { useState, useEffect } from 'react';

export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Start a timer when the user types
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // If the user types again BEFORE the delay is over, cancel the timer and restart
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}