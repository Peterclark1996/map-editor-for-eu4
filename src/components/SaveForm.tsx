import { useState } from "react"
import Button from "./Button"
import classes from "./SaveForm.module.scss"
import { ipcRenderer } from "electron"
import { Project } from "../../types/Project"

type SaveFormProps = {
    project: Project
    path: string,
    onClose: () => void
}

const SaveForm = ({ project, path, onClose }: SaveFormProps) => {
    const [name, setName] = useState("")
    const [hasSaved, setHasSaved] = useState(false)
    const [hasErrored, setHasErrored] = useState(false)

    const onSaveClick = () => {
        if (name.length === 0) return

        ipcRenderer.invoke("save-mod", {
            path,
            modName: name,
            project
        })
            .then(() => setHasSaved(true))
            .catch(() => setHasErrored(true))
    }

    return (
        <div className="d-flex flex-column align-items-center p-2">
            <div className={hasSaved || hasErrored ? classes.hidden : ""}>
                <div className="d-flex align-items-center">
                    <span className="user-select-none me-2">Mod name:</span>
                    <input className={classes.input} value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="d-flex align-items-center mt-2">
                    <span className="user-select-none me-2">File name:</span>
                    <input
                        disabled={true}
                        className={classes.input}
                        value={name.toLowerCase().replace(/[^a-z_ ]/g, "").replace(/[ ]/g, "_")}
                        onChange={() => undefined}
                    />
                </div>
                <div className="d-flex justify-content-around mt-2">
                    <Button text="Cancel" onClick={onClose} />
                    <Button text="Save" onClick={onSaveClick} />
                </div>
            </div>
            <div className={`${hasSaved ? "" : classes.hidden} d-flex flex-column position-absolute align-items-center`}>
                <span className="user-select-none">Saved!</span>
                <Button text="Close" onClick={onClose} />
            </div>
            <div className={`${hasErrored ? "" : classes.hidden} d-flex flex-column position-absolute align-items-center`}>
                <span className="user-select-none">Failed to save!</span>
                <Button text="Close" onClick={onClose} />
            </div>
        </div>
    )
}

export default SaveForm