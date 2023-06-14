import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Image, BackHandler, ToastAndroid, StatusBar} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {TransactionModel} from './Model/TransactionModel';
import {SqliteUtils} from './Sqlite/SqliteUtils';
import {
  COLUMN_AMOUNT,
  COLUMN_CURRENT_BALANCE,
  COLUMN_CUSTOMER_ID,
  COLUMN_RECEIVE_ID,
  COLUMN_RECEIVE_PHONE_NUMBER,
  COLUMN_SENDER_ID,
  COLUMN_USER_NAME,
  TABLE_CUSTOMER,
  TABLE_TRANSACTION,
} from './Sqlite/SqliteConstants';
import {BaseProps} from './Model/BaseProps';
import WrapperComponent from './Navigation/WrapperComponent';
import Colors from '../constants/Colors';
import ResponsivePixels from '../constants/ResponsivePixels';
import Fonts from '../constants/Fonts';
import { fireEvent } from '../constants/EventBus';
import { hp, wp } from '../constants';
// import {Contact} from '.';

const YouGave: React.FC<BaseProps> = ({navigation, route, session}) => {
  const [number, setNumber] = useState('');
  const [secoundNumber, setSecoundNumber] = useState('');
  const [operations, setOperations] = useState('');
  const [result, setResult] = useState('');
  const [currentBal, setCurrentBal] = useState('');
  const [error, setError] = useState('');
  const [amount, setAmount] = useState('');

  const btnClick = i => {
  console.log('i',i,number);
  
    (operations ? setSecoundNumber(secoundNumber + i) : setNumber(number + i))
  };
  const item = route.params.item;
  const currentBalGet = route.params.totalAmount;
  const username = item.user_name;
  // console.log('route', route);

  useEffect(() => {
    result ? setAmount(result) : setAmount(number);
    // console.log('currentBalGet',currentBalGet);

    if (number == '0' || secoundNumber == '0' || result == '0') {
      setError('Invalid Amount');
      return;
    } else if (
      number.length > 6 ||secoundNumber.length > 6 ||result.length > 6) {
      console.log('result');
      
      setError('Invalid Amount');
      return;
    }
    // console.log('number',result);
    
    setError('');
    setCurrentBal(
      Type == 'ReceiveMoney'
        ? (currentBalGet != null ? parseInt(currentBalGet) : 0) -
            parseInt(result || number)
        : parseInt(number || result) + currentBalGet,
      // console.log(parseInt(number || result) + parseInt(currentBalGet));
    );
    // setCurrentBal(currentBalGet);
  }, [number, secoundNumber,result]);
  
  const Type = route.params.Type;
  const receive_phoneNumber = (item.phone_number = null
    ? parseInt(item.phone_number)
    : parseInt('1'));
  const sender_id = parseInt(
    route.params.Type == 'ReceiveMoney' ? item.cutomer_id : session.user_id,
  );
  const amounts = amount;
  const receive_id = parseInt(
    route.params.Type == 'ReceiveMoney' ? session.user_id : item.cutomer_id,
  );
  const current_bal = parseInt(currentBal);
  const Insert = async () => {
    let insertEntries = await SqliteUtils.insert({
      tableName: TABLE_TRANSACTION,
      columnNames: [
        COLUMN_RECEIVE_ID,
        COLUMN_AMOUNT,
        COLUMN_RECEIVE_PHONE_NUMBER,
        COLUMN_SENDER_ID,
        COLUMN_CURRENT_BALANCE,
        COLUMN_USER_NAME,
      ],
      values: [
        receive_id,
        amounts,
        receive_phoneNumber,
        sender_id,
        current_bal,
        username,
      ],
    });
    let updateData = await SqliteUtils.update({
      tableName: TABLE_CUSTOMER,
      columnNames: [COLUMN_CURRENT_BALANCE],
      where: `${COLUMN_CUSTOMER_ID}=?`,
      values: [currentBal],
      whereArgs: [item.cutomer_id],
    });
    if (insertEntries[0].rowsAffected > 0 && updateData[0].rowsAffected > 0) {
      ToastAndroid.show('Insert Successfully',ToastAndroid.BOTTOM) 
      // ('Insert Successfully');
      // route.params.onDataEntered();
      fireEvent('DataEntry')
      navigation.goBack();
    } else {
      alert('Error');
    }
  };

  const sum = () => {
    if (operations == '+') {
      setResult(parseFloat(result || number) + parseFloat(secoundNumber));
      clear();
    } else if (operations == '-') {
      setResult(parseFloat(result || number) - parseFloat(secoundNumber));
      clear();
    } else if (operations == '*') {
      setResult(parseFloat(result || number) * parseFloat(secoundNumber));
      clear();
    } else if (operations == '/') {
      setResult(parseFloat(result || number) / parseFloat(secoundNumber));
      clear();
    }
  };

  const clearBtn = () => {
    setNumber('');
    setSecoundNumber('');
    setOperations('');
    setResult('');
  };
  const clear = () => {
    setNumber('');
    setSecoundNumber('');
    setOperations('');
  };
  // console.log(number);

  useEffect(()=>{
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
    
  },[])

  const backAction=()=>{
    // route.params.onDataEntered();
    fireEvent('DataEntry')
    navigation.goBack();
    // route.params.onDataEntered();
            return true;
  }
console.log('number',number);

  return (
    <>
    <StatusBar
    backgroundColor={Colors.backgroundColor}
    barStyle='dark-content'
    />
    <View style={styles.main}>
      <View style={styles.row}>
        <TouchableWithoutFeedback
          style={{
            height: ResponsivePixels._30,
            width: ResponsivePixels._30,
            marginRight: ResponsivePixels._10,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
           fireEvent('DataEntry')
            navigation.goBack();
            // navigation.navigate('UserTransactionEntry', { item});
          }}>
          <Image
            source={require('../../assets/Images/ic_arrow_back.png')}
            style={[
              {
                width: ResponsivePixels._25,
                height: ResponsivePixels._25,
                tintColor: Colors.redColor,
              },
              Type == 'ReceiveMoney' && styles.backStyle,
            ]}
          />
        </TouchableWithoutFeedback>
        <Text
          style={
            Type == 'ReceiveMoney' ? styles.youGetText : styles.youGaveText
          }>
          {`You gave \u20B9 ${
            result
              ? result
              : number === '' || number === '0'
              ? 0
              : (number)
          } to ${item?.user_name}`}
        </Text>
      </View>
      <View
        style={{
          alignItems: 'flex-end',
          paddingVertical: ResponsivePixels._20,
          // paddingEnd: ResponsivePixels._10,
          padding: ResponsivePixels._10
          
        }}>
        {result ? (
          <Text style={Type == 'ReceiveMoney' ? styles.inputGet : styles.input}>
            {/* {setAmount(result)} */}
            {`\u20B9 ${result} ${operations} ${secoundNumber}`}
          </Text>
        ) : (
          <Text style={Type == 'ReceiveMoney' ? styles.inputGet : styles.input}>
            {/* {setAmount(number)} */}
            {`\u20B9  ${
              number == '' ? '' : number == '0' ? '0' : (number)
            } ${operations}  ${
              secoundNumber == '' ? '' : (secoundNumber)
            }`}
          </Text>
        )}
        {error != '' && (
          <Text style={Type == 'ReceiveMoney' ? styles.inputGet : styles.input}>
            {error}
          </Text>
        )}
      </View>
      <View style={error != '' ? styles.mainInput : {marginTop: hp(37),marginHorizontal:ResponsivePixels._10,}}>
        <TouchableWithoutFeedback
          containerStyle={
            Type == 'ReceiveMoney'
              ? (error|| (number.length==0 && result.length==0)) ?styles.errorReceiveStyle : styles.saveReceiveStyle
              :   (error|| (number.length==0 && result.length==0))?styles.errorSendStyle :styles.saveSendStyle
          }
          onPress={() => {
            (!error) && Insert();
          }}> 
          <Text style={{color:Colors.white, textTransform: 'uppercase'}}>Save</Text>
        </TouchableWithoutFeedback>
      </View>
      <View style={{position:'absolute',bottom:0,width:wp('100%')}}>
    <View style={styles.rowStyle}>
      <TouchableWithoutFeedback
        // containerStyle={styles.button}
        containerStyle={styles.button}
        onPress={() => {
          clearBtn();
        }}>
        <Text style={styles.buttonText}>C</Text>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        containerStyle={styles.button}
        onPress={() => {
          operations
            ? secoundNumber.length > 0
              ? setSecoundNumber(secoundNumber.slice(0, -1))
              : setOperations('')
            : setNumber(number.slice(0, -1));
        }}>
        <Text style={styles.buttonText}>CE</Text>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        containerStyle={styles.button}
        onPress={() => {
          setOperations('/');
        }}>
        <Text style={styles.buttonText}>/</Text>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        containerStyle={styles.button}
        onPress={() => {
          setOperations('%');
        }}>
        <Text style={styles.buttonText}>%</Text>
      </TouchableWithoutFeedback>
      </View>
      <View style={styles.rowStyle}>
      <TouchableWithoutFeedback
        containerStyle={styles.button}
        onPress={() => {
          btnClick(1);
        }}>
        <Text style={styles.buttonText}>1</Text>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        containerStyle={styles.button}
        onPress={() => {
          btnClick(2);
        }}>
        <Text style={styles.buttonText}>2</Text>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        containerStyle={styles.button}
        onPress={() => {
          btnClick(3);
        }}>
        <Text style={styles.buttonText}>3</Text>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        containerStyle={styles.button}
        onPress={() => {
          setOperations('+');
        }}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableWithoutFeedback>
      </View>
      <View style={styles.rowStyle}>
      <TouchableWithoutFeedback
        containerStyle={styles.button}
        onPress={() => {
          btnClick(4);
        }}>
        <Text style={styles.buttonText}>4</Text>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        containerStyle={styles.button}
        onPress={() => {
          btnClick(5);
        }}>
        <Text style={styles.buttonText}>5</Text>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        containerStyle={styles.button}
        onPress={() => {
          btnClick(6);
        }}>
        <Text style={styles.buttonText}>6</Text>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => {
          setOperations('-');
        }}
        containerStyle={styles.button}>
        <Text style={styles.buttonText}>-</Text>
      </TouchableWithoutFeedback>
      </View>
      <View style={styles.rowStyle}>
      <TouchableWithoutFeedback
        containerStyle={styles.button}
        onPress={() => {
          btnClick(7);
        }}>
        <Text style={styles.buttonText}>7</Text>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        containerStyle={styles.button}
        onPress={() => {
          btnClick(8);
        }}>
        <Text style={styles.buttonText}>8</Text>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        containerStyle={styles.button}
        onPress={() => {
          btnClick(9);
        }}>
        <Text style={styles.buttonText}>9</Text>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        containerStyle={styles.button}
        onPress={() => {
          setOperations('*');
        }}>
        <Text style={styles.buttonText}>*</Text>
      </TouchableWithoutFeedback>
      </View>
      <View style={styles.rowStyle}>
      <TouchableWithoutFeedback
        containerStyle={styles.button}
        onPress={() => {
          operations?
          secoundNumber.includes('.') ? btnClick('') : btnClick('.')
          :number.includes('.') ? btnClick('') : btnClick('.')
        }}>
        <Text style={styles.buttonText}>.</Text>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        containerStyle={styles.button}
        onPress={() => {
          btnClick(0);
        }}>
        <Text style={styles.buttonText}>0</Text>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        containerStyle={styles.button}
        onPress={() => {
          operations
            ? secoundNumber.includes('-')
              ? setSecoundNumber(secoundNumber.replace('-', ''))
              : setSecoundNumber('-' + secoundNumber)
            : number.includes('-')
            ? setNumber(number.replace('-', ''))
            : setNumber('-' + number);
        }}>
        <Text style={styles.buttonText}>+/-</Text>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        containerStyle={styles.button}
        onPress={() => {
          sum(operations);
        }}>
        <Text style={styles.buttonText}>=</Text>
      </TouchableWithoutFeedback>
      </View>
    </View>
    </View>
    </>
  );
};
export default WrapperComponent(YouGave);
const styles = StyleSheet.create({
  main: {
    flex: 1,
    // padding: ResponsivePixels._10,
    position:'relative',
    backgroundColor:Colors.backgroundColor
  },
  mainInput: {
    marginTop: ResponsivePixels._250,
    marginHorizontal:ResponsivePixels._10,
    marginVertical:ResponsivePixels._5
    // height:ResponsivePixels._150,
    // backgroundColor:'red',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: ResponsivePixels._10

  }, rowStyle:{flexDirection: 'row',marginVertical:ResponsivePixels._10},
  youGaveText: {
    color: Colors.redColor,
    fontSize: Fonts.size._20px,
    maxHeight:ResponsivePixels._29
  },
  youGetText: {
    color: Colors.greenDarkColor,
    fontSize: Fonts.size._20px,
    maxHeight:ResponsivePixels._30
    
  },
  input: {
    fontSize: Fonts.size._22px,
    backgroundColor: Colors.white,
    width: '100%',
    color: Colors.redColor,
    height:ResponsivePixels._50,
    paddingVertical: ResponsivePixels._10,
    fontFamily:Fonts.name.OpenSans_Bold,
    paddingHorizontal: ResponsivePixels._15,
  },
  inputGet: {
    fontSize: Fonts.size._22px,
    fontFamily:Fonts.name.OpenSans_Bold,
    backgroundColor: Colors.white,
    width: '100%',
    color: Colors.greenDarkColor,
    height:ResponsivePixels._50,
    paddingVertical: ResponsivePixels._10,
    paddingHorizontal: ResponsivePixels._15,
  },
  inputBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    height:ResponsivePixels._300,
   },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: ResponsivePixels._48,
    marginStart: ResponsivePixels._10,
    marginEnd: ResponsivePixels._10,
    paddingVertical:ResponsivePixels._10,
    paddingHorizontal:ResponsivePixels._30,
    borderRadius: ResponsivePixels._10,
    backgroundColor: Colors.white,
    flex:1,
  },

  buttonText: {
    fontFamily: Fonts.name.OpenSans_Bold,
    fontSize: Fonts.size._18px,
    color: Colors.black,
    textAlign: 'center',
  },
  saveSendStyle: {
    alignItems: 'center',
    backgroundColor: Colors.redColor,
    padding: ResponsivePixels._10,
    marginTop: ResponsivePixels._16,
    marginLeft: ResponsivePixels._100,
    marginRight: ResponsivePixels._100,
    width: '100%',
    alignSelf: 'center',
    height: ResponsivePixels._45,
    borderRadius: ResponsivePixels._5,
  },
  saveReceiveStyle: {
    alignItems: 'center',
    backgroundColor: Colors.greenDarkColor,
    padding: ResponsivePixels._10,
    marginTop: ResponsivePixels._16,
    marginLeft: ResponsivePixels._100,
    marginRight: ResponsivePixels._100,
    width: '100%',
    alignSelf: 'center',
    height: ResponsivePixels._45,
    borderRadius: ResponsivePixels._5,
  },
  errorReceiveStyle:{
    alignItems: 'center',
    backgroundColor: Colors.greenDarkColor,
    opacity:0.1,
    padding: ResponsivePixels._10,
    marginTop: ResponsivePixels._16,
    marginLeft: ResponsivePixels._100,
    marginRight: ResponsivePixels._100,
    width: '100%',
    alignSelf: 'center',
    height: ResponsivePixels._45,
    borderRadius: ResponsivePixels._5,
    
  
  },
  errorSendStyle:{
    alignItems: 'center',
    backgroundColor:  Colors.redColor,
    opacity:0.1,
    padding: ResponsivePixels._10,
    marginTop: ResponsivePixels._16,
    marginLeft: ResponsivePixels._100,
    marginRight: ResponsivePixels._100,
    width: '100%',
    alignSelf: 'center',
    height: ResponsivePixels._45,
    borderRadius: ResponsivePixels._5,
  
  },
  backStyle: {
    width: ResponsivePixels._25,
    height: ResponsivePixels._25,
    tintColor: Colors.greenDarkColor,
  },
});
