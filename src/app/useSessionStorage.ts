import { useState, useEffect } from "react";

export default function useSessionStorage(key: string) {
  const [value, setValue] = useState<any>('')

  useEffect(() => {
    setValue(sessionStorage.getItem(key));
    console.log("useSessionStorage")
  }, [])

  return value;
}
