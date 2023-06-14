import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {SqliteUtils} from './Sqlite/SqliteUtils';
import {
  COLUMN_CURRENT_BALANCE,
  COLUMN_PHONE_NUMBER,
  COLUMN_SENDER_ID,
  COLUMN_USER_NAME,
  TABLE_CUSTOMER,
} from './Sqlite/SqliteConstants';
import WrapperComponent from './Navigation/WrapperComponent';
import { BaseProps } from './Model/BaseProps';
import { fireEvent } from '../constants/EventBus';
// import {Contact} from '.';

const DisplayNumber: React.FC<BaseProps> = ({navigation, route,session}) => {
  // const [userId, setUserId] = useState('');
  // const [userName, setUserName] = useState('');
  // const [phoneNumber, setPhoneNumber] = useState('');
  const [customerData, setCustomerData] = useState([]);

  const item = route?.params?.item;
  console.log('route',route);
  const userId = parseInt(route?.params?.UserId);
  const phoneNumber = item?.phoneNumbers[0]?.number;
  const userName = item?.displayName;
  const current_bal = 0;
  /*   useEffect(() => {
    setUserId(route.params.UserId);
    setUserName(item?.displayName);
    setPhoneNumber(item.phoneNumbers[0].number);
  }, []); */
  // console.log(item.phoneNumbers[0].number);

  /*  const data: CustomerModel = {
    username: item?.displayName,
    phoneNum: item.phoneNumbers[0].number,
    // phoneNum:phoneNumber,
    SenderId: parseInt(route.params.UserId),
  }; */
  const data = {
    username: item?.displayName,
    phoneNum: phoneNumber,
    // phoneNum:phoneNumber,
    SenderId: parseInt(route?.params?.UserId),
    // email:'',
    // password:'',
    current_bal: '0',
  };
  /*   const data={
    tableName:'customer',
    addFieldName:'phoneNumber'
  } */

  /* const datas = {
    senderId: userId,
  }; */
  const displayUser = async () => {
    let dispalyCustomer = await SqliteUtils.select({
      tableName: TABLE_CUSTOMER,
      columnNames: [`${COLUMN_PHONE_NUMBER},${COLUMN_USER_NAME}`],
    });
    if (dispalyCustomer[0].rows.length > 0) {
      let temp = [];
      for (let i = 0; i < dispalyCustomer[0].rows.length; i++) {
        temp.push(dispalyCustomer[0].rows.item(i));
      }
      setCustomerData(temp);
      // console.log(temp);
    }
  };
  const insertCustomer = async () => {
    //   customerData.forEach((item)=>{

    //     if((item[COLUMN_PHONE_NUMBER]!=phoneNumber) &&(item[COLUMN_USER_NAME]!=userName))
    //     {
    // console.log((item[COLUMN_PHONE_NUMBER]!=phoneNumber) &&(item[COLUMN_USER_NAME]!=userName));
    const insert = await SqliteUtils.insert({
      tableName: TABLE_CUSTOMER,
      columnNames: [
        COLUMN_USER_NAME,
        COLUMN_PHONE_NUMBER,
        COLUMN_CURRENT_BALANCE,
        COLUMN_SENDER_ID,
      ],
      values: [userName, phoneNumber, current_bal, userId],
    });
    // console.log(insert);
    if (insert[0].rowsAffected > 0) {
      // alert('Insert Successfully');
      // const UserId = userId;
      // navigation.navigate('Contact');
      fireEvent('ViewData')
      navigation.navigate('ViewData');
      // route.params.changeCustomerData()
    } else {
      alert('Error');
    }
    //   }
    //   else{
    //     console.log((item[COLUMN_PHONE_NUMBER]!=phoneNumber) &&(item[COLUMN_USER_NAME]!=userName));
    //  navigation.navigate('UserTransactionEntry',{userId, item})
    //   }
    // })
    // console.log((item[COLUMN_PHONE_NUMBER]!=phoneNumber) &&(item[COLUMN_USER_NAME]!=userName));
    // console.log(item);
    // let insert= await SqliteUtils.insert({tableName:TABLE_CUSTOMER,columnNames:[COLUMN_USER_NAME,COLUMN_PHONE_NUMBER,COLUMN_CURRENT_BALANCE,COLUMN_SENDER_ID],values:[userName,phoneNumber,current_bal,userId]})
    // console.log(insert);
  };
  useEffect(() => {
    // console.log(userName, phoneNumber, current_bal, userId);
    insertCustomer();
    /*   customerData.forEach((item)=>{

      if((item[COLUMN_PHONE_NUMBER]!=phoneNumber) &&(item[COLUMN_USER_NAME]!=userName))
      {
  console.log((item[COLUMN_PHONE_NUMBER]!=phoneNumber) &&(item[COLUMN_USER_NAME]!=userName));
   let insert=  SqliteUtils.insert({tableName:TABLE_CUSTOMER,columnNames:[COLUMN_USER_NAME,COLUMN_PHONE_NUMBER,COLUMN_CURRENT_BALANCE,COLUMN_SENDER_ID],values:[userName,phoneNumber,current_bal,userId]})
     console.log(insert);
     return
      }
      else{
        console.log((item[COLUMN_PHONE_NUMBER]!=phoneNumber) &&(item[COLUMN_USER_NAME]!=userName));
        return navigation.navigate('UserTransactionEntry',{userId, item})
     
      }
    }) */
    //  insertCustomer()
    // Sqlite.insertCustomer(data, navigation);
    // Sqlite.insertData(data, navigation);
    // Sqlite.selectCustomer(data, getData);
  }, []);
  // console.log(customerData);

  return (
    <>
      <View style={styles.main}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
            backgroundColor: '#1974D2',
          }}>
          <TouchableWithoutFeedback
            style={{height: 30, width: 30, marginRight: 5}}
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              source={require('../../assets/Images/ic_arrow_back.png')}
              style={{
                width: 30,
                height: 30,
                tintColor: '#fff',
              }}
            />
          </TouchableWithoutFeedback>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableWithoutFeedback
              style={{
                // paddingHorizontal: 20,
                flexDirection: 'row',
                paddingVertical: 10,
              }}
              //   onPress={()=>{navigation.navigate('DisplayNumber',{UserId,item}) }}
            >
              {userName.startsWith('+') || userName.startsWith('9') ? (
                <Text
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: '#fff',
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    color: '#1974D2',
                    fontSize: 15,
                  }}>
                  +{userName[10]}
                </Text>
              ) : (
                <Text
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: '#fff',
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    color: '#1974D2',
                    fontSize: 15,
                  }}>
                  {userName[0]}
                </Text>
              )}
              <View style={{flexDirection: 'column', justifyContent: 'center'}}>
                <Text
                  style={{
                    //   padding: 10,
                    paddingHorizontal: 10,
                    color: '#fff',

                    //   width: '50%',
                  }}>
                  {item.displayName}
                </Text>
                <Text
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: 10,
                    fontSize: 12,
                    color: '#fff',
                  }}>
                  View Settings
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    </>
  );
};
export default WrapperComponent(DisplayNumber);
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
