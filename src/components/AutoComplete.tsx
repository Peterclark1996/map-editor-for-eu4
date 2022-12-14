import { ChangeEvent, useState, KeyboardEvent } from "react"
import useOnClickOutsideRef from "../hooks/useOnClickOutsideRef"
import classes from "./AutoComplete.module.scss"

type AutoCompleteProps = {
    inputText: string
    onInputTextUpdated: (text: string) => void
    options: string[]
    onOptionsSelected: (option: string) => void
}

const AutoComplete = ({
    inputText,
    onInputTextUpdated,
    options,
    onOptionsSelected
}: AutoCompleteProps) => {
    const [isDisplayingOptions, setIsDisplayingOptions] = useState(false)

    const ref = useOnClickOutsideRef(() => setIsDisplayingOptions(false))

    const onInputChange = (event: ChangeEvent<HTMLInputElement>) =>
        onInputTextUpdated(event.target.value)

    const onInputFocus = () => setIsDisplayingOptions(true)

    const filteredOptions = options.filter(option =>
        stringValue(option).includes(stringValue(inputText))
    )

    const onOptionClicked = (option: string) => {
        onInputTextUpdated(option)
        onOptionsSelected(option)
        setIsDisplayingOptions(false)
    }

    const onKeyPressed = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            if (filteredOptions.length > 0) {
                onInputTextUpdated(filteredOptions[0])
                onOptionsSelected(filteredOptions[0])
            }
            setIsDisplayingOptions(false)
        }
    }

    return (
        <div ref={ref} className="position-relative">
            <input
                className={`px-2 ${classes.input} ${isDisplayingOptions ? classes.focused : ""}`}
                value={inputText}
                onChange={onInputChange}
                onFocus={onInputFocus}
                onKeyDown={onKeyPressed}
            />
            {isDisplayingOptions && (
                <div className={`position-absolute px-2 py-1 ${classes.options}`}>
                    {filteredOptions.map(option => (
                        <div key={option} role="button" onClick={() => onOptionClicked(option)}>
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default AutoComplete

const stringValue = (text: string) => text.toLowerCase().replaceAll(/[^A-Za-z]+/g, "")
