import { Province } from "../types/Province"

export type State = {
    provinces: Province[]
}

export const initialState: State = {
    provinces: []
}

export enum ActionTypes {
    PROVINCES_LOADED,
    PROVINCE_UPDATED,
}

export type ActionProvincesLoaded = {
    type: ActionTypes.PROVINCES_LOADED,
    provinces: Province[]
}

export type ActionProvinceUpdated = {
    type: ActionTypes.PROVINCE_UPDATED,
    province: Province
}

const reducer = (state: State, action: ActionProvincesLoaded | ActionProvinceUpdated) => {
    switch (action.type) {
        case ActionTypes.PROVINCES_LOADED:
            return {
                ...state,
                provinces: action.provinces
            }
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