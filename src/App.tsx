import { useState } from "react"
import classes from "./App.module.scss"
import LoadedProject from "./components/layout/LoadedProject"
import { Project } from "./types/Project"
import { ipcRenderer } from "electron"
import ErrorBox from "./components/ErrorBox"

const App = () => {
    const [path, setPath] = useState<string>("D:\\Steam\\steamapps\\common\\Europa Universalis IV")
    const [defaultProject, setDefaultProject] = useState<Project | undefined>(undefined)
    const [hasErrored, setHasErrored] = useState(false)

    const loadDefaultProject = () =>
        ipcRenderer.invoke("fetch-default-project", path)
            .then(setDefaultProject)
            .catch(() => setHasErrored(true))

    if (defaultProject != undefined) return <LoadedProject defaultProject={defaultProject} />

    return (
        <div className="d-flex flex-column h-100 align-items-center m-4">
            <div className="mb-2">Locate the "Europa Universalis IV" folder</div>
            <input className={classes.pathInput} value={path} onChange={event => setPath(event.target.value)} />
            <button className="btn btn-secondary my-2" onClick={loadDefaultProject}>New Project</button>
            {
                hasErrored && <ErrorBox message="Failed to load new project. Is the path correct?" />
            }
        </div>
    )
}

export default App