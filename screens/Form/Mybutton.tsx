// Example: Example of SQLite Database in React Native
// https://aboutreact.com/example-of-sqlite-database-in-react-native
// Custom Button
 
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
 
const Mybutton = (props) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={props.customClick}>
      <Text style={styles.text}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};
 
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#f05',
    color: '#ffffff',
    padding: 10,
    marginTop: 16,
    marginLeft: 100,
    marginRight: 100,
    width:100,
    height:40,
    borderRadius:25,
  },
  text: {
    color: '#ffffff',
  },
});
 
export default Mybutton;
