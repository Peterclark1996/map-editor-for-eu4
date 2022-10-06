import { useState } from "react"
import SelectionButton, { SelectionButtonIcon } from "../SelectionButton"
import classes from "./MapModes.module.scss"

const MapModes = () => {
    const [selectedMapMode, setSelectedMapMode] = useState(SelectionButtonIcon.POLITICAL)

    const mapModes = [
        SelectionButtonIcon.TERRAIN,
        SelectionButtonIcon.POLITICAL,
        SelectionButtonIcon.AREAS,
        SelectionButtonIcon.REGION,
        SelectionButtonIcon.SUPER_REGION,
        SelectionButtonIcon.RELIGION,
        SelectionButtonIcon.CULTURE,
        SelectionButtonIcon.TRADE
    ]

    return (
        <div className={`${classes.container} d-flex flex-column p-2`}>
            {
                mapModes.map(mapMode => (
                    <SelectionButton
                        key={mapMode}
                        icon={mapMode}
                        selected={selectedMapMode === mapMode}
                        onClick={() => setSelectedMapMode(mapMode)}
                    />
                ))
            }
        </div>
    )
}

export default MapModes