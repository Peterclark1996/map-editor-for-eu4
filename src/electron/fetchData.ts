import * as fs from "fs"
import { Area } from "../types/Area"
import { Project } from "../types/Project"
import { Province } from "../types/Province"
import { convertTxtFileToObject } from "./string"

export const fetchFromPath = async (path: string, gameVersion: string): Promise<Project> => {
    const areaData = convertTxtFileToObject(fs.readFileSync(`${path}/map/area.txt`).toString())

    const areaByProvince: string[] = []
    const areas: Area[] = Object.keys(areaData).map(key => {
        const colourString = areaData[key].match(/color\s*=\s*{\s*(\d+)\s*(\d+)\s*(\d+)\s*}/)?.[0]
        if (colourString) {
            const colorParts = colourString.match(/{(.*?)}/)?.[0]?.split(" ").map(x => parseInt(x)).filter(x => !isNaN(x))
            if (colorParts == undefined || colorParts.length != 3) throw new Error("Could not parse color in string: " + areaData[key])

            const provinceIds = areaData[key].replace(colourString, "").split(" ").map(x => parseInt(x)).filter(x => !isNaN(x))
            provinceIds.forEach(id => areaByProvince[id] = key)

            return {
                id: key,
                colour: {
                    red: colorParts[0],
                    green: colorParts[1],
                    blue: colorParts[2],
                }
            }
        }

        const provinceIds = areaData[key].split(" ").map(x => parseInt(x)).filter(x => !isNaN(x))
        provinceIds.forEach(id => areaByProvince[id] = key)

        return {
            id: key
        }
    })

    const provinces: Province[] = fs.readFileSync(`${path}/map/definition.csv`).toString().split("\n").map(row => {
        const parts = row.split(";")
        return {
            id: parseInt(parts[0]),
            colour: {
                red: parseInt(parts[1]),
                green: parseInt(parts[2]),
                blue: parseInt(parts[3])
            },
            name: parts[4],
            area: areaByProvince[parseInt(parts[0])]
        }
    }).slice(1)
    const provinceMap = fs.readFileSync(`${path}/map/provinces.bmp`)

    return {
        gameVersion,
        width: 5632,
        height: 2048,
        provinces,
        provinceMap,
        areas
    }
}