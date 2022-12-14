import classes from "./InspectorHeader.module.scss"

const InspectorHeader = () =>
    <div className={`d-flex align-items-center justify-content-center background ${classes.container}`}>
        <span>Inspector</span>
    </div>

export default InspectorHeader