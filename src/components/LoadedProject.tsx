import Header from "./Header"
import Inspector from "./Inspector"
import Map from "./Map"
import classes from "./LoadedProject.module.scss"
import Tools from "./Tools"
import Info from "./Info"
import { useReducer, useState } from "react"
import { Colour } from "../types/Colour"
import reducer from "../actions/reducer"
import { Project } from "../types/Project"

type LoadedProjectProps = {
    defaultProject: Project
}

const LoadedProject = ({ defaultProject }: LoadedProjectProps) => {
    const [state, dispatch] = useReducer(reducer, defaultProject)

    const [selectedProvinceColour, setSelectedProvinceColour] = useState<Colour | undefined>()

    return (
        <div className={`${classes.container} h-100`}>
            <Info />
            <Header />
            <Tools />
            <Map state={state} onProvinceSelected={setSelectedProvinceColour} />
            <Inspector state={state} selectedProvinceColour={selectedProvinceColour} />
        </div>
    )
}

export default LoadedProject