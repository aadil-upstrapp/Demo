import React, {useEffect, useState, useRef} from 'react';
import _ from 'lodash';
import {
  PermissionsAndroid,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  TextInput,
  SectionList,
  BackHandler,
} from 'react-native';
import Contacts from 'react-native-contacts';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {SqliteUtils} from './Sqlite/SqliteUtils';
import {
  COLUMN_CURRENT_BALANCE,
  COLUMN_PHONE_NUMBER,
  COLUMN_SENDER_ID,
  COLUMN_USER_NAME,
  TABLE_CUSTOMER,
} from './Sqlite/SqliteConstants';
import { BaseProps } from './Model/BaseProps';
import WrapperComponent from './Navigation/WrapperComponent';
import ResponsivePixels from '../constants/ResponsivePixels';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import { fireEvent } from '../constants/EventBus';
// import {Contact} from '.';

const Contact: React.FC<BaseProps> = ({navigation,route, session}) => {
  const [contactSearch, setContactSearch] = useState('');
  const [contact, setContact] = useState();
  const [dataContact, setDataContact] = useState();
  const [lastText, setLastText] = useState('');
  const [inputShow, setInputShow] = useState(false);
  const [insert, setInsert] = useState(false);
  const [sortList, setSortList] = useState([]);
  const [selectIndex, setSelectIndex] = useState('');
  const [customerDatas, setCustomerData] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState('');

  // console.log('route',route.params);
  
  const UserId = session.user_id;
  const CurrentBal = 0;
  useEffect(() => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS)
      .then(contacts => {
        // work with contacts
        // console.log('contacts', );
        if(contacts=='granted'){

          Contacts?.getAll().then(contacts => {
            contacts.forEach(item => (item.color = generateColor()));
            sortData(contacts);
            setContact(contacts);
            setDataContact(contacts);
            displayUser();
            //   console.log('line 4');
          });
        }
      })
      .catch(e => {
        console.log(e);
      });
      BackHandler.addEventListener('hardwareBackPress', backAction);
      return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);
  
  const backAction = () => {    
    // route.params.changeCustomerData()
    fireEvent('ViewData')
      navigation.goBack();
      return true;
   
  };

  useEffect(() => {
    // console.log('contact',contact);

    let grouping = contact?.reduce((r, e) => {
      // get first letter of name of current element
      // let title = e?.displayName[0];
      let title = e?.displayName?.charAt(0).toUpperCase();
      // if there is no property in accumulator with this letter create it
      if (!r[title]) r[title] = {title, data: [e]};
      // if there is push current element to data array for that letter
      else r[title].data.push(e);
      // return accumulator
      return r;
    }, {});
    if (grouping) {
      grouping = Object.values(grouping);
      //   console.log('grouping', JSON.stringify(grouping));
      setSortList(grouping);
    }
  }, [contact]);

  useEffect(() => {
    // console.log('line 2');
    search();
  }, [contactSearch]);

  const ref = useRef<SectionList>();

  const search = () => {
    // console.log('sortList1',sortList)
    // console.log('line 3');
    // if (contactSearch) {
    if (contactSearch) {
      //   console.log(contactSearch, lastText);

      const a = contactSearch?.toLowerCase()?.split(' ');
      const arr = contactSearch?.startsWith(lastText) ? contact : dataContact;
      setContact(
        arr.filter(item =>
          a.every(v =>
            item.displayName
              ?.toLowerCase()
              .split(' ')
              .some(i => i.startsWith(v)),
          ),
        ),
      );
    } else {
      setContact(dataContact);
    }
    setLastText(contactSearch);
  };
