import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Text,
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
  StyleSheet,
  Alert,
} from 'react-native';
import Sqlite from './Sqlite';
import SqlityMethod from './sqlite/SqliteMethod';
const Delete: React.FC = (props) => {
  // console.log(props.route.params);
  // console.log(props);

  /*   useEffect(()=>{s
        // confirm('Are You Sure Delete Data')
        SqlityMethod.deleteData(props.route.params)
    },[]) */

  return (
    <View>
      <Text>
        {Alert.alert('Alert Title', 'Are you sure to delete Data', [
          {text: 'OK', onPress: () => Sqlite.deleteNotes(id)},
          {
            text: 'Cancel',
            onPress: () => props.navigation.navigate('ViewAllNotes'),
            style: 'cancel',
          },
        ])}
        ,
      </Text>
    </View>
  );
};
export default Delete;
