import { app, BrowserWindow, ipcMain } from "electron"
import * as path from "path"
import * as fs from "fs"
import { Project } from "../types/Project"

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        height: 1000,
        width: 1800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
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

ipcMain.handle("fetch-default-project", async (_, args: string) => {
    const provinces = fs.readFileSync(`${args}/map/definition.csv`).toString().split("\n").map(row => {
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
    const provinceMap = fs.readFileSync(`${args}/map/provinces.bmp`)

    return {
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
    const fileName = args.modName.toLowerCase().replace(/[^a-z_ ]/g, "").replace(/[ ]/g, "_")
    const modPath = `${args.path}/mod/${fileName}`

    if (!fs.existsSync(modPath)) {
        fs.mkdirSync(modPath)
    }

    const descriptorFile =
        `name = "${args.modName}"\n` +
        `path = "mod/${fileName}"\n` +
        `supported_version = "1.9"`

    fs.writeFileSync(`${modPath}/descriptor.mod`, descriptorFile)

    if (!fs.existsSync(`${modPath}/map`)) {
        fs.mkdirSync(`${modPath}/map`)
    }

    const definitionFile =
        "province;red;green;blue;x;x\n" +
        args.project.provinces.map(p => `${p.id};${p.colour.red};${p.colour.green};${p.colour.blue};${p.name};x`).join("\n")

    fs.writeFileSync(`${modPath}/map/definition.csv`, definitionFile)
    fs.writeFileSync(`${modPath}/map/provinces.bmp`, args.project.provinceMap)
})