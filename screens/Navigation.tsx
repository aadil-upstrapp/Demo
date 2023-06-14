import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Calculator from './Calculator';
import TicTacToe from './TicTacToe';
import CountryPicker from './CountryPicker';
import ObjectMethods from './ObjectMethods';
import ContactsPicker from './ContactsPicker';
import PazzlesGame from './PazzlesGame';
import Home from './Home';
import ChangeLanguage from './ChangeLanguage';
import IndianFlag from './IndianFlag';
import AddForm from './Form/AddForm';
import HomeScreen from './Form/HomeScreen';
import ViewAllUser from './Form/ViewAllUser';
import RegisterForm from './Form/RegisterForm';
import ViewUserDetails from './Form/ViewUserDetails';
import DeleteData from './Form/DeleteData';
import UpdateData from './Form/UpdateData';
import AddCompany from './EmployeeDetails/AddCompany';
import EmployeeDetails from './EmployeeDetails/EmployeeDetails';
import ViewEmployee from './EmployeeDetails/ViewEmployee';
import DeleteEmployee from './EmployeeDetails/DeleteEmployee';
import UpdateEmployeeData from './EmployeeDetails/UpdateEmployeeData';
import UpdateCompany from './EmployeeDetails/UpdateCompany';
import Menus from './EmployeeDetails/Menus';
import AddNotes from './Notes/AddNotes';
import ViewAllNotes from './Notes/ViewAllNotes';
import UpdateNotes from './Notes/UpdateNotes';
import ViewData from './KhataBook/ViewData';
import Contact from './KhataBook/Contact';
import RegistrationForm from './KhataBook/RegistrationForm';
import Login from './KhataBook/Login';
import DisplayNumber from './KhataBook/DisplayNumber';
import UserTransactionEntry from './KhataBook/UserTransactionEntry';
import YouGave from './KhataBook/YouGave';
import ViewReport from './KhataBook/ViewReport';
import Splash from './KhataBook/Splash';
import DemoGame from './DemoGame';
import DemoCalculator from './DemoCalculator';
import DemoState from './DemoState';
import DemoListening from './Listening/DemoListening';
import SnapShots from './DemoTestCase/SnapShots';
// import FunctionAndState from './DemoTestCase/FunctionAndState';
import GetElement from './DemoTestCase/GetElement';
import ContactsDetails from './ContactsDetails';
import DemoClock from './DemoClock';
import DemoCamera from './Camera/DemoCamera';
import { navigationRef } from './KhataBook/Navigation/RootNavigation';
// import VideoScreen from './VideoCall.js/VideoScreen';
// import LoginScreen from './VideoCall.js/LoginScreen';
// import AudioScreen from './VideoCall.js/AudioScreen';

const Stack = createStackNavigator();

export const MyNavigator = (): React.ReactElement => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}>
        <Stack.Screen component={Home} name="Home" />
        <Stack.Screen component={Calculator} name="Calculator" />
        <Stack.Screen component={DemoCalculator} name="DemoCalculator" />
        <Stack.Screen component={TicTacToe} name="TicTacToe" />
        <Stack.Screen component={DemoGame} name="DemoGame" />
        <Stack.Screen component={CountryPicker} name="CountryPicker" />
        <Stack.Screen component={ObjectMethods} name="ObjectMethods" />
        <Stack.Screen component={ContactsPicker} name="ContactsPicker" />
        <Stack.Screen component={ContactsDetails} name="ContactsDetails" />
        <Stack.Screen component={PazzlesGame} name="PazzlesGame" />
        <Stack.Screen component={ChangeLanguage} name="ChangeLanguage" />
        <Stack.Screen component={IndianFlag} name="IndianFlag" />
        <Stack.Screen component={AddForm} name="AddForm" />
        <Stack.Screen component={RegisterForm} name="RegisterForm" />
        <Stack.Screen component={HomeScreen} name="HomeScreen" />
        <Stack.Screen component={ViewAllUser} name="ViewAllUser" />
        <Stack.Screen component={ViewUserDetails} name="ViewUserDetails" />
        <Stack.Screen component={UpdateData} name="UpdateData" />
        <Stack.Screen component={DeleteData} name="DeleteData" />
        <Stack.Screen component={AddCompany} name="AddCompany" />
        <Stack.Screen component={UpdateCompany} name="UpdateCompany" />
        <Stack.Screen component={EmployeeDetails} name="EmployeeDetails" />
        <Stack.Screen component={ViewEmployee} name="ViewEmployee" />
        <Stack.Screen component={Menus} name="Menus" />
        <Stack.Screen component={DeleteEmployee} name="DeleteEmployee" />
        <Stack.Screen component={UpdateEmployeeData} name="UpdateEmployeeData" />
        <Stack.Screen component={AddNotes} name="AddNotes" />
        <Stack.Screen component={ViewAllNotes} name="ViewAllNotes" />
        <Stack.Screen component={UpdateNotes} name="UpdateNotes" />
        <Stack.Screen component={ViewData} name="ViewData" />
        <Stack.Screen component={ViewReport} name="ViewReport" />
        <Stack.Screen component={Contact} name="Contact" />
        <Stack.Screen component={RegistrationForm} name="RegistrationForm" />
        <Stack.Screen component={Login} name="Login" />
        <Stack.Screen component={DisplayNumber} name="DisplayNumber" />
        <Stack.Screen component={UserTransactionEntry} name="UserTransactionEntry" />
        <Stack.Screen component={YouGave} name="YouGave" />
        <Stack.Screen component={Splash} name="Splash" />  
        <Stack.Screen component={DemoState} name="DemoState" />  
        <Stack.Screen component={DemoListening} name="DemoListening" />  
        <Stack.Screen component={SnapShots} name="SnapShots" />  
        {/* <Stack.Screen component={FunctionAndState} name="FunctionAndState" />   */}
        <Stack.Screen component={GetElement} name="GetElement" />  
        <Stack.Screen component={DemoClock} name="DemoClock" />  
        <Stack.Screen component={DemoCamera} name="DemoCamera" />  
        {/* <Stack.Screen component={LoginScreen} name="LoginScreen" />  
        <Stack.Screen component={AudioScreen} name="AudioScreen" />  
        <Stack.Screen component={VideoScreen} name="VideoScreen" />   */}
       </Stack.Navigator>
    </NavigationContainer>
  );
};
