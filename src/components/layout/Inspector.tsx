import { Colour } from "../../../types/Colour"
import { Province } from "../../types/Province"
import classes from "./Inspector.module.scss"

type InspectorProps = {
    provinces: Province[]
    selectedProvinceColour: Colour | undefined
}

const Inspector = ({ provinces, selectedProvinceColour }: InspectorProps) => {

    const getContent = () => {
        if (selectedProvinceColour === undefined) return "No province selected"

        const selectedProvince = provinces.find(p =>
            p.colour.red === selectedProvinceColour.red &&
            p.colour.green === selectedProvinceColour.green &&
            p.colour.blue === selectedProvinceColour.blue
        )
        if (selectedProvince === undefined) return "Failed to find selected province"

        const colour = `rgb( ${selectedProvinceColour.red}, ${selectedProvinceColour.green}, ${selectedProvinceColour.blue} )`
        return (
            <>
                <div className="d-flex align-items-center">
                    <div className={`${classes.colourBlock} me-2`} style={{ "backgroundColor": colour }} />
                    <span>{colour}</span>
                </div>
                <div>
                    <span className="fw-bold">Id:</span> {selectedProvince.id}
                </div>
                <div>
                    <span className="fw-bold">Province:</span> {selectedProvince.name}
                </div>
            </>
        )
    }

    return (
        <div className={`${classes.container} d-flex flex-column justify-content-center align-items-center p-2 background`}>
            {getContent()}
        </div>
    )
}

export default Inspector