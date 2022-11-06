import { useState } from "react"
import { InterfaceAction, InterfaceActionTypes } from "../../actions/interfaceReducer"
import { Tool } from "../../enums/Tool"
import { InterfaceState } from "../../types/InterfaceState"
import Overlay from "../Overlay"
import SaveForm from "../SaveForm"
import ToolButton from "../ToolButton"
import classes from "./Header.module.scss"
import { Project } from "../../types/Project"

type HeaderProps = {
    path: string
    project: Project
    interfaceState: InterfaceState
    interfaceDispatch: (action: InterfaceAction) => void
}

const Header = ({ path, project, interfaceState, interfaceDispatch }: HeaderProps) => {
    const [isShowingSaveOverlay, setIsShowingSaveOverlay] = useState(false)

    const toolSizes = [1, 2, 4, 8]

    const onClose = () => setIsShowingSaveOverlay(false)

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
                    <select
                        role="button"
                        value={interfaceState.toolSize}
                        className={classes.select}
                        onChange={e => interfaceDispatch({ type: InterfaceActionTypes.TOOL_SIZE_UPDATED, toolSize: Number(e.target.value) })}
                    >
                        {
                            toolSizes.map(size => <option key={size} value={size}>{size}</option>)
                        }
                    </select>
                </div>
            }
            <div className="d-flex ms-auto me-2">
                <ToolButton
                    icon="fa-regular fa-floppy-disk"
                    isSelected={false}
                    onClick={() => setIsShowingSaveOverlay(true)}
                />
            </div>
            {
                isShowingSaveOverlay &&
                <Overlay onOutsideClick={onClose}>
                    <SaveForm project={project} path={path} onClose={onClose} />
                </Overlay>
            }
        </div>
    )
}

export default Header