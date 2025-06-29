import { useEffect, useState } from 'react'

const useDebounce = (value, timeDelate) => {
  const [debounce, setDebounce] = useState('');
  
  useEffect(() => {
    const settime = setTimeout(() => {
      console.log("SS");
      setDebounce(value);
    }, timeDelate)
    return () => {
      clearTimeout(settime)
    }
  },[value, timeDelate])
  return debounce
}

export default useDebounce