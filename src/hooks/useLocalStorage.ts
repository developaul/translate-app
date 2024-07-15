import { useState, useEffect } from "react";

function getStorageValue<T>(key: string, defaultValue: T) {
  // getting stored value
  if (typeof window === "undefined") return;

  const saved = localStorage.getItem(key);
  if (!saved) return defaultValue;

  const initial = JSON.parse(saved);
  return initial || defaultValue;
}

export const useLocalStorage = <T>(key: string, defaultValue: T) => {
  const [value, setValue] = useState(() => {
    return getStorageValue<T>(key, defaultValue);
  });

  useEffect(() => {
    // storing input name
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
