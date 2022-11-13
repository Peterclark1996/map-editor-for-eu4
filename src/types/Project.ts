import { Province } from "./Province"

export type Project = {
    gameVersion: string
    width: number
    height: number
    provinces: Province[]
    provinceMap: Uint8Array
}