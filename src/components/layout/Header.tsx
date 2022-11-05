import { InterfaceAction, InterfaceActionTypes } from "../../actions/interfaceReducer"
import { Tool } from "../../enums/Tool"
import { InterfaceState } from "../../types/InterfaceState"
import SelectionButton from "../SelectionButton"
import classes from "./Header.module.scss"

type HeaderProps = {
    interfaceState: InterfaceState
    interfaceDispatch: (action: InterfaceAction) => void
}

const Header = ({ interfaceState, interfaceDispatch }: HeaderProps) => {
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
                            selected={interfaceState.tool === tool}
                            onClick={() => interfaceDispatch({ type: InterfaceActionTypes.TOOL_UPDATED, tool })}
                        />
                    ))
                }
            </div>
            {
                interfaceState.tool === Tool.BRUSH &&
                <div className="ms-2">
                    <span className="me-2">Brush size:</span>
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