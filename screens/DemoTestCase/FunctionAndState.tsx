import React,{useState} from 'react';
import {StyleSheet, View,Image, Text } from 'react-native';
function change(x){
    return x*20
  }
  module.exports = change;
const FunctionAndState: React.FC = (props) => {
  
 /*  function change(x){
    return x*10
  } */

  return (
      <View 
      style={styles.main}
      >
        <Text>hello world</Text>
        <Text>{change(2)}</Text>
        {/* <change/> */}
      {/* <Text>{change(2)}</Text>  */}
     </View>
  );
};
export default FunctionAndState;
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
