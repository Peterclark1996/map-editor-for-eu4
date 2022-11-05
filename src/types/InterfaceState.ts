import { MapMode } from "../enums/MapMode"
import { Tool } from "../enums/Tool"
import { Colour } from "./Colour"

export type InterfaceState = {
    provinceColour: Colour | undefined,
    tool: Tool,
    toolSize: number,
    mapMode: MapMode
}

export const defaultInterfaceState: InterfaceState = {
    provinceColour: undefined,
    tool: Tool.POINTER,
    toolSize: 1,
    mapMode: MapMode.POLITICAL
}