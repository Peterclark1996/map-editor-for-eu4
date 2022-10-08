import Header from "./Header"
import Inspector from "./Inspector"
import Map from "./Map"
import classes from "./LoadedProject.module.scss"
import MapModes from "./MapModes"
import Info from "./Info"
import { useReducer, useState } from "react"
import { Colour } from "../../types/Colour"
import projectReducer from "../../actions/projectReducer"
import { Project } from "../../types/Project"
import { Tool } from "../../enums/Tool"
import { MapMode } from "../../enums/MapMode"

type LoadedProjectProps = {
    defaultProject: Project
}

const LoadedProject = ({ defaultProject }: LoadedProjectProps) => {
    const [state, dispatch] = useReducer(projectReducer, defaultProject)

    const [selectedProvinceColour, setSelectedProvinceColour] = useState<Colour | undefined>()
    const [selectedTool, setSelectedTool] = useState(Tool.POINTER)
    const [selectedMapMode, setSelectedMapMode] = useState(MapMode.POLITICAL)

    return (
        <div className={`${classes.container} h-100`}>
            <Info />
            <Header selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
            <MapModes selectedMapMode={selectedMapMode} setSelectedMapMode={setSelectedMapMode} />
            <Map state={state} selectedTool={selectedTool} selectedProvinceColour={selectedProvinceColour} onProvinceSelected={setSelectedProvinceColour} dispatch={dispatch} />
            <Inspector state={state} selectedProvinceColour={selectedProvinceColour} />
        </div>
    )
}

export default LoadedProject