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
    const [projectState, projectDisptach] = useReducer(projectReducer, defaultProject)

    const [selectedProvinceColour, setSelectedProvinceColour] = useState<Colour | undefined>()
    const [selectedTool, setSelectedTool] = useState(Tool.POINTER)
    const [selectedMapMode, setSelectedMapMode] = useState(MapMode.POLITICAL)
    const [selectedToolSize, setSelectedToolSize] = useState(1)

    return (
        <div className={`${classes.container} h-100`}>
            <Info />
            <Header selectedTool={selectedTool} setSelectedTool={setSelectedTool} setSelectedToolSize={setSelectedToolSize} />
            <MapModes selectedMapMode={selectedMapMode} setSelectedMapMode={setSelectedMapMode} />
            <Map state={projectState} selectedTool={selectedTool} selectedToolSize={selectedToolSize} selectedProvinceColour={selectedProvinceColour} onProvinceSelected={setSelectedProvinceColour} dispatch={projectDisptach} />
            <Inspector state={projectState} selectedProvinceColour={selectedProvinceColour} />
        </div>
    )
}

export default LoadedProject