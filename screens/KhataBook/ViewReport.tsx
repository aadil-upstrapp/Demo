import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  FlatList,
  Image,
  TextInput,
  Alert,
  StatusBar,
} from 'react-native';
import {
  COLUMN_USER_NAME,
  // COLUMN_RECEIVE_ID,
  // COLUMN_AMOUNT,
  // COLUMN_SENDER_ID,
  // COLUMN_USER_ID,
  // COLUMN_CURRENT_BALANCE,
  COLUMN_SENDER_ID,
  TABLE_TRANSACTION,
  COLUMN_AMOUNT,
  COLUMN_RECEIVE_ID,
  COLUMN_TRANSACTION_ID,
  TABLE_CUSTOMER,
  COLUMN_MONEY,
  COLUMN_CURRENT_BALANCE,
} from './Sqlite/SqliteConstants';
// import Sqlite from './Sqlite';
import {SqliteUtils} from './Sqlite/SqliteUtils';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { BaseProps } from './Model/BaseProps';
import WrapperComponent from './Navigation/WrapperComponent';
import ResponsivePixels from '../constants/ResponsivePixels';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import { fireEvent } from '../constants/EventBus';

const ViewReport: React.FC<BaseProps> = ({navigation,session}) => {
  const [search, setSearch] = useState('');
  const [lastText, setLastText] = useState('');
  const [netBalance, setNetBalance] = useState(0);
  const [totalEntries, setTotalEntries] = useState(0);
  const [gaveAmount, setGaveAmount] = useState('');
  const [recevieAmount, setRecevieAmount] = useState('');
  const [transactionData, setTransactionData] = useState([]);
  const [data, setData] = useState([]);

  

 /*  const DownloadPdf=()=>{
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)
      .then(contacts => {
        // work with contacts
        console.log('contacts', );
          //   console.log('line 4');
        // });
      })
      .catch(e => {
        console.log(e);
      });
  } */
 
  const UserId= session.user_id;

  const deleteAllEntries=async()=>{
    const Delete=await SqliteUtils.delete({tableName:TABLE_TRANSACTION})
    console.log(Delete[0].rowsAffected);
    if(Delete[0].rowsAffected){
      const updateData=await SqliteUtils.update({tableName:TABLE_CUSTOMER,columnNames:[COLUMN_CURRENT_BALANCE],values:[0]})
      console.log(updateData);
      fireEvent('ViewData')
      navigation.goBack()}
    
  }
 
  const Search = () => {
    if (search) {
      const a = search.toLowerCase().split(' ');
      const arr = search.startsWith(lastText) ? transactionData : data;

      setTransactionData(
        arr.filter(
          item =>
            item[COLUMN_AMOUNT].toString().startsWith(search) ||
            a.every(v =>
              item[COLUMN_USER_NAME].toLowerCase()
                // item[COLUMN_AMOUNT]
                .split(' ')
                .some(i => i.startsWith(v)),
            ),
          // item[COLUMN_AMOUNT].startsWith(search)
        ),
        /*  arr.filter(item =>
          a.every(v =>
            item[COLUMN_USER_NAME].toLowerCase()
            // item[COLUMN_AMOUNT]
            .split(' ')
            .some(i => i.startsWith(v)),
            ),), */
      );
    } else {
      setTransactionData(data);
    }
    setLastText(search);
  };
 
  useEffect(() => {
    
    let getAmountSum = 0;
    let giveAmountSum = 0;
    transactionData.forEach(item => {
      item[COLUMN_SENDER_ID] == UserId
        ? (giveAmountSum += item[COLUMN_AMOUNT])
        : (getAmountSum += item[COLUMN_AMOUNT]);
    });
    setGaveAmount(giveAmountSum);
    setRecevieAmount(getAmountSum);
    setNetBalance(getAmountSum - giveAmountSum);
    setTotalEntries(transactionData.length);
  }, [transactionData]);
 
  useEffect(() => {
    Search();
  }, [search]);
  // const UserId=UserId
 
  const EntriesData = async () => {
    const Entries = await SqliteUtils.select({
      tableName: TABLE_TRANSACTION,
      columnNames: [
        COLUMN_USER_NAME,
        COLUMN_AMOUNT,
        COLUMN_SENDER_ID,
        COLUMN_RECEIVE_ID,
      ],
      where: `${COLUMN_SENDER_ID}=? or ${COLUMN_RECEIVE_ID}=?`,
      whereArgs: [UserId, UserId],
      orderBy: [COLUMN_TRANSACTION_ID],
      orderByDesc: true,
    });
    setTotalEntries(Entries[0].rows.length);
    // console.log(Entries[0].rows.length);
    let temp = [];
    for (let i = 0; i < Entries[0].rows.length; i++) {
      temp.push(Entries[0].rows.item(i));
    }
    // let getAmountSum = 0;
    // let giveAmountSum = 0;
    // temp.forEach(item => {
    //   item[COLUMN_SENDER_ID] == UserId
    //     ? // ?
    //       // :
    //       // item[COLUMN_AMOUNT]?.toString().startsWith('-')
    //       (giveAmountSum += item[COLUMN_AMOUNT])
    //     : (getAmountSum += item[COLUMN_AMOUNT]);
    // });
    // setGaveAmount(giveAmountSum);
    // setRecevieAmount(getAmountSum);
    // setNetBalance(getAmountSum - giveAmountSum);
    setData(temp);    
    setTransactionData(temp);
    // console.log(temp);
  };
 
  const DownloadPdf=async ()=>{
    let options = {
      html:
      //  '<h1>Sample PDF File</h1>' +
      //   '<p> This is sample paragraph. Welcome to ReactNativeCode.com </p>'+
      `<div style="display: flex;flex-direction: row">
      <p style="flex:1">Total Debit(-) </p>
      <p style="flex:1">Total Credit(+) </p>
      <p style="flex:1">Net balance </p>
      </div>`+
      `<div style="display: flex;flex-direction: row">
      <p style="flex:1;color:red">${gaveAmount} </p>
      <p style="flex:1;color:green">${recevieAmount} </p>
      <p style=${netBalance.toString().startsWith('-')?"flex:1;color:red":"flex:1;color:green"}>${Math.abs(netBalance)}</p>
      </div>`+
            `<div style="display: flex;flex-direction: row">
            <p style="flex:3">Name </p>
            <p style="flex:1">Debit </p>
            <p style="flex:1">Credit </p>
            </div>`+
            `${transactionData.map((item)=>
          `<div style="display:flex;flex-direction:row">
          <p style="flex:3">${item[COLUMN_USER_NAME]} </p>
          <p style="flex:1;color:red">${UserId==item[COLUMN_SENDER_ID]? item[COLUMN_AMOUNT]:0}</p>
          <p style="flex:1;color:green">${UserId==item[COLUMN_RECEIVE_ID]? item[COLUMN_AMOUNT]:0}</p>
          </div>`
          )}`,
      fileName: 'demoFile',
      directory: 'Download'
    };
 
    let file = await RNHTMLtoPDF.convert(options)
    console.log('file',file);
    
    Alert.alert(file.filePath);
  }
  
  useEffect(() => {   
    EntriesData();
  }, []);

  return (
    <>
    <StatusBar
    backgroundColor={Colors.blue}
    barStyle='light-content'
    />
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <View style={{justifyContent:'center',alignItems:'center',flexDirection:'row'}}>

          
          <TouchableWithoutFeedback
            onPress={() => {
              // setInputShow(false);
              navigation.goBack();
              // setLastText('');
              // setCountrySearch('');
              // setCountryData(CountryList);
            }}>
            <Image
              // source={require('.../assets/screens/CountryFlag/ic_arrow_back.png')}
              source={require('../../assets/Images/ic_arrow_back.png')}
              style={{
                width:  ResponsivePixels._30,
                height:  ResponsivePixels._30,
                tintColor: Colors.white,
              }}
            />
          </TouchableWithoutFeedback>
          <Text
            style={{
              fontSize:Fonts.size._20px,
              textAlign: 'center',
              color: Colors.white,
              paddingHorizontal:  ResponsivePixels._10,
            }}>
            View Report
          </Text>
          </View>
          <TouchableWithoutFeedback onPress={()=>{ Alert.alert(
                      'Delete',
                      'Are you sure you want to permanently delete all data',
                      [
                        {
                          text: 'Cancel',
                          onPress: () => console.log('Cancel Pressed'),
                          style: 'cancel',
                        },
                        {text: 'OK', onPress: () => deleteAllEntries()},
                      ],
                    );}}>

                <Image source={require('../../assets/Images/ic_delete.jpg')} style={styles.dotsIconStyle} />
                </TouchableWithoutFeedback>
        </View>
        <View style={styles.searchEntries}>
          <TextInput
            value={search}
            onChangeText={setSearch}
            style={styles.textInputStyle}
            placeholder="Search Entries"
          />
        </View>
      </View>
      <View style={styles.row}>
        <Text style={styles.netBalanceStyle}>Net Balance</Text>
        <Text
          style={
            netBalance.toString().startsWith('-')
              ? styles.gaveAmountStyle
              : styles.giveAmountStyle
          }>{`\u20B9 ${Math.abs(netBalance)}`}</Text>
      </View>
      <View style={styles.row}>
        <View style={{flex: 3, flexDirection: 'column'}}>
          <Text style={styles.totalStyle}>Total</Text>
          <Text style={styles.totalEntries}>{`${totalEntries} Entries`}</Text>
        </View>
        <View style={styles.totalAmount}>
          <Text style={styles.totalStyle}>you gave</Text>
          <Text style={styles.gaveAmountStyle}>{`\u20B9 ${gaveAmount}`}</Text>
        </View>
        <View style={styles.totalAmount}>
          <Text style={styles.totalStyle}>you got</Text>
          <Text
            style={styles.giveAmountStyle}>{`\u20B9 ${recevieAmount}`}</Text>
        </View>
      </View>
      <FlatList
        data={transactionData}
        renderItem={({item}) => (
          <>
            <View style={styles.row}>
              <View style={{flex: 3, flexDirection: 'column'}}>
                <Text>{item[COLUMN_USER_NAME]}</Text>
              </View>
              <View style={styles.totalAmount}>
                <Text style={styles.gaveAmountStyle}>
                  {item[COLUMN_SENDER_ID] == UserId
                    ? `\u20B9 ${item[COLUMN_AMOUNT]}`
                    : null}
                </Text>
              </View>
              <View style={styles.totalAmount}>
                <Text style={styles.giveAmountStyle}>
                  {item[COLUMN_RECEIVE_ID] == UserId
                    ? `\u20B9 ${item[COLUMN_AMOUNT]}`
                    : null}
                </Text>
              </View>
              {/* <Text>{item[COLUMN_USER_NAME]}</Text> */}
            </View>
          </>
        )}
      />
      <View style={{backgroundColor: Colors.white, height:  ResponsivePixels._60, padding: ResponsivePixels._10}}>
        <TouchableWithoutFeedback onPress={()=>{DownloadPdf()}}>
          <View
            style={{
              backgroundColor: Colors.blue,
              padding:  ResponsivePixels._5,
              width: '100%',
              borderRadius:  ResponsivePixels._5,
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: Colors.white,
                textTransform: 'uppercase',
              }}>
              Download
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
};
export default WrapperComponent(ViewReport);
const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.blue,
  },
  headerTitle: {
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    // borderBottomWidth:1,
    paddingHorizontal:  ResponsivePixels._15,
    paddingVertical:  ResponsivePixels._10,
  },
  searchEntries: {
    marginHorizontal:  ResponsivePixels._10,
    marginVertical:  ResponsivePixels._10,
    height:  ResponsivePixels._45,
    
  },
  textInputStyle: {
    backgroundColor: Colors.white,
    borderRadius:  ResponsivePixels._5,
    // paddingHorizontal:  ResponsivePixels._10,
    // height:ResponsivePixels._45,
    padding:ResponsivePixels._10
  },
  netBalanceStyle: {
    fontSize:Fonts.size._15px,
    fontWeight: 'bold',
    color: Colors.black,
  },
  dotsIconStyle: {
    width: ResponsivePixels._25,
    height: ResponsivePixels._25,
    alignSelf: 'center',
    resizeMode: 'cover',
    tintColor:'#fff',
    // fontSize: Fonts.size._15px,
    marginHorizontal: ResponsivePixels._3,
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal:  ResponsivePixels._10,
    paddingVertical:  ResponsivePixels._10,
    borderBottomWidth: 0.5,
    borderBottomColor:Colors.black,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  totalStyle: {
    fontSize: Fonts.size._14px,
    textTransform: 'uppercase',
  },
  totalEntries: {
    fontWeight: 'bold',
    fontSize: Fonts.size._15px,
    color: Colors.black,
  },
  totalAmount: {flex: 1, flexDirection: 'column', alignItems: 'flex-end'},
  gaveAmountStyle: {
    color: 'red',
  },
  giveAmountStyle: {
    color:Colors.greenDarkColor,
  },
});
