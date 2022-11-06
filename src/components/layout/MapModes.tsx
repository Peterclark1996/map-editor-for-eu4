import { MapMode } from "../../../enums/MapMode"
import MapModeButton from "../MapModeButton"
import classes from "./MapModes.module.scss"

type MapModesProps = {
    selectedMapMode: MapMode
    onMapModeSelected: (mapMode: MapMode) => void
}

const MapModes = ({ selectedMapMode, onMapModeSelected }: MapModesProps) => {
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
        <div className={`${classes.container} d-flex flex-column p-2 background`}>
            {
                mapModes.map(mapMode => (
                    <MapModeButton
                        key={mapMode}
                        iconName={MapMode[mapMode]}
                        selected={selectedMapMode === mapMode}
                        onClick={() => onMapModeSelected(mapMode)}
                    />
                ))
            }
        </div>
    )
}

export default MapModes