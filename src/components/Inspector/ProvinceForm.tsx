import { useEffect, useState } from "react"
import { ProjectAction, ProjectActionTypes } from "../../actions/projectReducer"
import { Project } from "../../types/Project"
import { Province } from "../../types/Province"
import AutoComplete from "../AutoComplete"
import classes from "./ProvinceForm.module.scss"

type ProvinceFormProps = {
    project: Project
    projectDispatch: (action: ProjectAction) => void
    province: Province
}

const ProvinceForm = ({ project, projectDispatch, province }: ProvinceFormProps) => {
    const [areaInput, setAreaInput] = useState(province.area ?? "")
    const [editingArea, setEditingArea] = useState(false)

    const onAreaUpdated = (area: string) => {
        setEditingArea(false)
        projectDispatch({
            type: ProjectActionTypes.PROVINCE_AREA_UPDATED,
            provinceId: province.id,
            area: area
        })
    }

    useEffect(() => {
        setAreaInput(province.area ?? "")
        setEditingArea(false)
    }, [province])

    const colour = `rgb( ${province.colour.red}, ${province.colour.green}, ${province.colour.blue} )`

    return (
        <div className="d-flex flex-column align-items-center">
            <div className="d-flex align-items-center">
                <div
                    className={`${classes.colourBlock} me-2`}
                    style={{ backgroundColor: colour }}
                />
                <span>{colour}</span>
            </div>
            <div>
                <span className="fw-bold">Id:</span> {province.id}
            </div>
            <div>
                <span className="fw-bold">Province:</span> {province.name}
            </div>
            <div className="d-flex">
                <span className="fw-bold me-2">Area:</span>
                {editingArea ? (
                    <AutoComplete
                        inputText={areaInput}
                        onInputTextUpdated={setAreaInput}
                        options={project.areas.map(area => area.id)}
                        onOptionsSelected={onAreaUpdated}
                    />
                ) : (
                    <span>
                        {province.area ?? "None"}
                        <i
                            role="button"
                            className="fa-regular fa-pen-to-square ms-2"
                            onClick={() => setEditingArea(true)}
                        />
                    </span>
                )}
            </div>
        </div>
    )
}

export default ProvinceForm
