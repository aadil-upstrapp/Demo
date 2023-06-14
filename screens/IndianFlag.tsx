import React, {useState} from 'react';
import {StyleSheet, View, Text,Image, TextInput} from 'react-native';
// import { TextInput } from 'react-native-gesture-handler';
/* function change(x){
  return x*10;
 }
 module.exports = change; */
const IndianFlag: React.FC = props => {
  const [userName,setUserName]=useState('')
  
  function abc(){
    alert('Hello world ')
  }
  return (
      <View 
    style={styles.main}
    >
{/*       <View style={{ flex: 1, backgroundColor: "#FF9933",borderTopLeftRadius:50,borderTopRightRadius:50 }} />
      <View style={{ flex: 1, backgroundColor: "#fff",justifyContent:'center',alignItems:'center' }} >
        <Image source={require('../assets/Images/AshokChakra.png')} style={{width:'50%',height:'100%'}} />
      </View>
      <View style={{ flex: 1, backgroundColor: "#138808",borderBottomLeftRadius:50,borderBottomRightRadius:50 }} /> */}
     {/* <Text>{props.data}</Text> */}
      <TextInput style={styles.input} testID={'username'} value={userName} onChangeText={setUserName}  />
    </View>
  );
};
export default IndianFlag;
const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'column',
    padding: 30,
  },
  box: {
    flex: 1,
    backgroundColor: 'red',
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
