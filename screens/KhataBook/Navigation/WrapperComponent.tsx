import React, {memo} from "react";
import {SessionState} from "../reducers/SessionReducer";
import {store} from "../../../App";
import {setSessionField} from "../actions/SessionActions";

const WrapperComponent = (PassedComponent: any) => memo((props: any) => {
    const session: SessionState = store.getState().session
    const setSession = (key: string, value: any) => {
        store.dispatch(setSessionField(key, value))
    }

    const baseProps = {session, setSession}

    return <PassedComponent {...props} {...baseProps} />
})

export default WrapperComponent
