import classes from "./MapModeButton.module.scss"

type SelectionButtonProps = {
    iconName: string
    selected: boolean
    onClick: () => void
}

const MapModeButton = ({ iconName, selected, onClick }: SelectionButtonProps) => {
    return (
        <div className={`d-flex align-items-center justify-content-center ${classes.toolTip}`}>
            <img
                className={`${classes.fitted} ${selected ? classes.selected : ""}`}
                role="button"
                src={`/src/icons/button_${iconName}.png`}
                onClick={onClick}
            />
            <span className={`${classes.toolTipText} ms-2`}>{iconName.replaceAll("_", " ")}</span>
        </div>

    )
}

export default MapModeButton