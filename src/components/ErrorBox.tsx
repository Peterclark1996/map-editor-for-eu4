import classes from "./ErrorBox.module.scss"

type ErrorBoxProps = {
    message: string
}

const ErrorBox = ({ message }: ErrorBoxProps) => {
    return (
        <div className={classes.errorBox}>
            <i className="fa-solid fa-triangle-exclamation me-2" />
            {message}
        </div>
    )
}

export default ErrorBox