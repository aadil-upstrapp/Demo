import { SessionState } from "../reducers/SessionReducer";

export interface BaseProps {
    navigation: any;
    session: SessionState;
    setSession: (key: string, value: any) => void;
    route: { params: any };
}