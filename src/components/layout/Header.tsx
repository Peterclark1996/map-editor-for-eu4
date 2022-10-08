import { Tool } from "../../enums/Tool"
import SelectionButton from "../SelectionButton"
import classes from "./Header.module.scss"

type HeaderProps = {
    selectedTool: Tool
    setSelectedTool: (tool: Tool) => void
}

const Header = ({ selectedTool, setSelectedTool }: HeaderProps) => {
    const tools = [
        Tool.POINTER,
        Tool.BRUSH
    ]

    return (
        <div className={`${classes.container} d-flex p-2 bg-secondary`}>
            {
                tools.map(tool => (
                    <SelectionButton
                        key={tool}
                        iconName={Tool[tool]}
                        selected={selectedTool === tool}
                        onClick={() => setSelectedTool(tool)}
                    />
                ))
            }
        </div>
    )
}

export default Header