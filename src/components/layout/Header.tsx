import { useState } from "react"
import SelectionButton, { SelectionButtonIcon } from "../SelectionButton"
import classes from "./Header.module.scss"

const Header = () => {
    const [selectedTool, setSelectedTool] = useState(SelectionButtonIcon.POINTER)

    return (
        <div className={`${classes.container} d-flex p-2`}>
            <SelectionButton
                icon={SelectionButtonIcon.POINTER}
                selected={selectedTool === SelectionButtonIcon.POINTER}
                onClick={() => setSelectedTool(SelectionButtonIcon.POINTER)}
            />
            <SelectionButton
                icon={SelectionButtonIcon.PAINT_BRUSH}
                selected={selectedTool === SelectionButtonIcon.PAINT_BRUSH}
                onClick={() => setSelectedTool(SelectionButtonIcon.PAINT_BRUSH)}
            />
        </div>
    )
}

export default Header