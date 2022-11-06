import { InterfaceAction, InterfaceActionTypes } from "../../actions/interfaceReducer"
import { Tool } from "../../enums/Tool"
import { InterfaceState } from "../../types/InterfaceState"
import ToolButton from "../ToolButton"
import classes from "./Header.module.scss"

type HeaderProps = {
    interfaceState: InterfaceState
    interfaceDispatch: (action: InterfaceAction) => void
}

const Header = ({ interfaceState, interfaceDispatch }: HeaderProps) => {
    const toolSizes = [
        1,
        2,
        4,
        8
    ]

    return (
        <div className={`${classes.container} d-flex background align-items-center`}>
            <div className="d-flex mx-2">
                <ToolButton
                    icon="fa-solid fa-arrow-pointer"
                    isSelected={interfaceState.tool === Tool.POINTER}
                    onClick={() => interfaceDispatch({ type: InterfaceActionTypes.TOOL_UPDATED, tool: Tool.POINTER })}
                />
            </div>
            <div className="d-flex me-2">
                <ToolButton
                    icon="fa-solid fa-paintbrush"
                    isSelected={interfaceState.tool === Tool.BRUSH}
                    onClick={() => interfaceDispatch({ type: InterfaceActionTypes.TOOL_UPDATED, tool: Tool.BRUSH })}
                />
            </div>
            {
                interfaceState.tool === Tool.BRUSH &&
                <div>
                    <span className="me-2 user-select-none">Brush size:</span>
                    <select onChange={e => interfaceDispatch({ type: InterfaceActionTypes.TOOL_SIZE_UPDATED, toolSize: Number(e.target.value) })}>
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