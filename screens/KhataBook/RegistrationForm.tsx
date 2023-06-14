import React, { useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Image
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Colors from '../constants/Colors';
import { COLUMN_EMAIL, COLUMN_PASSWORD, COLUMN_PHONE_NUMBER, COLUMN_USER_NAME, TABLE_KHATABOOK } from './Sqlite/SqliteConstants';
import { SqliteUtils } from './Sqlite/SqliteUtils';


const RegistrationForm: React.FC = ({navigation}) => {
  const [userName, setUserName] = useState('aadil');
  const [email, setEmail] = useState('mansuriaadil65@gmail.com');
  const [phoneNumber, setPhoneNumber] = useState('9998347885');
  const [password, setPassword] = useState('aadil@1234');
  const [confirmPwd, setConfirmPwd] = useState('aadil@1234');

  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const RegisterUser = async () => {
    // Sqlite.displayAllUser(dataGet)
    // console.log(datas);
    console.log('click');
    // Sqlite.createUser()
    if (!userName) {
      alert('Please fill userName');
      return;
    } else if (!email) {
      alert('Please fill email');
      return;
    } else if (reg.test(email) === false) {
      alert('Email is not correct');
      return;
    } else if (!phoneNumber) {
      alert('Please fill phone number');
      return;
    } else if (!password) {
      alert('Please select password');
      return;
    } else if (password.length < 8) {
      alert('Password length must be atleast 8 characters');
      return;
    } else if (password.length > 15) {
      alert('Password length must not exceed 15 characters');
      return;
    } else if (password != confirmPwd) {
      alert('password and confirm password Not matche');
      return;
    }

    
    let res= await SqliteUtils.insert({tableName:TABLE_KHATABOOK,columnNames:[COLUMN_USER_NAME,COLUMN_EMAIL,COLUMN_PASSWORD,COLUMN_PHONE_NUMBER],values:[userName,email,password,phoneNumber]})
    console.log(res[0].rowsAffected);
    if (res[0].rowsAffected > 0) {
      alert('You are Registered Successfully');
      navigation.navigate('Login');
    } else {
      alert('email or phone number already exists');
    }
  };
  return (
    <ScrollView style={styles.main}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            source={require('../../assets/Images/ic_arrow_back.png')}
            style={{
              width: 30,
              height: 30,
              tintColor: Colors.black,
              marginRight: 5,
            }}
          />
        </TouchableWithoutFeedback>
      </View>
      <View style={{alignContent: 'center'}}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
            color: Colors.black,
          }}>
          Register Form
        </Text>
      </View>
      <View
        style={{
          backgroundColor: Colors.white,
          paddingHorizontal: 50,
          paddingVertical: 50,
          justifyContent: 'center',
        }}>
        <View style={styles.row}>
          <Text style={styles.label}>User Name </Text>
          <TextInput
            value={userName}
            onChangeText={setUserName}
            style={styles.input}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Email </Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Phone Number </Text>
          <TextInput
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            style={styles.input}
            keyboardType="number-pad"
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Password </Text>
          <TextInput
            value={password}
            secureTextEntry
            onChangeText={setPassword}
            style={styles.input}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Confirm Password </Text>
          <TextInput
            secureTextEntry
            value={confirmPwd}
            onChangeText={setConfirmPwd}
            style={styles.input}
          />
        </View>
        <TouchableWithoutFeedback
          onPress={() => {
            RegisterUser();
          }}>
          <View style={styles.button}>
            <Text style={{color: Colors.white}}>Sign Up!</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate('Login');
          }}>
          <Text style={{color: '#2f81d9', alignSelf: 'center'}}>Login</Text>
        </TouchableWithoutFeedback>
      </View>
    </ScrollView>
  );
};
export default RegistrationForm;
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor:Colors.white,
    padding: 10,
  },
  row: {
    // flexDirection: 'column',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    marginBottom: 10,
    // height: 50,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.black,
    paddingVertical: 10,
    // width: 150,
  },
  input: {
    borderColor: Colors.black,
    borderWidth: 0.5,
    // marginHorizontal: 5,
    // paddingHorizontal: 20,
    height: 40,
    // width: '100%',
    borderRadius: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#2f81d9',
    padding: 10,
    marginTop: 16,
    marginLeft: 100,
    marginRight: 100,
    width: '100%',
    alignSelf: 'center',
    height: 40,
    borderRadius: 10,
  },
});
