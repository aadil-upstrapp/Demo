import moment from 'moment';
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
import Fonts from '../constants/Fonts';
import ResponsivePixels from '../constants/ResponsivePixels';
import Mybutton from '../Form/Mybutton';
import {TableDataModel} from './model/TableDataModel';
import Sqlite from './Sqlite';
import ViewAllNotes from './ViewAllNotes';

const UpdateNotes: React.FC = ({route,navigation}) => {
  // const [data, getdata] = useState([]);
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  let dateTime=new Date
  const changeData: TableDataModel = {
    title,
    notes,
    dateTime,
  };
  const id = route.params.item.user_id;
  console.log(route);
  

  // console.log(props);
  const updateData = () => {
    /*  if (!title) {
      alert('Please Enter Title');
      return;
    } else if (!notes) {
      alert('Please Enter Notes');
      return;
    } */
    // Sqlite.openDataBase()
    // Sqlite.insertData(data);
    Sqlite.updateNotes(navigation, id, changeData);
    route.params.changeNotesData();
    
    
    <ViewAllNotes />;
    // setNotes('');
    // props.navigation.navigate('ViewAllNotes')
    // setTitle('');
  };
  useEffect(() => {
    Sqlite.selectNotes(id, (data: TableDataModel[]) => {
      if (data.length > 0) {
        setTitle(data[0].title);
        setNotes(data[0].notes);
      }
    });
    // Sqlite.updateTable()
  }, []);
  // console.log(data);
  // console.log(props);

  return (
    <View style={styles.main}>
       <View
        style={{position: 'absolute', top:ResponsivePixels._20, left: ResponsivePixels._10, alignSelf: 'center'}}>
        <TouchableWithoutFeedback
          // style={{}}
          onPress={() => {
            route.params.changeNotesData();
            navigation.goBack();
          }}>
          <Image
            source={require('../../assets/Images/ic_arrow_back.png')}
            style={{width: ResponsivePixels._35, height: ResponsivePixels._35}}
          />
        </TouchableWithoutFeedback>
      </View>
      <Text style={{textAlign: 'center', fontSize:Fonts.size._30px, fontFamily:Fonts.name.extraBold,color:Colors.black}}>
        Update Notes
      </Text>
      <View style={styles.container}>
        <TextInput
          value={title}
          placeholder="Title"
          multiline
          onChangeText={setTitle}
          style={styles.inputTitle}
        />
        <TextInput
          value={notes}
          placeholder="Start typing"
          onChangeText={setNotes}
          multiline
          style={styles.inputNotes}
        />
      </View>
      <View style={styles.button}>
        <Mybutton title="Update" style customClick={updateData} />
      </View>
    </View>
  );
};
export default UpdateNotes;
const styles = StyleSheet.create({
  main: {
    position: 'relative',
    flex: 1,
    padding: ResponsivePixels._20,
    backgroundColor: Colors.backgroundColor,
    alignItems: 'center',
  },
  container: {
    alignSelf: 'flex-start',
    paddingVertical:ResponsivePixels._20
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
    // width: '90%',
    borderRadius: ResponsivePixels._20,
    color: Colors.black,
    fontSize: Fonts.size._18px,
  },
  button: {
    position: 'absolute',
    bottom: ResponsivePixels._40,
  },
});
