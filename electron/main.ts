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

    if (process.env.NODE_ENV == 'development') {
        mainWindow.loadURL(`http://127.0.0.1:5173/`)
        mainWindow.webContents.openDevTools()
    } else {
        mainWindow.loadFile(path.join(__dirname, "../index.html"))
    }
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

ipcMain.handle("fetch-provinces", async () => {
    return fs.readFileSync(path.join(__dirname, "../../electron/resources/provinces.bmp"))
})

ipcMain.handle("fetch-definition", async () => {
    return fs.readFileSync(path.join(__dirname, "../../electron/resources/definition.csv")).toString()
})