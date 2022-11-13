import { app, BrowserWindow, ipcMain } from "electron"
import * as path from "path"
import * as fs from "fs"
import { Project } from "../types/Project"
import { convertTo24Bmp } from "./bmp"
import { LauncherSettings } from "../types/LauncherSettings"

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

ipcMain.handle("fetch-default-project", async (_, path: string): Promise<Project> => {
    const provinces = fs.readFileSync(`${path}/map/definition.csv`).toString().split("\n").map(row => {
        const parts = row.split(";")
        return {
            id: parseInt(parts[0]),
            colour: {
                red: parseInt(parts[1]),
                green: parseInt(parts[2]),
                blue: parseInt(parts[3])
            },
            name: parts[4]
        }
    }).slice(1)
    const provinceMap = fs.readFileSync(`${path}/map/provinces.bmp`)

    const launcherSettings: LauncherSettings = JSON.parse(fs.readFileSync(`${path}/launcher-settings.json`).toString())

    return {
        gameVersion: launcherSettings.rawVersion,
        width: 5632,
        height: 2048,
        provinces,
        provinceMap
    }
})

type SaveModArgs = {
    path: string
    modName: string
    project: Project
}

ipcMain.handle("save-mod", async (_, args: SaveModArgs) => {
    const fileName = args.modName.toLowerCase().replace(/[^a-z0-9_ ]/g, "").replace(/[ ]/g, "_")
    const modPath = `${args.path}/${fileName}`

    if (!fs.existsSync(modPath)) {
        fs.mkdirSync(modPath)
    }

    const descriptorFile =
        `name = "${args.modName}"\n` +
        `supported_version = "${args.project.gameVersion}"`

    fs.writeFileSync(`${modPath}.mod`, descriptorFile + `\npath = "mod/${fileName}"`)
    fs.writeFileSync(`${modPath}/descriptor.mod`, descriptorFile)

    if (!fs.existsSync(`${modPath}/map`)) {
        fs.mkdirSync(`${modPath}/map`)
    }

    const definitionFile =
        "province;red;green;blue;x;x\n" +
        args.project.provinces.map(p => `${p.id};${p.colour.red};${p.colour.green};${p.colour.blue};${p.name};x`).join("\n")

    fs.writeFileSync(`${modPath}/map/definition.csv`, definitionFile)

    const provinceMap = Buffer.from(convertTo24Bmp(args.project.provinceMap, args.project.width, args.project.height))

    fs.writeFileSync(`${modPath}/map/provinces.bmp`, provinceMap)
})