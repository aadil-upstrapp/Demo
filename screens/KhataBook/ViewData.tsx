import React, { useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  FlatList,
  Image,
  StatusBar,
  BackHandler,

} from 'react-native';
import {
  COLUMN_USER_NAME,
  COLUMN_SENDER_ID,
  TABLE_CUSTOMER,
  COLUMN_CURRENT_BALANCE,
  COLUMN_CUSTOMER_ID,
  TABLE_TRANSACTION,
  COLUMN_RECEIVE_ID,
  COLUMN_TRANSACTION_ID
} from './Sqlite/SqliteConstants';
import {SqliteUtils} from './Sqlite/SqliteUtils';
import WrapperComponent from './Navigation/WrapperComponent';
import { BaseProps } from './Model/BaseProps';
import ResponsivePixels from '../constants/ResponsivePixels';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
// import  {onNotif}  from './firebase/firebase';
import { registerEvent, removeEvent } from '../constants/EventBus';

const ViewData: React.FC<BaseProps> = ({ navigation,session}) => {
  const [giveAmount, setGiveAmount] = useState(0);
  const [recevieAmount, setRecevieAmount] = useState(0);
  const [data, setData] = useState([]);
  // const [id, setId] = useState('');

// console.log(id);

  const UserId =session.user_id;
  const customerData = async () => {
    let getAmountSum = 0;
    let giveAmountSum = 0;
    const history = await SqliteUtils.select({
      tableName: TABLE_CUSTOMER,
      where: `${COLUMN_SENDER_ID}=?And ${COLUMN_CUSTOMER_ID}!=?`,
      whereArgs: [UserId,UserId],
      orderByDesc:true,
      orderBy:[COLUMN_CUSTOMER_ID]
    });
    let temp = [];
    for (let i = 0; i < history[0].rows.length; i++) {
      temp.push(history[0].rows.item(i));
    }
    // console.log(temp);
    
    temp.map(item => {
      item[COLUMN_CURRENT_BALANCE]?.toString().startsWith('-')
        ? (giveAmountSum += item[COLUMN_CURRENT_BALANCE])
        : (getAmountSum += item[COLUMN_CURRENT_BALANCE]);
    });
    setGiveAmount(giveAmountSum);
    setRecevieAmount(getAmountSum);
    setData(temp);
    // console.log('temp',temp);
    
    
  }
  const deleteData=async (Id:any)=>{
    const Delete = await SqliteUtils.delete({tableName:TABLE_CUSTOMER,where:`${COLUMN_CUSTOMER_ID}=?`,whereArgs:[Id]})
    console.log('delete',Delete[0].rowsAffected);
    if(Delete[0].rowsAffected)
    {

      const select=await SqliteUtils.select({tableName:TABLE_TRANSACTION,columnNames:[COLUMN_TRANSACTION_ID],where:`${COLUMN_RECEIVE_ID}=? Or ${COLUMN_SENDER_ID}=?`,whereArgs:[Id,Id]})
      let temp=[];
      for(let i=0;i<select[0].rows.length;i++){
        temp.push(select[0].rows.item(i))
      }
      for(let i=0;i<temp.length;i++){
        let id=temp[i] 
        const deleteEntery=await SqliteUtils.delete({tableName:TABLE_TRANSACTION,where:`${COLUMN_TRANSACTION_ID}=?`,whereArgs:[id[COLUMN_TRANSACTION_ID]]})
        console.log(deleteEntery[0].rows);
        
      }

      customerData()
    }
   

    // console.log(select,temp);
    
    
    
  }
  
// console.log('route');

  useEffect(()=>{
    customerData()
    registerEvent('ViewData',customerData)
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () =>{

      BackHandler.removeEventListener('hardwareBackPress', backAction);
      removeEvent('ViewData');
    }
  },[])

  const backAction=()=>{
    navigation.navigate('Home');
    return true
  }


 /*  useEffect(() => {
  customerData();
  }, [route]); */

  return (
    <>
    <StatusBar
    backgroundColor={Colors.blue}
    barStyle='light-content'
    />
       <View style={styles.header}>
        <View style={styles.row}>
          <View style={{alignItems: 'center', flexDirection: 'row'}}>
            <Image
              source={require('../../assets/Images/Book_Icon.png')}
              style={{width: ResponsivePixels._20, height: ResponsivePixels._20, tintColor: Colors.white}}
            />
            <Text style={{color:Colors.white,paddingHorizontal:ResponsivePixels._5}}>My Business</Text>
            <Image
              source={require('../../assets/Images/ic_down_arrow.png')}
              style={{width: ResponsivePixels._15, height: ResponsivePixels._15, tintColor:Colors.white}}
            />
          </View>
          <View style={{alignItems: 'center', flexDirection: 'row'}}>
            <Text
              style={{
                borderWidth: 1,
                color: Colors.white,
                borderRadius: ResponsivePixels._10,
                height:ResponsivePixels._20,
                width: ResponsivePixels._20,
                borderColor: Colors.white,
                textAlign: 'center',
                marginRight: ResponsivePixels._10,
              }}>
              {'\u20B9'}
            </Text>
            <TouchableWithoutFeedback onPress={()=>{navigation.navigate('Contact')}}>
            <Image
              source={require('../../assets/Images/ContactBook.png')}
              style={{width: ResponsivePixels._20, height: ResponsivePixels._20, tintColor: Colors.white}}
              />
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
      <View style={styles.main}>
        <View style={styles.box}>
          <View style={styles.boxRow}>
            <View style={styles.boxLeft}>
              <Text style={{fontSize: Fonts.size._17px, color: Colors.greenDarkColor}}>
                {`\u20B9 ${Math.abs(giveAmount)}`}
              </Text>
              <Text style={styles.giveText}>You will give</Text>
            </View>
            <View style={styles.boxRight}>
              <Text style={{fontSize: Fonts.size._17px, color: 'red'}}>
                {`\u20B9 ${Math.abs(recevieAmount)}`}
             
              </Text>
              <Text style={styles.giveText}>You will get </Text>
            </View>
          </View>
         <TouchableWithoutFeedback onPress={()=>{navigation.navigate('ViewReport')}}>
            <Text style={styles.viewReportText}>
              View Report
              <Image
                source={require('../../assets/Images/ic_right_arrow.png')}
                style={{width: ResponsivePixels._15, height: ResponsivePixels._15, tintColor: 'mediumblue'}}
              />
            </Text>
          </TouchableWithoutFeedback>
        </View>
        {data.length > 0 ? (
          <FlatList
            data={data}
            style={{marginBottom: 50}}
            renderItem={({item}) => (
              <>
                <TouchableWithoutFeedback
                  onPress={() => {
                    // onNotif({title:'hello',message:'hello aadil'})  
                    // onNotif({id:item[COLUMN_CUSTOMER_ID]})
                    // setId(item[COLUMN_CUSTOMER_ID])
                    // deleteData(item[COLUMN_CUSTOMER_ID])
                    // console.log(item[COLUMN_CUSTOMER_ID]);
                    
                   navigation.navigate('UserTransactionEntry',{item});
                  }}>
                  <View style={styles.flatList}>
                    <View
                      style={{
                        flexDirection: 'row',
                        paddingVertical: ResponsivePixels._10,
                      }}>
                      {item[COLUMN_USER_NAME]?.startsWith('+') ||
                      item[COLUMN_USER_NAME]?.startsWith('9') ? (
                        <Text style={styles.numberStyle}>
                          +{item[COLUMN_USER_NAME][10]}
                        </Text>
                      ) : (
                        <Text style={styles.nameStyle}>
                          {item[COLUMN_USER_NAME][0]}
                        </Text>
                      )}
                      <View
                        style={{
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            paddingHorizontal: ResponsivePixels._10,
                            color: 'black',
                          }}>
                          {item[COLUMN_USER_NAME]}
                        </Text>
                      </View>
                    </View>
                    <View>
                      <Text
                        style={[
                          {color: 'red'},
                          item[COLUMN_CURRENT_BALANCE]?.toString().startsWith(
                            '-',
                          ) &&
                            styles.amountText,
                          (item[COLUMN_CURRENT_BALANCE] == 0 ||
                            item[COLUMN_CURRENT_BALANCE] == null) &&
                            styles.ZeroStyle,
                        ]}>
                        {`\u20B9 ${Math.abs(item[COLUMN_CURRENT_BALANCE])}`}
                      </Text>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </>
            )}
          />
        ) : null}
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate('Contact',{changeCustomerData:customerData});
          }}>
          <View style={styles.button}>
            <Text style={{color:Colors.white}}>Add Customer</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
};
export default WrapperComponent(ViewData);
const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  header: {
    backgroundColor: Colors.blue,
    height: ResponsivePixels._100,
    padding: ResponsivePixels._10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical:ResponsivePixels._10
  },
  box: {
    marginHorizontal: ResponsivePixels._10,
    paddingVertical: ResponsivePixels._5,
    backgroundColor: Colors.white,
    position: 'relative',
    bottom: ResponsivePixels._30,
    borderRadius: ResponsivePixels._5,
  },
  amountText: {
    color: Colors.greenDarkColor,
  },
  ZeroStyle: {
    color:  Colors.black,
  },
  boxRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: Colors.white,
    borderBottomWidth: 0.4,
    borderBottomColor: '#DEE4E7',
    borderColor:  Colors.grey,
    // paddingBottom: 10,
  },
  giveText: {fontSize: Fonts.size._15px, color:  Colors.grey},
  viewReportText: {
    textAlign: 'center',
    textTransform: 'uppercase',
    color: 'mediumblue',
    paddingVertical: ResponsivePixels._7,
    fontSize: Fonts.size._12px,
  },
  boxLeft: {
    flex: 1,
    alignItems: 'center',
    borderRightWidth: 0.2,
    borderRightColor: '#DEE4E7',
    marginVertical: ResponsivePixels._5,
    marginRight: 1,
  },
  boxRight: {
    flex: 1,
    alignItems: 'center',
    borderLeftWidth: 0.1,
    // borderLeftColor: '#F7FFD1',
    marginVertical: ResponsivePixels._5,
  },
  item: {
    margin: ResponsivePixels._24,
    fontSize: Fonts.size._18px,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    backgroundColor: Colors.white,
    marginHorizontal: ResponsivePixels._5,
    paddingHorizontal: ResponsivePixels._20,
    height: ResponsivePixels._40,
    width: '92%',
  },
  selectItem: {
    width: ResponsivePixels._20,
    position: 'absolute',
    right: ResponsivePixels._5,
    top: ResponsivePixels._100,
    backgroundColor: '#DEE4E7',
    borderRadius: ResponsivePixels._10,
    paddingVertical: ResponsivePixels._5,
    paddingHorizontal: ResponsivePixels._5,
  },
  listColor: {
    color: 'blue',
  },
  button: {
    position: 'absolute',
    bottom: ResponsivePixels._10,
    right: ResponsivePixels._10,
    borderRadius: ResponsivePixels._30,
    backgroundColor: '#C70039',
    width: ResponsivePixels._150,
    alignItems: 'center',
    padding: ResponsivePixels._10,
  },
  numberStyle: {
    width: ResponsivePixels._40,
    height: ResponsivePixels._40,
    borderRadius: ResponsivePixels._20,
    backgroundColor: '#ffd',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: Colors.blue,
    fontSize: Fonts.size._15px,
  },
  nameStyle: {
    width: ResponsivePixels._40,
    height: ResponsivePixels._40,
    borderRadius: ResponsivePixels._20,
    backgroundColor: '#1975',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: Colors.blue,
    fontSize: Fonts.size._15px,
  },
  flatList: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: ResponsivePixels._15,
    backgroundColor: Colors.white,
    justifyContent: 'space-between',
  },
});
