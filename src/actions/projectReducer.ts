import { Project } from "../types/Project"
import { Province } from "../types/Province"

export enum ProjectActionTypes {
    PROVINCE_UPDATED,
    PROVINCE_MAP_UPDATED,
}

export type ActionProvinceUpdated = {
    type: ProjectActionTypes.PROVINCE_UPDATED,
    province: Province
}

export type ActionProvinceMapUpdated = {
    type: ProjectActionTypes.PROVINCE_MAP_UPDATED,
    provinceMap: Buffer
}

const projectReducer = (state: Project, action: ActionProvinceUpdated | ActionProvinceMapUpdated) => {
    switch (action.type) {
        case ProjectActionTypes.PROVINCE_UPDATED:
            return {
                ...state,
                provinces: state.provinces.map(province => {
                    if (province.id === action.province.id) {
                        return action.province
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