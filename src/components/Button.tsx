import classes from "./Button.module.scss"

type ButtonProps = {
    text: string
    onClick: () => void
}

const Button = ({ text, onClick }: ButtonProps) => {
    return (
        <div
            role="button"
            className={`${classes.button} px-2 py-1 mt-2 user-select-none`}
            onClick={onClick}
        >
            {text}
        </div>
    )
}

export default Button