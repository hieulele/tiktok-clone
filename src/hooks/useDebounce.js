import { useState, useEffect } from "react";

function useDebounce(value, delay) {
    const [debounceValue, setDebouceValue] = useState(value);

    useEffect(() => {
        const handle = setTimeout(() => {
            setDebouceValue(value)
        }, delay);

        return () => clearTimeout(handle)
    },[value])

    return debounceValue;
}

export default useDebounce;