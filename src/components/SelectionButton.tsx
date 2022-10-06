import classes from "./SelectionButton.module.scss"

export enum SelectionButtonIcon {
    POINTER,
    PAINT_BRUSH,
    TERRAIN,
    POLITICAL,
    AREAS,
    REGION,
    SUPER_REGION,
    RELIGION,
    CULTURE,
    TRADE
}

type SelectionButtonProps = {
    icon: SelectionButtonIcon
    selected: boolean
    onClick: () => void
}

const SelectionButton = ({ icon, selected, onClick }: SelectionButtonProps) => {
    return (
        <div className={`d-flex align-items-center justify-content-center ${classes.toolTip}`}>
            <img
                className={`${classes.fitted} ${selected ? classes.selected : ""}`}
                role="button"
                src={`/src/icons/button_${SelectionButtonIcon[icon]}.png`}
                onClick={onClick}
            />
            <span className={`${classes.toolTipText} ms-2`}>{SelectionButtonIcon[icon].replaceAll("_", " ")}</span>
        </div>

    )
}

export default SelectionButton