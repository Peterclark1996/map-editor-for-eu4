import { useState } from "react"
import classes from "./App.module.scss"
import LoadedProject from "./components/layout/LoadedProject"
import { Project } from "./types/Project"
import { ipcRenderer } from "electron"
import ErrorBox from "./components/ErrorBox"
import Button from "./components/Button"

const App = () => {
    const [gamePath, setGamePath] = useState<string>("D:\\Steam\\steamapps\\common\\Europa Universalis IV")
    const [modPath, setModPath] = useState<string>("C:\\Users\\Pete\\Documents\\Paradox Interactive\\Europa Universalis IV\\mod")
    const [defaultProject, setDefaultProject] = useState<Project | undefined>(undefined)
    const [hasErrored, setHasErrored] = useState(false)

    const loadDefaultProject = () =>
        ipcRenderer.invoke("fetch-default-project", gamePath)
            .then(setDefaultProject)
            .catch(() => setHasErrored(true))

    if (defaultProject != undefined) return <LoadedProject defaultProject={defaultProject} hostState={{ gamePath, modPath }} />

    return (
        <div className="d-flex h-100 p-4 background">
            <div className="d-flex flex-grow-1" />
            <div className="d-flex flex-column align-items-center">
                <div className="d-flex w-100 justify-content-between">
                    <div className="me-2">Game folder:</div>
                    <input className={classes.input} value={gamePath} onChange={event => setGamePath(event.target.value)} />
                </div>
                <div className="d-flex w-100 justify-content-between">
                    <div className="me-2">Mod folder:</div>
                    <input className={classes.input} value={modPath} onChange={event => setModPath(event.target.value)} />
                </div>
                <Button text="New Project" onClick={loadDefaultProject} />
                {
                    hasErrored && <ErrorBox message="Failed to load new project. Is the game path correct?" />
                }
            </div>
            <div className="d-flex flex-grow-1" />
        </div>
    )
}

export default App