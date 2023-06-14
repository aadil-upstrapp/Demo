import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  BackHandler,
  Alert,
} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {wp} from '../constants';
import Colors from '../constants/Colors';
import {fireEvent, registerEvent, removeEvent} from '../constants/EventBus';
import Fonts from '../constants/Fonts';
import ResponsivePixels from '../constants/ResponsivePixels';
import {BaseProps} from './Model/BaseProps';
import WrapperComponent from './Navigation/WrapperComponent';
import {
  COLUMN_AMOUNT,
  COLUMN_CURRENT_BALANCE,
  COLUMN_CUSTOMER_ID,
  COLUMN_RECEIVE_ID,
  COLUMN_SENDER_ID,
  COLUMN_TRANSACTION_ID,
  TABLE_CUSTOMER,
  TABLE_TRANSACTION,
} from './Sqlite/SqliteConstants';
import {SqliteUtils} from './Sqlite/SqliteUtils';

const UserTransactionEntry: React.FC<BaseProps> = ({
  navigation,
  route,
  session,
}) => {
  const [userId, setUserId] = useState('');
  const [receiveId, setReceiveId] = useState('');
  const [userName, setUserName] = useState('');
  const [transactionData, setTransactionData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  // console.log('route', route,transactionData);
  const item =route.params.item == undefined ? route.params.items : route.params.item;
  const UserId = session.user_id;

  const dataEntries = async () => {
    const displayEntries = await SqliteUtils.select({
      tableName: TABLE_TRANSACTION,
      where: `(${COLUMN_RECEIVE_ID}=? or ${COLUMN_RECEIVE_ID}=?)And (${COLUMN_SENDER_ID}=? or ${COLUMN_SENDER_ID}=?) `,
      whereArgs: [
        session.user_id,
        item?.cutomer_id,
        session.user_id,
        item?.cutomer_id,
      ],
    });
    if (displayEntries[0].rows.length > 0) {
      var temp = [];
      for (let i = 0; i < displayEntries[0].rows.length; ++i) {
        temp.push(displayEntries[0].rows.item(i));
      }
      setTransactionData(temp);
      let currentTotal = 0;
      temp.forEach(item => {
        {
          (item[COLUMN_SENDER_ID] == receiveId ||
            item[COLUMN_RECEIVE_ID] == receiveId) &&
          item[COLUMN_CURRENT_BALANCE] == 0
            ? (currentTotal = 0)
            : (currentTotal = item[COLUMN_CURRENT_BALANCE]);
        }
      });
      setTotalAmount(currentTotal);
    }
  };
  const deleteData = async () => {
    /* const Delete = await SqliteUtils.delete({tableName:TABLE_CUSTOMER,where:`${COLUMN_CUSTOMER_ID}=?`,whereArgs:[item?.cutomer_id]})
    console.log('delete',Delete[0]);
    if(Delete[0].rowsAffected)
    { */
    const select = await SqliteUtils.select({
      tableName: TABLE_TRANSACTION,
      columnNames: [COLUMN_TRANSACTION_ID],
      where: `${COLUMN_RECEIVE_ID}=? Or ${COLUMN_SENDER_ID}=?`,
      whereArgs: [item?.cutomer_id, item?.cutomer_id],
    });
    let temp = [];
    for (let i = 0; i < select[0].rows.length; i++) {
      temp.push(select[0].rows.item(i));
    }
    for (let i = 0; i < temp.length; i++) {
      let id = temp[i];
      const deleteEntery = await SqliteUtils.delete({
        tableName: TABLE_TRANSACTION,
        where: `${COLUMN_TRANSACTION_ID}=?`,
        whereArgs: [id[COLUMN_TRANSACTION_ID]],
      });
      console.log(deleteEntery[0].rows);
      if (deleteEntery[0].rows) {
        const updateData = await SqliteUtils.update({
          tableName: TABLE_CUSTOMER,
          columnNames: [COLUMN_CURRENT_BALANCE],
          values: [0],
          where: `${COLUMN_CUSTOMER_ID}=?`,
          whereArgs: [item?.cutomer_id],
        });

        console.log('updateData', updateData[0].rowsAffected);
        
        if(updateData[0].rowsAffected){
          setTransactionData([])
          setTotalAmount(0)
          // dataEntries()
          // fireEvent('DataEntry') 
          
        }
      }
    }

    // dataEntries();
    //  navigation.goBack()
    // }

    // console.log(select,temp);
  };

  useEffect(() => {
    setUserId(UserId);
    setUserName(item?.user_name);
    setReceiveId(item?.cutomer_id);
    dataEntries();
    registerEvent('DataEntry', dataEntries);
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
      removeEvent('DataEntry');
    };
  }, []);

  const backAction = () => {
    fireEvent('ViewData');
    navigation.goBack();
    return true;
  };

  return (
    <>
      <View style={styles.main}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: ResponsivePixels._10,
            backgroundColor: Colors.blue,
          }}>
          <TouchableWithoutFeedback
            style={{
              height: ResponsivePixels._30,
              width: ResponsivePixels._30,
              marginRight: ResponsivePixels._5,
            }}
            onPress={() => {
              // route.params.changeCustomerData=='undefined'?null:route.params.changeCustomerData()
              fireEvent('ViewData');
              navigation.goBack();
            }}>
            <Image
              source={require('../../assets/Images/ic_arrow_back.png')}
              style={{
                width: ResponsivePixels._30,
                height: ResponsivePixels._30,
                tintColor: Colors.white,
              }}
            />
          </TouchableWithoutFeedback>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              // justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                paddingVertical: ResponsivePixels._10,
                alignItems: 'center',
                // justifyContent:'space-between'
              }}>
              {userName?.startsWith('+') || userName?.startsWith('9') ? (
                <Text
                  style={{
                    width: ResponsivePixels._40,
                    height: ResponsivePixels._40,
                    borderRadius: ResponsivePixels._20,
                    backgroundColor: Colors.white,
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    color: Colors.blue,
                    fontSize: Fonts.size._15px,
                  }}>
                  +{userName[10]}
                </Text>
              ) : (
                <Text
                  style={{
                    width: ResponsivePixels._40,
                    height: ResponsivePixels._40,
                    borderRadius: ResponsivePixels._20,
                    backgroundColor: Colors.white,
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    color: Colors.blue,
                    fontSize: Fonts.size._15px,
                  }}>
                  {userName[0]}
                </Text>
              )}
              <View style={{justifyContent: 'center'}}>
                <Text
                  style={{
                    paddingHorizontal: ResponsivePixels._10,
                    color: Colors.white,
                    maxWidth: wp(70),
                    minWidth: wp(55),
                  }}>
                  {userName}
                </Text>
              </View>
              <View style={{flex: 1}}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    Alert.alert(
                      'Delete',
                      'Are you sure you want to permanently delete this data',
                      [
                        {
                          text: 'Cancel',
                          onPress: () => console.log('Cancel Pressed'),
                          style: 'cancel',
                        },
                        {text: 'OK', onPress: () => deleteData()},
                      ],
                    );
                  }}>
                  <Image
                    source={require('../../assets/Images/ic_delete.jpg')}
                    style={styles.dotsIconStyle}
                  />
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>
        </View>
        {
          <View style={styles.entriesStyle}>
            <View style={styles.entriesTitle}>
              <Text style={styles.entriesText}>Entries</Text>
              <Text style={styles.youGaveText}>You Gave</Text>
              <Text style={styles.youGaveText}>You Got</Text>
            </View>
            {
              transactionData.length>0?
              <FlatList
                data={transactionData}
                style={{marginBottom: ResponsivePixels._50}}
                renderItem={({item}) => (
                  <>
                    {(item[COLUMN_RECEIVE_ID] == receiveId ||
                      item[COLUMN_SENDER_ID] == receiveId) && (
                      <View style={styles.entriesBox}>
                        <View style={styles.dateStyle}>
                          <Text
                            // style={styles.balText}
                            style={[
                              {
                                textAlign: 'center',
                                textAlignVertical: 'center',
                                textTransform: 'capitalize',
                                paddingHorizontal: ResponsivePixels._5,
                                // backgroundColor: 'red',
                                color: 'red',
                              },
                              (item[
                                COLUMN_CURRENT_BALANCE
                              ]?.toString().startsWith('-') ||
                                item[COLUMN_CURRENT_BALANCE] == 0) &&
                                styles.balText,
                            ]}>
                            {`bal. \u20B9 ${Math.abs(
                              item[COLUMN_CURRENT_BALANCE],
                            )}  `}
                          </Text>
                        </View>
                        {item[COLUMN_SENDER_ID] == UserId ? (
                          <Text style={styles.gaveAmountText}>
                            {`\u20B9 ${
                              item[COLUMN_SENDER_ID] == userId &&
                              item[COLUMN_AMOUNT]
                            } `}
                          </Text>
                        ) : (
                          <Text style={styles.gaveAmountText}></Text>
                        )}

                        {item[COLUMN_RECEIVE_ID] == UserId ? (
                          <Text style={styles.gotAmountText}>
                            {`\u20B9 ${
                              item[COLUMN_RECEIVE_ID] == userId &&
                              item[COLUMN_AMOUNT]
                            } `}
                          </Text>
                        ) : (
                          <Text style={styles.gotAmountText}></Text>
                        )}
                      </View>
                    )}
                  </>
                )}
              />
              :
              null
            }
          </View>
          // )
        }
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            backgroundColor: Colors.white,
            width: '100%',
            paddingBottom: ResponsivePixels._15,
            paddingTop: ResponsivePixels._10,
            paddingHorizontal: ResponsivePixels._10,
            flexDirection: 'row',
          }}>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate('YouGave', {
                item,
                totalAmount,
                Type: 'SendMoney',
                // onDataEntered: dataEntries
              });
            }}
            containerStyle={{
              backgroundColor: Colors.redColor,
              marginRight: ResponsivePixels._5,
              borderRadius: ResponsivePixels._5,
              flex: 1,
              paddingVertical: ResponsivePixels._10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={styles.buttonText}> {`You Gave \u20B9`}</Text>
          </TouchableWithoutFeedback>
          {/* {console.log('totalAmount', totalAmount)} */}
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate('YouGave', {
                // UserId,
                item,
                totalAmount,
                Type: 'ReceiveMoney',
                // onDataEntered: dataEntries
              });
            }}
            containerStyle={{
              backgroundColor: Colors.greenDarkColor,
              borderRadius: ResponsivePixels._5,
              marginLeft: ResponsivePixels._5,
              flex: 1,
              paddingVertical: ResponsivePixels._10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={styles.buttonText}>{`You Got \u20B9`}</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
      {/* )} */}
    </>
  );
};
export default WrapperComponent(UserTransactionEntry);
const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  entriesStyle: {
    flex: 1,
    padding: ResponsivePixels._10,
  },
  entriesText: {
    fontSize: Fonts.size._12px,
    color: Colors.grayColor,
    textTransform: 'uppercase',
    width: '65%',
  },
  youGaveText: {
    fontSize: Fonts.size._12px,
    color: Colors.grayColor,
    textTransform: 'uppercase',
    width: '20%',
  },
  entriesBox: {
    height: ResponsivePixels._40,
    backgroundColor: Colors.white,
    marginVertical: ResponsivePixels._10,
    // padding: 10,
    flexDirection: 'row',
    // marginBottom: 70,
  },
  dateStyle: {
    width: '60%',
    flexDirection: 'row',
  },
  gaveAmountText: {
    color: 'red',
    // backgroundColor:'red',
    width: '20%',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  dotsIconStyle: {
    width: ResponsivePixels._25,
    height: ResponsivePixels._25,
    alignSelf: 'center',
    resizeMode: 'cover',
    tintColor: '#fff',
    // fontSize: Fonts.size._15px,
    marginHorizontal: ResponsivePixels._3,
  },
  gotAmountText: {
    color: Colors.greenDarkColor,
    // backgroundColor:'red',
    width: '20%',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  balText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    textTransform: 'capitalize',
    paddingHorizontal: ResponsivePixels._5,
    // color: 'green',
    color: Colors.greenDarkColor,
    // backgroundColor: 'green',
  },
  buttonText: {
    fontSize: Fonts.size._15px,
    color: Colors.white,
    textTransform: 'uppercase',
  },
  entriesTitle: {
    flexDirection: 'row',
  },
});
