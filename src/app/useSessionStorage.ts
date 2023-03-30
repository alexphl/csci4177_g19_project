import { useState, useEffect } from "react";

export default function useSessionStorage(key: string) {
  const [value, setValue] = useState<string | null>('')

  useEffect(() => {
    setValue(sessionStorage.getItem(key));
    console.log("useSessionStorage")
  }, [key])

  return value;
}
