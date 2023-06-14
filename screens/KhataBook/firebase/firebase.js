import NotifService from "./NotifService";
import { setSessionField } from '../actions/SessionActions';
import { store } from '../../../App';
import { navigate, navigationRef } from "../Navigation/RootNavigation";

let notif: NotifService
export const setupFirebase = () => {
    notif = new NotifService(
        onRegister,
        onNotif,
    );

    notif.requestPermissions()
}

 const onRegister = (token) => {
    console.log("firtoken ", token);
    store.dispatch(setSessionField('lastFcmToken', token.token))
}

export const onNotif = (notification) => {
    console.log("Notif received", notification,notification.userInteraction)
    if (!notification.userInteraction) {
        notif.localNotif(notification)
    }
    else{
        navigate('ViewData')
        console.log('notifiact');
    }
}