import { Project } from "../types/Project"

export enum ProjectActionTypes {
    PROVINCE_MAP_UPDATED,
    PROVINCE_AREA_UPDATED
}

export type ActionProvinceMapUpdated = {
    type: ProjectActionTypes.PROVINCE_MAP_UPDATED
    provinceMap: Uint8Array
}

export type ActionProvinceAreaUpdated = {
    type: ProjectActionTypes.PROVINCE_AREA_UPDATED
    provinceId: number
    area: string | undefined
}

export type ProjectAction = ActionProvinceMapUpdated | ActionProvinceAreaUpdated

const projectReducer = (state: Project, action: ProjectAction) => {
    switch (action.type) {
        case ProjectActionTypes.PROVINCE_AREA_UPDATED:
            return {
                ...state,
                provinces: state.provinces.map(province => {
                    if (province.id === action.provinceId) {
                        return {
                            ...province,
                            area: action.area
                        }
                    }
                    return province
                })
            }
        case ProjectActionTypes.PROVINCE_MAP_UPDATED:
            return {
                ...state,
                provinceMap: action.provinceMap
            }
    }
}

export default projectReducer
