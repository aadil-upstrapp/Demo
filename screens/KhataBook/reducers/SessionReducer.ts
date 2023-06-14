import { SET_SESSION_FIELD } from "../actions/SessionActions"

import { Action } from "../actions/CommonActions";
// import {  UserModel } from "../model/UserModel";
// import { UserProgramModel } from "../model/UserProgramModel";
// import { MesiboModel } from "../model/MesiboModel";

export interface SessionState {
    /* user?:UserModel;
    mesibo?: MesiboModel;
    api_token?:string;
    program_id?:string;
    nutrition_id?:string;
    fcmToken?: string;
    lastFcmToken?: string;
    userProgram?:UserProgramModel; */
    user_id?:number;
}

const INIT_STATE: SessionState = {
    
}


export default (state = INIT_STATE, action: Action) => {

    switch (action.type) {

        case SET_SESSION_FIELD:
            return { ...state, [action.payload.key]: action.payload.value }
    }

    return state

}
