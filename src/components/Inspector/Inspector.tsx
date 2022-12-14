import { ProjectAction } from "../../actions/projectReducer"
import { Colour } from "../../types/Colour"
import { Project } from "../../types/Project"
import classes from "./Inspector.module.scss"
import ProvinceForm from "./ProvinceForm"

type InspectorProps = {
    project: Project
    projectDispatch: (action: ProjectAction) => void
    selectedProvinceColour: Colour | undefined
}

const Inspector = ({ project, projectDispatch, selectedProvinceColour }: InspectorProps) => {
    const getContent = () => {
        if (selectedProvinceColour === undefined) return <span>No province selected</span>

        const selectedProvince = project.provinces.find(
            p =>
                p.colour.red === selectedProvinceColour.red &&
                p.colour.green === selectedProvinceColour.green &&
                p.colour.blue === selectedProvinceColour.blue
        )
        if (selectedProvince === undefined) return <span>Failed to find selected province</span>

        return (
            <ProvinceForm
                project={project}
                projectDispatch={projectDispatch}
                province={selectedProvince}
            />
        )
    }

    return (
        <div
            className={`${classes.container} d-flex justify-content-center align-items-center p-2 background`}
        >
            {getContent()}
        </div>
    )
}

export default Inspector
