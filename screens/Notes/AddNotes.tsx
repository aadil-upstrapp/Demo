import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TextInput, Image} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import ResponsivePixels from '../constants/ResponsivePixels';
import Mybutton from '../Form/Mybutton';
import {TableDataModel} from './model/TableDataModel';
import Sqlite from './Sqlite';

const AddNotes: React.FC = ({route,navigation}) => {
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');

  // const tableName = 'user_notes';
  let dateTime=new Date
  const data: TableDataModel = {
    title,
    notes,
    dateTime,
  };
  // console.log(route);
  
  const insert = () => {
    /*  if (!title) {
      alert('Please Enter Title');
      return;
    } else if (!notes) {
      alert('Please Enter Notes');
      return;
    } */
    Sqlite.insertData(navigation, data);
    route.params.changeNotesData();
    setNotes('');
    setTitle('');
  };
useEffect(()=>{
  Sqlite.openDataBase()
},[])
  /*  useEffect(() => {
    if (!title) {
      alert('Please Enter Title');
      return;
    } else if (!notes) {
      alert('Please Enter Notes');
      return;
    }
    Sqlite.openDataBase()
    Sqlite.insertData(data);
  }, [AddNotes]);in progress */


  return (
    <View style={styles.main}>
      <View
        style={{position: 'absolute', top:ResponsivePixels._20, left: ResponsivePixels._10, alignSelf: 'center'}}>
        <TouchableWithoutFeedback
          // style={{}}
          onPress={() => {
            route.params.changeNotesData()
            navigation.goBack();
          }}>
          <Image
            source={require('../../assets/Images/ic_arrow_back.png')}
            style={{width: ResponsivePixels._35, height: ResponsivePixels._35}}
          />
        </TouchableWithoutFeedback>
      </View>
      <Text style={{textAlign: 'center', fontSize:Fonts.size._30px, fontFamily:Fonts.name.extraBold,color:Colors.black}}>
        Add Notes
      </Text>
      <View style={styles.container}>
        <TextInput
          value={title}
          multiline
          placeholder="Title"
          placeholderTextColor={Colors.black}
          onChangeText={setTitle}
          style={styles.inputTitle}
        />
        <TextInput
          value={notes}
          placeholder="Start typing"
          onChangeText={setNotes}
          multiline
          placeholderTextColor={Colors.black}
          style={styles.inputNotes}
        />
      </View>
      <View style={styles.button}>
        <Mybutton title="Submit" customClick={insert} />
      </View>
    </View>
  );
};
export default AddNotes;
const styles = StyleSheet.create({
  main: {
    position: 'relative',
    flex: 1,
    padding: ResponsivePixels._20,
    backgroundColor:  Colors.backgroundColor,
    // backgroundColor: Colors.white,
    alignItems: 'center',
  },
  container: {
    alignSelf: 'flex-start',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: ResponsivePixels._20,
  },
  inputTitle: {
    marginHorizontal: ResponsivePixels._5,
    paddingHorizontal: ResponsivePixels._20,
    // width: '100%',
    borderRadius: ResponsivePixels._20,
    color: Colors.black,
    fontSize: Fonts.size._20px,
   },
  inputNotes: {
    marginHorizontal: ResponsivePixels._5,
    paddingHorizontal: ResponsivePixels._20,
    // width: '100%',
    borderRadius: ResponsivePixels._20,
    color: Colors.black,
    fontSize: Fonts.size._18px,
  },
  button: {
    position: 'absolute',
    bottom: ResponsivePixels._40,
    // left:0,
    // right: 10,
    // textAlign:'center'
  },
});
