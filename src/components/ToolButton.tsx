import classes from "./ToolButton.module.scss"

type ToolButtonProps = {
    icon: string
    isSelected: boolean
    onClick: () => void
}

const ToolButton = ({ icon, isSelected, onClick }: ToolButtonProps) => {
    return (
        <div
            role="button"
            className={`d-flex align-items-center justify-content-center p-2 ${classes.button} ${isSelected ? classes.selected : ""}`}
            onClick={onClick}
        >
            <i className={icon} />
        </div>
    )
}

export default ToolButton