import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import Colors from '../constants/Colors';
// import Mybutton from '../Form/Mybutton';
// import { setSessionField } from './actions/SessionActions';
// import {COLUMN_USER_ID} from './Constants/Constants';
import { BaseProps } from './Model/BaseProps';
import WrapperComponent from './Navigation/WrapperComponent';
// import {UserModel} from './Model/UserModel';
// import Sqlite from './Sqlite';
import { COLUMN_EMAIL, COLUMN_PASSWORD, TABLE_KHATABOOK } from './Sqlite/SqliteConstants';
import { SqliteUtils } from './Sqlite/SqliteUtils';

const Login: React.FC<BaseProps> = ({navigation,setSession}) => {
  // const [userId, setUserId] = useState();
  const [email, setEmail] = useState('mansuriaadil65@gmail.com');
  const [password, setPassword] = useState('aadil@1234');

/*   const data: UserModel = {
    email,
    password,
  }; */

  useEffect(() => {
    // Sqlite.displayAllUser(getdata)
    // Sqlite.addField()
  }, []);
  //   console.log(datas);
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const Login = async () => {
    if (!email) {
      alert('Please fill email');
      return;
    } else if (reg.test(email) === false) {
      alert('Email is not correct');
      return;
    } else if (!password) {
      alert('Please select password');
      return;
    }
    // Sqlite.deleteData()
    /* Sqlite.selectUser(data, getData => {
      if (getData.length > 0) {
        setUserId(getData[0][COLUMN_USER_ID]);
        console.log('data', getData[0][COLUMN_USER_ID]);
      } else {
        alert('user name and password invalid');
      }
    }); */
    console.log('click');
    
    let select= await SqliteUtils.select({tableName:TABLE_KHATABOOK,where:`${COLUMN_EMAIL}=? And ${COLUMN_PASSWORD}=?`,whereArgs:[email,password]})    
    if(select[0].rows.length>0){
      
        let temp=[]
        for(let i=0;i<select[0].rows.length;i++)
      {
        temp.push(select[0].rows.item(i))
      }
      let userId=temp[0].user_id
      console.log('temp[0].user_id',temp[0].user_id);
      
    setSession('user_id',userId);
      // navigation.navigate('Splash',{userId})
      navigation.replace('ViewData')
      // navigation.navigate('ViewData',{userId});
    }
  };
 /*  useEffect(() => {
    userId != undefined && navigation.navigate('ViewData', {userId});
  }, [userId]); */
  return (
    <View style={styles.main}>
      <TouchableWithoutFeedback
          onPress={() => {
            // setInputShow(false);
            navigation.goBack()
            // setLastText('');
              // setCountrySearch('');
              // setCountryData(CountryList);
          }}>
          <Image
            // source={require('.../assets/screens/CountryFlag/ic_arrow_back.png')}
            source={require('../../assets/Images/ic_arrow_back.png')}
            style={{
              width: 30,
              height: 30,
              tintColor: Colors.black,
              marginRight: 5,
            }}
          />
        </TouchableWithoutFeedback>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          textAlign: 'center',
          color: Colors.black,
        }}>
        Login in KhataBook
      </Text>
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.white,
          paddingHorizontal: 20,
          paddingVertical: 50,
          // alignItems: 'center',
        }}>
        <View style={styles.row}>
          <Text style={styles.label}>Email Id </Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Password </Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />
        </View>
        <TouchableWithoutFeedback
          onPress={() => {
            Login();
          }}>
          <View style={styles.button}>
            <Text style={{color: Colors.white}}>Login</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => {navigation.navigate('RegistrationForm')}}>
          <View style={{marginVertical:10}}>
            <Text>Registration</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};
export default WrapperComponent(Login);
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 10,
  },
  row: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    marginBottom: 10,
    // height: 50,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    // width: 100,
    color: Colors.black,
    marginVertical: 10,
  },
  input: {
    borderColor: Colors.black,
    borderWidth: 0.5,
    // marginHorizontal: 5,
    paddingHorizontal: 20,
    height: 50,
    // width: '100%',
    borderRadius: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: Colors.blue,//'#2f81d9'
    padding: 10,
    marginTop: 16,
    marginLeft: 100,
    marginRight: 100,
    width: '100%',
    alignSelf: 'center',
    height: 40,
    borderRadius: 10,
    opacity: 1,
  },
});
