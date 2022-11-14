import Header from "./Header"
import Inspector from "./Inspector"
import Map from "./Map"
import classes from "./LoadedProject.module.scss"
import MapModes from "./MapModes"
import Info from "./Info"
import { useReducer } from "react"
import projectReducer from "../../actions/projectReducer"
import { Project } from "../../types/Project"
import interfaceReducer, { InterfaceActionTypes } from "../../actions/interfaceReducer"
import { defaultInterfaceState } from "../../types/InterfaceState"
import { MapMode } from "../../enums/MapMode"
import { HostState } from "../../types/HostState"
import InspectorHeader from "./InspectorHeader"

type LoadedProjectProps = {
    initialProject: Project
    hostState: HostState
}

const LoadedProject = ({ initialProject, hostState }: LoadedProjectProps) => {
    const [projectState, projectDispatch] = useReducer(projectReducer, initialProject)
    const [interfaceState, interfaceDispatch] = useReducer(interfaceReducer, defaultInterfaceState)

    const onMapModeSelected = (mapMode: MapMode) => interfaceDispatch({ type: InterfaceActionTypes.MAP_MODE_UPDATED, mapMode })

    return (
        <div className={`${classes.container} h-100`}>
            <Info />
            <Header project={projectState} hostState={hostState} interfaceState={interfaceState} interfaceDispatch={interfaceDispatch} />
            <MapModes selectedMapMode={interfaceState.mapMode} onMapModeSelected={onMapModeSelected} />
            <Map
                projectState={projectState}
                projectDispatch={projectDispatch}
                interfaceState={interfaceState}
                interfaceDispatch={interfaceDispatch}
            />
            <InspectorHeader />
            <Inspector provinces={projectState.provinces} selectedProvinceColour={interfaceState.provinceColour} />
        </div>
    )
}

export default LoadedProject