import { Tool } from "../../enums/Tool"
import SelectionButton from "../SelectionButton"
import classes from "./Header.module.scss"

type HeaderProps = {
    selectedTool: Tool
    setSelectedTool: (tool: Tool) => void
    setSelectedToolSize: (size: number) => void
}

const Header = ({ selectedTool, setSelectedTool, setSelectedToolSize }: HeaderProps) => {
    const tools = [
        Tool.POINTER,
        Tool.BRUSH
    ]

    const toolSizes = [
        1,
        2,
        4,
        8
    ]

    return (
        <div className="d-flex p-2 bg-secondary">
            <div className={`${classes.container} d-flex`}>
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
            {
                selectedTool === Tool.BRUSH &&
                <div className="ms-2">
                    <span className="me-2">Brush size:</span>
                    <select onChange={e => setSelectedToolSize(Number(e.target.value))}>
                        {
                            toolSizes.map(size => <option key={size} value={size}>{size}</option>)
                        }
                    </select>
                </div>
            }
        </div>
    )
}

export default Header