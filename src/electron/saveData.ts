import { convertTo24Bmp } from "./bmp"
import * as fs from "fs"
import { Project } from "../types/Project"

export const saveMod = (path: string, modName: string, project: Project) => {
    const fileName = modName.toLowerCase().replace(/[^a-z0-9_ ]/g, "").replace(/[ ]/g, "_")
    const modPath = `${path}/${fileName}`

    if (!fs.existsSync(modPath)) {
        fs.mkdirSync(modPath)
    }

    const descriptorFile =
        `name = "${modName}"\n` +
        `supported_version = "${project.gameVersion}"`

    fs.writeFileSync(`${modPath}.mod`, descriptorFile + `\npath = "mod/${fileName}"`)
    fs.writeFileSync(`${modPath}/descriptor.mod`, descriptorFile)

    if (!fs.existsSync(`${modPath}/map`)) {
        fs.mkdirSync(`${modPath}/map`)
    }

    const definitionFile =
        "province;red;green;blue;x;x\n" +
        project.provinces.map(p => `${p.id};${p.colour.red};${p.colour.green};${p.colour.blue};${p.name};x`).join("\n")

    fs.writeFileSync(`${modPath}/map/definition.csv`, definitionFile)

    const provinceMap = Buffer.from(convertTo24Bmp(project.provinceMap, project.width, project.height))

    fs.writeFileSync(`${modPath}/map/provinces.bmp`, provinceMap)
}