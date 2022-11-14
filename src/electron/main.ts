import { app, BrowserWindow, ipcMain } from "electron"
import * as path from "path"
import * as fs from "fs"
import { Project } from "../types/Project"
import { LauncherSettings } from "../types/LauncherSettings"
import { fetchFromPath } from "./fetchData"
import { saveMod } from "./saveData"
import { cleanString, normalisePath } from "./string"

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        height: 1000,
        width: 1800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })
    mainWindow.setMenuBarVisibility(false)

    if (process.env.NODE_ENV == "production") {
        mainWindow.loadFile(path.join(__dirname, "../index.html"))
        return
    }

    mainWindow.loadURL(`http://127.0.0.1:5173/`)
    mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
    createWindow()

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit()
    }
})

ipcMain.handle("fetch-new-project", async (_, path: string): Promise<Project> => {
    const launcherSettings: LauncherSettings = JSON.parse(fs.readFileSync(`${path}/launcher-settings.json`).toString())
    return await fetchFromPath(path, launcherSettings.rawVersion)
})

ipcMain.handle("fetch-mod-project", async (_, path: string): Promise<Project> => {
    const cleanPath = normalisePath(path)
    const modFile = fs.readFileSync(`${cleanPath}.mod`).toString().split("\n").map(line => line.split("=").map(part => cleanString(part)))
    const modpath: (string | undefined) = modFile.find(line => line[0] == "path")?.[1]
    if (modpath == undefined) throw new Error("Invalid mod file: Missing mod path")

    const gameVersion: (string | undefined) = modFile.find(line => line[0] == "supported_version")?.[1]
    if (gameVersion == undefined) throw new Error("Invalid mod file: Missing game version")

    const parentPath = cleanPath.split("/").slice(0, -2).join("/")
    const actualPath = `${parentPath}/${modpath}`

    return await fetchFromPath(actualPath, gameVersion)
})

ipcMain.handle("fetch-mods", async (_, path: string): Promise<string[]> =>
    fs.readdirSync(path)
        .filter(file => file.endsWith(".mod"))
        .map(file => file.slice(0, -4))
)

type SaveModArgs = {
    path: string
    modName: string
    project: Project
}

ipcMain.handle("save-mod", async (_, args: SaveModArgs) => saveMod(args.path, args.modName, args.project))