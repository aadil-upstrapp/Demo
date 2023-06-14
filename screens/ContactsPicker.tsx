import React, {useEffect, useState, useRef} from 'react';
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
  StatusBar,
} from 'react-native';
import Contacts from 'react-native-contacts';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import { wp } from './constants';
import Colors from './constants/Colors';
import Fonts from './constants/Fonts';
import ResponsivePixels from './constants/ResponsivePixels';


const ContactsPicker: React.FC = ({ navigation }) => {
  const [contactSearch, setContactSearch] = useState('');
  const [contact, setContact] = useState([]);
  const [dataContact, setDataContact] = useState();
  const [lastText, setLastText] = useState('');
  const [inputShow, setInputShow] = useState(false);
  const [sortList, setSortList] = useState([]);
  const [selectIndex, setSelectIndex] = useState('');

  useEffect(() => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS)
      .then(contact => {
        // work with contacts
        if(contact=='granted'){
        Contacts?.getAll().then(contacts => {
          contacts.forEach(item => (item.color = generateColor()));
          sortData(contacts);
          setContact(contacts);
          setDataContact(contacts);
        
        });
      }
      })
      .catch(e => {
        console.log(e);
      });
   
  }, []);

  useEffect(() => {
    
    let grouping =  contact?.reduce((r, e) => {
     
    
      let title = e?.displayName?.charAt(0).toUpperCase();
      if (!r[title]) r[title] = {title, data: [e]};
      else r[title].data.push(e);
      return r;
    }, {});
    if (grouping) {
      grouping = Object.values(grouping);
      setSortList(grouping);
    }
  }, [contact]);

 
  useEffect(() => {
    console.log('line 2');
    search();
  }, [contactSearch]);

  const ref = useRef<SectionList>();

  const search = () => {
    console.log('line 3');
    // if (contactSearch) {
    if (contactSearch) {
      // console.log(contactSearch, lastText);

      const a = contactSearch?.toLowerCase()?.split(' ');
      const arr = contactSearch.startsWith(lastText) ? contact : dataContact;
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

  // setSortList(grouping);

  function sortData(myArguments) {
    console.log('Line 2',myArguments.length);
    if(myArguments.length>1){

    
    myArguments.sort(function (a, b) {
      /* console.log(
        'a.displayName < b.displayName',
        a.displayName.startsWith('A'),
        b.displayName,
      ); */
// {console.log('a',a?.displayName?.includes('99')&& a.displayName)}
// if(a.displayName=='null'){
//   return -1;
// }

      if (a?.displayName?.includes('9'||'0') < b?.displayName?.includes('9'||'0')) {
        return -1;
      }
      if (a?.displayName?.includes('9'||'0') > b?.displayName?.includes('9'||'0')) {
        return 1;
      }
      if (a?.displayName?.toLowerCase() < b?.displayName?.toLowerCase()) {
        return -1;
      }
      if (a?.displayName?.toLowerCase() > b?.displayName?.toLowerCase()) {
        return 1;
      }
      return 0;
    });
  }
  }
  const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0');
    return `#${randomColor}`;
  };
  

  return (
    <>
    <StatusBar
    backgroundColor={Colors.blue}
    barStyle='light-content'
    />
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          padding: ResponsivePixels._10,
          // height:ResponsivePixels._40,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: ResponsivePixels._10,
          paddingHorizontal: ResponsivePixels._30,
          backgroundColor: inputShow ? 'white' : '#1974D2',
        }}>
        <TouchableWithoutFeedback
          style={{height: ResponsivePixels._30, width: ResponsivePixels._30}}
          onPress={() => {
           (!inputShow)&&navigation.goBack()
            setInputShow(false);
            setContactSearch('');
          }}>
          <Image
            source={require('../assets/Images/ic_arrow_back.png')}
            style={{
              width: ResponsivePixels._30,
              height: ResponsivePixels._30,
              tintColor:Colors.white,
              marginHorizontal: ResponsivePixels._5,
            }}
          />
        </TouchableWithoutFeedback>
        {inputShow ? (
          <TextInput
            placeholder="Search contacts"
            value={contactSearch}
            // onKeyPress={search}
            autoFocus
            onChangeText={setContactSearch}
            style={styles.input}
          />
        ) : (
          <Text
            style={{
              width: '86%',
              // textAlign: 'center',
              paddingHorizontal: ResponsivePixels._20,
              // paddingTop: ResponsivePixels._10,
              textAlignVertical:'center',
              height: ResponsivePixels._50,
             fontFamily:Fonts.name.OpenSans_SemiBold,
              fontSize:Fonts.size._20px,
              color:Colors.white
            }}>
            Contacts
          </Text>
        )}
        {!inputShow && (
          <TouchableWithoutFeedback
            style={{paddingHorizontal: ResponsivePixels._10}}
            onPress={() => {
              setInputShow(true);
            }}>
            <Image
              source={require('../assets/Images/search.png')}
              style={{width: ResponsivePixels._20,tintColor:Colors.white, height: ResponsivePixels._20, resizeMode: 'cover'}}
            />
          </TouchableWithoutFeedback>
        )}
      </View>
      {/* <FlatList
        style={{paddingRight: 20, marginBottom: 40}}
        data={contact}
        renderItem={contact => (
          <>
          
            <TouchableWithoutFeedback
              style={{
                paddingHorizontal: 20,
                flexDirection: 'row',
                paddingVertical: 10,
              }}
              onPress={() => {}}>
              {contact.item.displayName[0] == '+' ? (
                <View
                  style={{
                    width: 40,
                    height: 40,
                    paddingVertical: 10,
                    borderRadius: 20,
                    backgroundColor: contact.item.color,
                  }}>
                  <Image
                    source={require('../assets/Images/ic_profile.png')}
                    style={{
                      width: 20,
                      height: 20,
                      alignSelf: 'center',
                    }}
                  />
                </View>
              ) : (
                <Text
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: contact.item.color,
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    color: 'white',
                    fontSize: 15,
                  }}>
                  {contact.item.displayName[0]}
                </Text>
              )}
              <View
                style={{
                  flexDirection: 'column',
                  paddingHorizontal: 10,
                  display: 'flex',
                  justifyContent: 'center',
                }}>
                {!contact.item.displayName.includes(91||'00') && (
                  <Text>{contact.item.displayName}</Text>
                )}
                <Text>{contact.item?.phoneNumbers[0]?.number}</Text>
              </View>

              <Text>{contact.item?.phoneNumber}</Text>
            </TouchableWithoutFeedback>
          </>
        )}
      /> */}
      {/* {console.log('Line 5', sortList)} */}
     {/*  <FlatList
          data={sortList}
          style={{paddingBottom:40}}
          renderItem={sortList => (
            <>
              <TouchableWithoutFeedback
                onPress={() => {
                  {console.log(sortList.index);
                  }
                  // sortList.index;
                }}>
                <Text> {sortList.item.title}</Text>
              </TouchableWithoutFeedback>
            </>
          )}
        /> */}

      <SectionList
        ref={ref}
        style={{
          paddingRight: ResponsivePixels._20,
          position: 'relative',
        }}
        sections={sortList}
        // maxToRenderPerBatch={15}
        // updateCellsBatchingPeriod={50}
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
              onPress={()=>{navigation.navigate('ContactsDetails',item)}
              }
              >
              {item?.displayName?.includes('91') ? (
                <View
                  style={{
                    width: ResponsivePixels._40,
                    height: ResponsivePixels._40,
                    paddingVertical: ResponsivePixels._10,
                    borderRadius: ResponsivePixels._20,
                    backgroundColor: item.color,
                  }}>
                  <Image
                    source={require('../assets/Images/ic_profile.png')}
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
                    color: Colors.white,
                    fontSize:Fonts.size._15px,
                  }}>
                 
                  {item?.displayName[0]}
                </Text>
              )}
              <View
                style={{
                  flexDirection: 'column',
                  paddingHorizontal: ResponsivePixels._10,
                  display: 'flex',
                  justifyContent: 'center',
                }}>
                {!item?.displayName?.includes(91) && (
                  <Text style={styles.nameStyle}>{item?.displayName}</Text>
                )}
                <Text style={styles.nameStyle}>{item?.phoneNumbers[0]?.number}</Text>
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
                }}>
                {title?.includes('+') ? '#' : title}
              </Text>
            )}
          </View>
        )}
      />

      {!inputShow && (
        <FlatList
          data={sortList}
          style={styles.selectItem}
          renderItem={sortList => (
            <>
              <TouchableWithoutFeedback
                onPress={() => {
                  ref?.current?.scrollToLocation({
                    sectionIndex: sortList.index,
                    itemIndex: 0,
                    animated: true,
                  });
                  setSelectIndex(sortList?.index);
                }}>
               
                <Text
                  style={[
                    {
                      fontSize:Fonts.size._10px,
                      textAlign: 'center',
                    },
                    selectIndex == sortList.index && styles.listColor,
                  ]}>
                  {sortList?.item.title?.includes('+')
                    ? '#'
                    : sortList?.item?.title}
                </Text>
              </TouchableWithoutFeedback>
            </>
          )}
        />
      )}
    </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor:Colors.bgLightBlue
  },
  item: {
    margin: ResponsivePixels._24,
    fontSize:Fonts.size._18px,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  nameStyle:{fontFamily:Fonts.name.OpenSans_Regular,fontSize:Fonts.size._17px},
  input: {
    backgroundColor: Colors.white,
    marginHorizontal: ResponsivePixels._5,
    paddingHorizontal: ResponsivePixels._20,
    height: ResponsivePixels._50,
    width: wp('92%'),
  },
  selectItem: {
    width: ResponsivePixels._20,
    position: 'absolute',
    right: ResponsivePixels._15,
    backgroundColor:Colors.white,
    borderRadius: ResponsivePixels._10,
    paddingVertical: ResponsivePixels._5,
    paddingHorizontal: ResponsivePixels._5,
  },
  listColor: {
    color: Colors.blue
  },
});

export default ContactsPicker;
