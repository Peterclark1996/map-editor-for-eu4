import { Project } from "../types/Project"
import { Province } from "../types/Province"

export enum ActionTypes {
    PROVINCE_UPDATED,
    PROVINCE_MAP_UPDATED,
}

export type ActionProvinceUpdated = {
    type: ActionTypes.PROVINCE_UPDATED,
    province: Province
}

export type ActionProvinceMapUpdated = {
    type: ActionTypes.PROVINCE_MAP_UPDATED,
    provinceMap: Buffer
}

const reducer = (state: Project, action: ActionProvinceUpdated | ActionProvinceMapUpdated) => {
    switch (action.type) {
        case ActionTypes.PROVINCE_UPDATED:
            return {
                ...state,
                provinces: state.provinces.map(province => {
                    if (province.id === action.province.id) {
                        return action.province
                    }
                    return province
                })
            }
        case ActionTypes.PROVINCE_MAP_UPDATED:
            return {
                ...state,
                provinceMap: action.provinceMap
            }
    }
}

export default reducer