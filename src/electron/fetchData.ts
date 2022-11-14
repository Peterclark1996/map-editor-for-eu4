import * as fs from "fs"

export const fetchFromPath = async (path: string, gameVersion: string) => {
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



    return {
        gameVersion,
        width: 5632,
        height: 2048,
        provinces,
        provinceMap
    }
}