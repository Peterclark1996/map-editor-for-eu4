import { useState } from "react"
import classes from "./App.module.scss"
import LoadedProject from "./components/layout/LoadedProject"
import { Project } from "./types/Project"
import { ipcRenderer } from "electron"
import ErrorBox from "./components/ErrorBox"
import Button from "./components/Button"

const App = () => {
    const [gamePath, setGamePath] = useState<string>("D:/Steam/steamapps/common/Europa Universalis IV")
    const [modPath, setModPath] = useState<string>("C:/Users/Pete/Documents/Paradox Interactive/Europa Universalis IV/mod")
    const [lastSuccessfulModPath, setLastSuccessfulModPath] = useState<string | undefined>(undefined)
    const [initialProject, setInitialProject] = useState<Project | undefined>(undefined)
    const [mods, setMods] = useState<string[] | undefined>(undefined)
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)

    const hostState = { gamePath, modPath }

    const fetchNewProject = () =>
        ipcRenderer.invoke("fetch-new-project", gamePath)
            .then(setInitialProject)
            .catch(() => setErrorMessage("Failed to create new project"))

    const fetchModProject = (modName: string) =>
        ipcRenderer.invoke("fetch-mod-project", modPath + "/" + modName)
            .then(setInitialProject)
            .catch(() => setErrorMessage("Failed to load mod"))

    const loadMods = () => ipcRenderer.invoke("fetch-mods", modPath).then(mods => {
        setMods(mods)
        setErrorMessage(undefined)
        setLastSuccessfulModPath(modPath)
    }).catch(() => {
        setMods([])
        setErrorMessage("Failed to load mods")
    })

    if (initialProject != undefined) return <LoadedProject initialProject={initialProject} hostState={hostState} />

    return (
        <div className="d-flex h-100 justify-content-center p-4 background">
            <div className="d-flex flex-column align-items-center">
                <div className="d-flex justify-content-end w-100">
                    <div className={`${classes.inputLeft} d-flex align-items-center px-2 user-select-none`}>Game folder:</div>
                    <input className={classes.input} value={gamePath} onChange={event => setGamePath(event.target.value)} />
                    <div className={`${classes.inputRight} ${classes.hidden}`} />
                </div>
                <div className="d-flex justify-content-end w-100 mt-2">
                    <div className={`${classes.inputLeft} d-flex align-items-center px-2 user-select-none`}>Mod folder:</div>
                    <input className={classes.input} value={modPath} onChange={event => setModPath(event.target.value)} />
                    {
                        mods !== undefined && mods.length > 0 && lastSuccessfulModPath === modPath ?
                            <div className={`d-flex align-items-center justify-content-center ${classes.inputRight}`}>
                                <i className="fa-solid fa-check me-1" />
                            </div> :
                            <div role="button" className={`d-flex align-items-center justify-content-center ${classes.inputRightClickable}`} onClick={loadMods}>
                                <i className="fa-solid fa-arrow-right me-1" />
                            </div>
                    }
                </div>
                <div className="d-flex w-100 justify-content-center mt-2">
                    <div className="d-flex flex-column align-items-center">
                        {
                            mods != undefined &&
                            (
                                mods.length == 0 ? <span>No mods found</span> :
                                    mods.map((mod, index) =>
                                        <div key={index} className={`d-flex w-100 align-items-center justify-content-between m-2 ${classes.mod}`}>
                                            <i className="fa-solid fa-file-lines mx-2" />
                                            <span className="w-100 text-center">{mod}</span>
                                            <div
                                                role="button"
                                                className={`d-flex align-items-center justify-content-center h-100 ms-2 ${classes.inputRightClickable}`}
                                                onClick={() => fetchModProject(mod)}
                                            >
                                                <i className="fa-solid fa-arrow-right me-1" />
                                            </div>
                                        </div>
                                    )
                            )
                        }
                    </div>
                </div>
                <Button text="New Project" onClick={fetchNewProject} />
                <div className="mt-2">
                    {
                        errorMessage != undefined && <ErrorBox message={errorMessage} />
                    }
                </div>
            </div>
        </div>
    )
}

export default App