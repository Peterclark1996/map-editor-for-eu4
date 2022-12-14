import { useCallback, useEffect, useRef } from "react"

const useOnClickOutsideRef = (onClickOutsideRef: () => void) => {
    const ref = useRef<HTMLDivElement | null>(null)

    const handleClickOutsideComponent = useCallback(
        (event: MouseEvent) => {
            if (!ref || !ref.current) return
            if (ref.current.contains(event.target as Node)) return

            onClickOutsideRef()
        },
        [onClickOutsideRef]
    )

    useEffect(() => {
        document.addEventListener("click", handleClickOutsideComponent)
        return () => document.removeEventListener("click", handleClickOutsideComponent)
    }, [handleClickOutsideComponent])

    return ref
}

export default useOnClickOutsideRef
