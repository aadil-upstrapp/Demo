/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { setupFirebase } from './screens/KhataBook/firebase/firebase';

setupFirebase()
AppRegistry.registerComponent(appName, () => App);

