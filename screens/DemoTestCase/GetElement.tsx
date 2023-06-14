import React,{useState} from 'react';
import {StyleSheet, View, TextInput } from 'react-native';

const GetElement: React.FC = () => {
  const [userName,setUserName]=useState('');

  return (
      <View 
      style={styles.main}
      >
       <TextInput style={styles.input} value={userName} testID='username'  onChangeText={setUserName}  />
     </View>
  );
};
export default GetElement;
const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'column',
    padding: 30,
  },

  input: {
    borderColor: 'black',
    marginTop:10,
    borderWidth: 0.5,
    marginHorizontal: 5,
    paddingHorizontal: 20,
    height: 40,
    width: '100%',
  },
});
