import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  TouchableWithoutFeedback,
  StatusBar,
} from 'react-native';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import ResponsivePixels from '../constants/ResponsivePixels';
import {CreateTableModel} from './model/CreateTableModel';
import Sqlite from './Sqlite';

import moment from 'moment';
import { wp } from '../constants';
// import {openDatabase} from 'react-native-sqlite-storage';
// const db = openDatabase({name: 'UserDatabase.db'});

const ViewAllNotes: React.FC = ({navigation}) => {
  const [id, setId] = useState();
  const [show, setShow] = useState(false);
  const [data, getData] = useState();

  const displayAllNotes=()=>{
    Sqlite.displayAllNotes(getData);
  }
  console.log('data',data);
  
 
  useEffect(() => {
    displayAllNotes();

  }, []);

  const deleteNotes = () => {
    Sqlite.deleteNotes(id);
    displayAllNotes();
    setShow(false);
  };
  

  return (
    <>
    <StatusBar
    backgroundColor={Colors.backgroundColor}
    barStyle='dark-content'
    />
      <TouchableOpacity
        activeOpacity={1}
        style={{
          flex: 1,
          backgroundColor:  Colors.backgroundColor,
          position: 'relative',
          paddingVertical: ResponsivePixels._20,
          // paddingHorizontal:10
        }}
        onPress={() => {
          setShow(false);
        }}>
       
        <View
        style={{position: 'absolute', top: ResponsivePixels._20, left: ResponsivePixels._10}}>
        <TouchableWithoutFeedback
          // style={{}}
          onPress={() => {
            navigation.goBack()
          }}>
          <Image
            source={require('../../assets/Images/ic_arrow_back.png')}
            style={{width: ResponsivePixels._35, height: ResponsivePixels._35}}
          />
        </TouchableWithoutFeedback>
      </View>
      
          <Text
            style={{
              alignSelf:'center',
              textAlign: 'center',
              textAlignVertical:'center',
              color:Colors.black,
              fontSize:Fonts.size._30px, fontFamily:Fonts.name.extraBold
            }}>
            View Notes
          </Text>
          
          <View style={styles.main}>
          
            <FlatList
              data={data}
              numColumns={2}
              keyExtractor={(item, index) => item.user_id}
              renderItem={({item}: CreateTableModel) => {                                
                return (
                  <TouchableOpacity
                    style={{
                      // flex: 1 / 2,
                      width:wp('41%'),
                      paddingVertical: ResponsivePixels._25,
                      paddingHorizontal: ResponsivePixels._15,
                      backgroundColor: Colors.white,
                      marginBottom: ResponsivePixels._5,
                      borderRadius: ResponsivePixels._10,
                      marginTop: ResponsivePixels._18,
                      marginRight: ResponsivePixels._10,
                      marginLeft: ResponsivePixels._10,
                      minHeight: ResponsivePixels._55,
                      maxHeight: ResponsivePixels._80,
                      justifyContent: 'center',
                    }}
                    onPress={() => {
                      setId(item.user_id);
                      navigation.navigate('UpdateNotes', {item,changeNotesData:displayAllNotes});
                      setShow(false);
                    }}
                    onLongPress={() => {
                      setId(item.user_id);
                      setShow(true);
                    }}>
                    {item.title != '' ? (
                      <Text style={ styles.text
                      }>{item.title}</Text>
                    ):null}
                    {item.notes != '' ? (
                      <Text
                        style={[
                          {
                            fontSize: Fonts.size._13px,
                            color:Colors.grayColor,
                            height:ResponsivePixels._20
                          },
                          item.title === '' && styles.text,
                        ]}>
                        {item.notes}
                      </Text>

                    ):null}
                    <Text style={{ fontSize: Fonts.size._14px}}>{moment(item.DateTime).format('DD MMM')==moment(new Date()).format('DD MMM')?  moment(item.DateTime).format('MMMM, DD '):moment(item.DateTime).format('MMMM, YYYY')}</Text>
                    {/* <Text style={{ fontSize: Fonts.size._14px,position:'absolute',bottom:ResponsivePixels._5,left:ResponsivePixels._15,top:ResponsivePixels._52}}>{moment(item.DateTime).format('MMMM D')}</Text> */}
                    {show && (
                      <TouchableOpacity
                        style={[
                          {
                            backgroundColor: Colors.grayColor,
                            width: ResponsivePixels._20,
                            height: ResponsivePixels._20,
                            borderRadius: ResponsivePixels._10,
                            alignItems: 'center',
                            position: 'absolute',
                            right: ResponsivePixels._10,
                            bottom: ResponsivePixels._5,
                          },
                          item.user_id == id && styles.click,
                        ]}>
                        {item.user_id == id && (
                          <Text style={{color: 'white'}}>{'✓'}</Text>
                        )}
                      </TouchableOpacity>
                    )}
                  </TouchableOpacity>
                );
              }}
            />
            {/* )}  */}
            {!show && (
              <View style={styles.bottonPosition}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    navigation.navigate('AddNotes',{changeNotesData:displayAllNotes});
                  }}>
                  <Text style={styles.addButton}>+</Text>
                </TouchableWithoutFeedback>
              </View>
            )}
          </View>
          {show && (
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: Colors.white,
                position: 'absolute',
                bottom: 0,
                justifyContent: 'space-around',
                padding: ResponsivePixels._10,
                width: '100%',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={{alignItems: 'center'}}
                onPress={deleteNotes}>
                <Image
                  source={require('../../assets/Images/delete.jpg')}
                  style={{
                    width: ResponsivePixels._25,
                    height: ResponsivePixels._25,
                  }}
                />
                <Text style={{fontSize: Fonts.size._15px}}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
     
      </TouchableOpacity>
    </>
  );
};
export default ViewAllNotes;
const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: ResponsivePixels._20,
    backgroundColor: Colors.backgroundColor,
  },
  text: {
    color: Colors.black,
    fontSize: Fonts.size._15px,
    height:ResponsivePixels._25
    // paddingBottom: ResponsivePixels._5,
  },
  addButton: {
    width: ResponsivePixels._50,
    height: ResponsivePixels._50,
    borderRadius: ResponsivePixels._25,
    backgroundColor: Colors.yellowColor,
    color:  Colors.white,
    fontSize: Fonts.size._30px,
    // padding:10,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  bottonPosition: {
    position: 'absolute',
    bottom: 0,
    right: ResponsivePixels._20,
    marginVertical: ResponsivePixels._10,
  },
  click: {
    backgroundColor:Colors.yellowColor,
    width: ResponsivePixels._20,
    height: ResponsivePixels._20,
    borderRadius: ResponsivePixels._10,
    alignItems: 'center',
    position: 'absolute',
    right: ResponsivePixels._10,
    bottom: ResponsivePixels._5,
  },
});
