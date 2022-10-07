import { Project } from "../types/Project"
import { Province } from "../types/Province"

export enum ActionTypes {
    PROVINCE_UPDATED,
}

export type ActionProvinceUpdated = {
    type: ActionTypes.PROVINCE_UPDATED,
    province: Province
}

const reducer = (state: Project, action: ActionProvinceUpdated) => {
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
    }
}

export default reducer