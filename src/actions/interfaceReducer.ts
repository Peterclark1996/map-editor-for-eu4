import { MapMode } from "../enums/MapMode"
import { Tool } from "../enums/Tool"
import { Colour } from "../types/Colour"
import { InterfaceState } from "../types/InterfaceState"

export enum InterfaceActionTypes {
    PROVINCE_COLOUR_UPDATED,
    TOOL_UPDATED,
    TOOL_SIZE_UPDATED,
    MAP_MODE_UPDATED
}

export type ActionProvinceColourUpdated = {
    type: InterfaceActionTypes.PROVINCE_COLOUR_UPDATED,
    colour: Colour
}

export type ActionToolUpdated = {
    type: InterfaceActionTypes.TOOL_UPDATED,
    tool: Tool
}

export type ActionToolSizeUpdated = {
    type: InterfaceActionTypes.TOOL_SIZE_UPDATED,
    toolSize: number
}

export type ActionMapModeUpdated = {
    type: InterfaceActionTypes.MAP_MODE_UPDATED,
    mapMode: MapMode
}

export type InterfaceAction = ActionProvinceColourUpdated | ActionToolUpdated | ActionToolSizeUpdated | ActionMapModeUpdated

const interfaceReducer = (state: InterfaceState, action: InterfaceAction) => {
    switch (action.type) {
        case InterfaceActionTypes.PROVINCE_COLOUR_UPDATED:
            return {
                ...state,
                provinceColour: action.colour
            }
        case InterfaceActionTypes.TOOL_UPDATED:
            return {
                ...state,
                tool: action.tool
            }
        case InterfaceActionTypes.TOOL_SIZE_UPDATED:
            return {
                ...state,
                toolSize: action.toolSize
            }
        case InterfaceActionTypes.MAP_MODE_UPDATED:
            return {
                ...state,
                mapMode: action.mapMode
            }
    }
}

export default interfaceReducer