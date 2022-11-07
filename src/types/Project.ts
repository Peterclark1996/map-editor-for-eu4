import { Province } from "./Province"

export type Project = {
    width: number,
    height: number,
    provinces: Province[]
    provinceMap: Uint8Array
}