/*   const datas = {
    senderId: route.params.UserId,
  }; */
  const displayUser = async () => {
    let dispalyCustomer = await SqliteUtils.select({
      tableName: TABLE_CUSTOMER,
      // columnNames: [`${COLUMN_PHONE_NUMBER},${COLUMN_USER_NAME}`],
    });
    if (dispalyCustomer[0].rows.length > 0) {
      let temp = [];
      for (let i = 0; i < dispalyCustomer[0].rows.length; i++) {
        temp.push(dispalyCustomer[0].rows.item(i));
      }
      setCustomerData(temp);
      // temp.forEach((items)=>{items[COLUMN_PHONE_NUMBER]==
      // })
      console.log(temp);
    }
  };

  const insertCustomer = async () => {
    console.log('insert');
    
    if (!_.isEmpty(contactSearch) && _.isEmpty(phoneNumber)) {
      let insert = await SqliteUtils.insert({
        tableName: TABLE_CUSTOMER,
        columnNames: [
          COLUMN_USER_NAME,
          COLUMN_CURRENT_BALANCE,
          COLUMN_SENDER_ID,
        ],
        values: [contactSearch, CurrentBal, UserId],
      });
      // console.log(insert);
      if (insert[0].rowsAffected > 0) {
        /* let items = [];
        for (let i = 0; i < insert[0].rows.length; i++) {
          items.push(insert[0].rows.item(i));
          console.log(items);
          
        } */
        // console.log('items',items);
        const item = {
          user_name: contactSearch,
        };
        // navigation.navigate('UserTransactionEntry',{UserId,item});
        navigation.navigate('ViewData', {UserId});
        // route.params.changeCustomerData()
        fireEvent('ViewData')
      }
      // else if (phoneNumber != '') {
      /*   customerData.forEach((item)=>{
        item[COLUMN_USER_NAME]==contactSearch &&item[COLUMN_PHONE_NUMBER]==phoneNumber && navigation.navigate('UserTransactionEntry',{UserId, item})
        // && item[]
          
        }) */
      /*  let insertWithPhone = await SqliteUtils.insert({
          tableName: TABLE_CUSTOMER,
          columnNames: [
            COLUMN_USER_NAME,
            COLUMN_CURRENT_BALANCE,
            COLUMN_SENDER_ID,
            phoneNumber,
          ],
          values: [contactSearch, CurrentBal, UserId, phoneNumber],
        }); */
      // console.log(insertWithPhone);

      /*  if (insert[0].rowsAffected > 0) {
          navigation.navigate('ViewData');
        } */
      // }
    } else if (!_.isEmpty(contactSearch) && !_.isEmpty(phoneNumber)) {
      customerDatas.forEach(items => {
        if (
          items[COLUMN_USER_NAME] == contactSearch &&
          items[COLUMN_PHONE_NUMBER] == phoneNumber
        ) {
          setInsert(true);
        }
      });
      // console.log('number');
      if (insert) {
        console.log('insert data');

        /* let insertPhoneNumber = await SqliteUtils.insert({
        tableName: TABLE_CUSTOMER,
        columnNames: [
          COLUMN_USER_NAME,
          COLUMN_CURRENT_BALANCE,
          COLUMN_SENDER_ID,
          COLUMN_PHONE_NUMBER
        ],
        values: [contactSearch, CurrentBal, UserId,phoneNumber],
      });
   
      console.log(insertPhoneNumber);
      if (insertPhoneNumber[0].rowsAffected > 0) { */
        /* let items = [];
        for (let i = 0; i < insert[0].rows.length; i++) {
          items.push(insert[0].rows.item(i));
          console.log(items);
          
        } */
        // console.log('items',items);
        // navigation.navigate('UserTransactionEntry',{UserId,item});
        /*  navigation.navigate('ViewData',{UserId});
      } */
      }
    }
    // })
    // }
    else {
      // alert('please enter customer name');
    }
    /*  customerData.forEach((item)=>{
  
      if((item[COLUMN_PHONE_NUMBER]!=phoneNumber) &&(item[COLUMN_USER_NAME]!=contactSearch))
      {
        let insert=  SqliteUtils.insert({tableName:TABLE_CUSTOMER,columnNames:[COLUMN_USER_NAME,COLUMN_CURRENT_BALANCE,COLUMN_SENDER_ID],values:[contactSearch,CurrentBal,UserId]})
        console.log(insert);
  console.log((item[COLUMN_PHONE_NUMBER]!=phoneNumber) &&(item[COLUMN_USER_NAME]!=contactSearch));
  
      }
      else{
        console.log((item[COLUMN_PHONE_NUMBER]!=phoneNumber) &&(item[COLUMN_USER_NAME]!=contactSearch));
     
      }
    }) */
  };
  // useEffect(() => {
  // displayUser();

  // Sqlite.selectCustomer(data, getData);
  // Sqlite.deleteData()
  // Sqlite.addField()
  // }, []);

  // console.log(phoneNumber);

  // setSortList(grouping);

  function sortData(myArguments) {
    // console.log('Line 2');
    myArguments?.sort(function (a, b) {
      if (
        a?.displayName?.includes('9' || '0') <
        b?.displayName?.includes('9' || '0')
      ) {
        return -1;
      }
      if (
        a?.displayName?.includes('9' || '0') >
        b?.displayName?.includes('9' || '0')
      ) {
        return 1;
      }
      if (a?.displayName < b?.displayName) {
        return -1;
      }
      if (a?.displayName > b?.displayName) {
        return 1;
      }
      return 0;
    });
  }
  const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0');
    return `#${randomColor}`;
  };
  const customerData=async ()=>{
    // const num=await 0;
    // console.log(num);
    
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableWithoutFeedback
          style={styles.backStyle}
          onPress={() => {
            // setInputShow(false);
            setContactSearch('');
            // route.params.changeCustomerData()
            fireEvent('ViewData')
            navigation.goBack();
          }}>
          <Image
            source={require('../../assets/Images/ic_arrow_back.png')}
            style={styles.backIconStyle}
          />
        </TouchableWithoutFeedback>
        

        <TouchableWithoutFeedback
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            // marginHorizontal: 10,
          }}>
          <TextInput
            placeholder="Customer name"
            value={contactSearch}
            // onKeyPress={search}
            // autoFocus
            onChangeText={setContactSearch}
            style={styles.input}
          />
          <Image
            source={require('../../assets/Images/search.png')}
            style={styles.searchIconStyle}
          />
        </TouchableWithoutFeedback>
        {inputShow && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              marginVertical:ResponsivePixels._10,
              // marginHorizontal: 10,
            }}>
            <TextInput
              placeholder="Mobile number (optional)"
              value={phoneNumber}
              keyboardType="numeric"
              // onKeyPress={search}
              // autoFocus
              onChangeText={setPhoneNumber}
              style={styles.input}
            />
          </View>
        )}
        {inputShow && (
          <TouchableWithoutFeedback
            containerStyle={
              contactSearch != '' ? styles.button : styles.disbleButton
            }
            onPress={() => {
              contactSearch != '' && insertCustomer();
            }}>
            <Text style={{color: Colors.white, textTransform: 'uppercase'}}>
              continue
            </Text>
          </TouchableWithoutFeedback>
        )}
        {!inputShow && (
          <TouchableWithoutFeedback
            onPress={() => {
              setInputShow(true);
            }}
            style={{
              // paddingHorizontal: 20,
              flexDirection: 'row',
              paddingVertical: 10,
              // justifyContent:'space-around',
              alignItems: 'center',
            }}>
            <Text
              style={{
                width: ResponsivePixels._40,
                height: ResponsivePixels._40,
                borderRadius: ResponsivePixels._20,
                // backgroundColor: Colors.white,
                borderColor: Colors.blue,
                borderStyle: 'dashed',
                borderWidth: 1,
                textAlign: 'center',
                textAlignVertical: 'center',
                color: Colors.blue,
                fontSize:Fonts.size._30px,
              }}>
              +
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                flex: 1,
                // paddingHorizontal: 10,
                // display: 'flex',
                // justifyContent: 'space-between',
                // alignItems:'flex-start'
                // backgroundColor:'red'
              }}>
              <Text
                style={{
                  color: Colors.blue,
                  fontSize: Fonts.size._15px,
                  textTransform: 'capitalize',
                  paddingHorizontal: ResponsivePixels._10,
                  textAlign: 'center',
                  textAlignVertical: 'center',
                }}>
                {`Add ${contactSearch} customer`}
              </Text>
              <Image
                source={require('../../assets/Images/ic_right_arrow.png')}
                style={{
                  width: ResponsivePixels._20,
                  height: ResponsivePixels._20,
                  alignSelf: 'center',
                  // position:'absolute',
                  // right:-220
                }}
              />
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>
      <SectionList
        // style={{ backgroundColor: 'red'}}
        ref={ref}
        style={{
          paddingRight: ResponsivePixels._20,
          position: 'relative',
        }}
        showsVerticalScrollIndicator={false}
        sections={sortList}
        keyExtractor={(item, index) => item + index}
        stickySectionHeadersEnabled
        renderItem={({item}) => (
          <>
            <TouchableWithoutFeedback
              style={{
                paddingHorizontal: ResponsivePixels._20,
                flexDirection: 'row',
                paddingVertical: ResponsivePixels._10,
              }}
              onPress={() => {
                let display = 'false';
                let selectCustomer = '';
                let Customer = '';
                customerDatas.forEach(items => {
                  if (
                    items[COLUMN_USER_NAME] == item.displayName &&
                    items[COLUMN_PHONE_NUMBER] == item.phoneNumbers[0].number
                  ) {
                    display = 'true';
                    selectCustomer = items;
                    Customer = item;
                    // console.log('selectCustomer',selectCustomer);
                    // console.log('Customer',Customer);
                  }
                  // selectCustomer = items;
                  // console.log('selectCustomer',selectCustomer);
                  
                  
                });
                console.log('display',display=='true');
                if (display=='true') {
                  let item='';
                  item = selectCustomer;
                  console.log(selectCustomer,'item',item,Customer);
                  // route.params.changeCustomerData()
                  fireEvent('ViewData')
                  navigation.navigate('ViewData');
                  // route.params.changeCustomerData()
                  // navigation.navigate('UserTransactionEntry', {UserId, item});
                } else  {
                  console.log('displayed',item);
                  // let items='';
                  // items = Customer;
                  // console.log(selectCustomer,Customer,'items',items);
                  route.params.changeCustomerData()
                  // route.params.changeCustomerData()
                  
                  navigation.navigate('DisplayNumber', {UserId, item,changeCustomerData:customerData});
                  // route.params.changeCustomerData()
                } // console.log(' items[COLUMN_USER_NAME]==item.displayName &&items[COLUMN_PHONE_NUMBER]==item.phoneNumbers[0].number && navigation.navigate(UserTransactionEntry,{UserId, items})', items[COLUMN_USER_NAME]==item.displayName &&items[COLUMN_PHONE_NUMBER]==item.phoneNumbers[0].number);

                // navigation.navigate('UserTransactionEntry', {UserId, item});
              }}>
              {/* {console.log('setSelectIndex',item.displayName=='+91 95580 29197' )} */}

              {item.displayName.includes('91') ? (
                <View
                  style={{
                    width: ResponsivePixels._40,
                    height: ResponsivePixels._40,
                    paddingVertical: ResponsivePixels._10,
                    borderRadius: ResponsivePixels._20,
                    backgroundColor: item.color,
                  }}>
                  <Image
                    source={require('../../assets/Images/ic_profile.png')}
                    style={{
                      width: ResponsivePixels._20,
                      height: ResponsivePixels._20,
                      alignSelf: 'center',
                    }}
                  />
                </View>
              ) : (
                <Text
                  style={{
                    width: ResponsivePixels._40,
                    height: ResponsivePixels._40,
                    borderRadius: ResponsivePixels._20,
                    backgroundColor: item.color,
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    color: 'white',
                    fontSize: 15,
                  }}>
                  {item.displayName[0]}
                </Text>
              )}

              {/* {console.log() } */}
              <View
                style={{
                  flexDirection: 'column',
                  paddingHorizontal: ResponsivePixels._10,
                  display: 'flex',
                  justifyContent: 'center',
                  // backgroundColor:'red'
                }}>
                {!item.displayName.includes(91) ? (
                  <Text>{item.displayName}</Text>
                ) : (
                  <Text>{item.phoneNumbers[0].number}</Text>
                )}
                {/*  {item.displayName=='+91 95580 29197'?<Text>
                  customer
                 </Text>:null} */}
                {/*  {customerData.length > 0
                  ? customerData.forEach(items => {
                      items[COLUMN_PHONE_NUMBER] == item.phoneNumbers[0].number?
                      <Text>Custoner</Text>
:null                   
                    })
                  : //  <Text>{item.phoneNumbers[0].number==}</Text>
                    null} */}
              </View>
            </TouchableWithoutFeedback>
          </>
        )}
        renderSectionHeader={({section: {title}}) => (
          <View>
            {!inputShow && (
              <Text
                style={{
                  paddingHorizontal: ResponsivePixels._20,
                  height: ResponsivePixels._20,
                  backgroundColor: '#ecf0f1',
                  // backgroundColor:'white'
                }}>
                {title.includes('+') ? '#' : title}
              </Text>
            )}
          </View>
        )}
      />

      {!inputShow && contactSearch == '' && (
        <FlatList
          data={sortList}
          style={styles.selectItem}
          // style={{ position: 'absolute',right: 5,top: 100,borderRadius:10,backgroundColor:'#DEE4E7',paddingVertical:10, paddingHorizontal:5}}
          renderItem={sortList => (
            <>
              <TouchableWithoutFeedback
                onPress={() => {
                  ref?.current?.scrollToLocation({
                    sectionIndex: sortList.index,
                    itemIndex: 0,
                    animated: true,
                  });
                  setSelectIndex(sortList.index);
                }}>
                <Text
                  style={[
                    {
                      fontSize: 10,
                      textAlign: 'center',
                    },
                    selectIndex == sortList.index && styles.listColor,
                  ]}>
                  {sortList?.item?.title?.includes('9')
                    ? '#'
                    : sortList.item.title}
                </Text>
              </TouchableWithoutFeedback>
            </>
          )}
        />
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    //   paddingTop: StatusBar.currentHeight,
    backgroundColor: '#ecf0f1',
    // padding: 10,
  },
  backStyle: {
    height: ResponsivePixels._35,
    width: ResponsivePixels._35,
    // marginTop: 10,
    // padding: 10,
    marginBottom: ResponsivePixels._20,
    // paddingHorizontal: 20,
    paddingVertical: ResponsivePixels._5,
  },
  header: {
    // height: 30,
    // width: 20,
    marginTop: ResponsivePixels._5,
    // padding: 10,
    marginBottom: ResponsivePixels._10,
    paddingHorizontal: ResponsivePixels._20,
    paddingVertical: ResponsivePixels._5,
  },
  button: {
    alignItems: 'center',
    backgroundColor: Colors.blue,
    padding: ResponsivePixels._10,
    marginTop: ResponsivePixels._10,
    // marginLeft: 100,
    // marginRight: 100,
    width: '100%',
    alignSelf: 'center',
    height: ResponsivePixels._40,
    borderRadius: ResponsivePixels._5,
    // marginHorizontal:160,
  },
  disbleButton: {
    alignItems: 'center',
    backgroundColor: '#BAD5F3',
    padding: ResponsivePixels._10,
    marginTop: ResponsivePixels._10,
    // marginLeft: 100,
    // marginRight: 100,
    width: '100%',
    alignSelf: 'center',
    height: ResponsivePixels._40,
    borderRadius: ResponsivePixels._5,
  },
  backIconStyle: {
    width: ResponsivePixels._35,
    height: ResponsivePixels._35,
    tintColor: Colors.blue,
    marginRight: ResponsivePixels._5,
  },
  contactsTextStyle: {
    width: '85%',
    // textAlign: 'center',
    paddingHorizontal: ResponsivePixels._20,
    paddingTop: ResponsivePixels._7,
    height: ResponsivePixels._40,
    fontWeight: 'bold',
    fontSize: Fonts.size._18px,
  },
  searchIconStyle: {
    width: ResponsivePixels._10,
    height: ResponsivePixels._10,
    resizeMode: 'cover',
    position: 'absolute',
    right: ResponsivePixels._30,
  },
  item: {
    margin: ResponsivePixels._24,
    fontSize:Fonts.size._18px,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'white',
    // marginHorizontal: 5,
    padding: ResponsivePixels._10,
    height: ResponsivePixels._45,
    borderRadius: ResponsivePixels._10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectItem: {
    width: ResponsivePixels._20,
    position: 'absolute',
    right: ResponsivePixels._5,
    top: ResponsivePixels._250,
    backgroundColor: '#DEE4E7',
    borderRadius: ResponsivePixels._10,
    paddingVertical: ResponsivePixels._5,
    paddingHorizontal: ResponsivePixels._5,
  },
  listColor: {
    color: 'blue',
  },
});

export default WrapperComponent(Contact);
