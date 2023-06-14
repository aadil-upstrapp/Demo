import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
  useRef,
} from 'react';
import {Text, View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
const ObjectMethods: React.FC = () => {
  
  let number=1;
 const fun1=()=>{
  // number=3
  
  console.log('function 1');
  fun2()
  console.log('function 5');
 }
 const fun2=async()=>{
  //  await console.log('function 3');
  await console.log('function 3');
  
    
  //  number=2
  console.log('function 2');
  
 }
useEffect(()=>{
  fun1()
},[])
  return (
    <View>
      <Text>
      {number}
      </Text>
    </View>
  );
};
export default ObjectMethods;
