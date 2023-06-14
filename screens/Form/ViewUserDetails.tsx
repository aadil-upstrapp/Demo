import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Text,
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {DisplayData, DisplayDataList} from './model/DisplayDataModel';
import SqliteMethod from './sqlite/SqliteMethod';

const ViewUserDetails: React.FC = ({route}) => {
  const [rollNum, setRollNum] = useState<number>();
  const [name, setName] = useState<string>();
  const [age, setAge] = useState<number>();
  const [std, setStd] = useState<number>();
  const [gender, setGender] = useState<string>();

  useEffect(() => {
    // console.log('data');
    // console.log(route);
    SqliteMethod.selectUser(route.params, (data: DisplayDataList[]) => {
      // console.log(data);
      
      if (data.length > 0) {
        setRollNum(data[0].roll_no);
        setName(data[0].user_name);
        setAge(data[0].age);
        setGender(data[0].gender);
        setStd(data[0].class);
      }
      // console.log(data);
    });
  },[]);
  // console.log('data',route.params);

  const listItemView = item => {
    return (
      <View
        key={item.roll_no}
        style={{backgroundColor: 'white', padding: 20, position: 'relative'}}>
        <Text style={styles.label}>Roll No: {item.roll_no}</Text>
        <Text style={styles.label}>Name: {item.user_name}</Text>
        <Text style={styles.label}>Age: {item.age}</Text>
        <Text style={styles.label}>Class: {item.class}</Text>
        <Text style={styles.label}>Gender: {item.gender}</Text>
      </View>
    );
  };

  return (
    <>
      {/* {name ? ( */}
      <View style={{flex: 1, padding: 20}}>
        <Text>Roll No :{rollNum}</Text>
        <Text>Name :{name}</Text>
        <Text>Age :{age}</Text>
        <Text>Class :{std}</Text>
        <Text>Gender :{gender}</Text>
      </View>
      {/*  ) : (
        <ActivityIndicator
          size={'large'}
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        />
      )} */}
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    paddingHorizontal: 10,
  },
  addButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ffd',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  bottonPosition: {
    position: 'absolute',
    bottom: 0,
    right: 10,
    marginVertical: 10,
  },
});
export default ViewUserDetails;
