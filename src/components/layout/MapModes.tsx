import { MapMode } from "../../enums/MapMode"
import SelectionButton from "../SelectionButton"
import classes from "./MapModes.module.scss"

type MapModesProps = {
    selectedMapMode: MapMode
    setSelectedMapMode: (mapMode: MapMode) => void
}

const MapModes = ({ selectedMapMode, setSelectedMapMode }: MapModesProps) => {
    const mapModes = [
        MapMode.TERRAIN,
        MapMode.POLITICAL,
        MapMode.AREAS,
        MapMode.REGION,
        MapMode.SUPER_REGION,
        MapMode.RELIGION,
        MapMode.CULTURE,
        MapMode.TRADE
    ]

    return (
        <div className={`${classes.container} d-flex flex-column p-2`}>
            {
                mapModes.map(mapMode => (
                    <SelectionButton
                        key={mapMode}
                        iconName={MapMode[mapMode]}
                        selected={selectedMapMode === mapMode}
                        onClick={() => setSelectedMapMode(mapMode)}
                    />
                ))
            }
        </div>
    )
}

export default MapModes