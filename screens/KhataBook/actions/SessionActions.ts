import { Action } from "./CommonActions"

export const SET_SESSION_FIELD = "SET_SESSION_FIELD"

export const setSessionField = (key: string, value: any): Action => {

    return {
        type: SET_SESSION_FIELD,
        payload: {
            key, value
        }
    }
}
