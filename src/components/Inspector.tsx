import { ProvinceColour } from "../types/ProvinceColour"
import classes from "./Inspector.module.scss"

type InspectorProps = {
    selectedProvinceColour: ProvinceColour | undefined
}

const Inspector = ({ selectedProvinceColour }: InspectorProps) => {

    const getProvinceColourTitle = () => {
        if (selectedProvinceColour === undefined) return "No province selected"
        const colour = `rgb( ${selectedProvinceColour.red}, ${selectedProvinceColour.green}, ${selectedProvinceColour.blue} )`
        return (
            <div className="d-flex align-items-center">
                <div className={`${classes.colourBlock} me-2`} style={{ "backgroundColor": colour }} /><span>{colour}</span>
            </div>
        )
    }

    return (
        <div className={`${classes.container} d-flex justify-content-center p-2`}>
            {getProvinceColourTitle()}
        </div>
    )
}

export default Inspector