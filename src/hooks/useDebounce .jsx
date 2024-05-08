import { useEffect, useState } from 'react';

const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value)

    const handler = setTimeout(() => {
        setDebouncedValue(value)
    },delay)

    useEffect(()=>{
        clearTimeout(handler)
    },[value, delay])

    return debouncedValue;
}

export default useDebounce;