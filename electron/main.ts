import { app, BrowserWindow, ipcMain } from "electron"
import * as path from "path"
import * as fs from "fs"

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
    })
    const provinceMap = fs.readFileSync(`${args}/map/provinces.bmp`)

    return {
        provinces,
        provinceMap
    }
})