import React from 'react';
import {Text, View, StyleSheet, StatusBar} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Colors from './constants/Colors';
import Fonts from './constants/Fonts';
import ResponsivePixels from './constants/ResponsivePixels';
import { BaseProps } from './KhataBook/Model/BaseProps';

const Home: React.FC<BaseProps> = ({navigation}) => {
  return (
    <>
    <StatusBar
    backgroundColor={Colors.grayColor}
    barStyle='dark-content'
    />
    <View style={styles.main}>
      <View style={{flexDirection: 'row'}}>
        <TouchableWithoutFeedback
          style={styles.box}
          onPress={() => {
            navigation.navigate('Calculator');
          }}>
          <Text>Calculator</Text>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          style={styles.box}
          onPress={() => {
            navigation.navigate('TicTacToe');
          }}>
          <Text>TicTacToe Game</Text>
        </TouchableWithoutFeedback>
      </View>
      <View style={{flexDirection: 'row'}}>
        <TouchableWithoutFeedback
          style={styles.box}
          onPress={() => {
            navigation.navigate('CountryPicker');
          }}>
          <Text>Country Picker</Text>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          style={styles.box}
          onPress={() => {
            navigation.navigate('ContactsPicker');
          }}>
          <Text>Contacts </Text>
        </TouchableWithoutFeedback>
      </View>
      <View style={{flexDirection: 'row'}}>
        <TouchableWithoutFeedback
          style={styles.box}
          onPress={() => {
            navigation.navigate('PazzlesGame');
          }}>
          <Text>Pazzles Game</Text>
        </TouchableWithoutFeedback>
     <TouchableWithoutFeedback
          style={styles.box}
          onPress={() => {
            navigation.navigate('ChangeLanguage');
          }}>
          <Text>Change Language</Text>
        </TouchableWithoutFeedback>
    
      </View>
      <View style={{flexDirection: 'row'}}>
      {/* <TouchableWithoutFeedback
          style={styles.box}
          onPress={() => {
            navigation.navigate('HomeScreen');
          }}>
          <Text>Employee DataBase</Text>
        </TouchableWithoutFeedback> */}
     <TouchableWithoutFeedback
          style={styles.box}
          onPress={() => {
            navigation.navigate('ViewAllNotes');
          }}>
          <Text>Notes</Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          style={styles.box}
          onPress={() => {
            navigation.navigate('Splash');
          }}>
          <Text> KhataBook</Text>
        </TouchableWithoutFeedback>
      </View>
      <View style={{flexDirection: 'row'}}>
      <TouchableWithoutFeedback
          style={styles.box}
          onPress={() => {
            navigation.navigate('DemoListening');
          }}>
          <Text>Listening</Text>
        </TouchableWithoutFeedback>
      {/* <TouchableWithoutFeedback
          style={styles.box}
          onPress={() => {
            navigation.navigate('AudioScreen');
          }}>
          <Text>Call Screen</Text>
        </TouchableWithoutFeedback> */}
        </View>
       {/* <View style={{flexDirection: 'row'}}>
      <TouchableWithoutFeedback
          style={styles.box}
          onPress={() => {
            navigation.navigate('VideoScreen');
          }}>
          <Text>Video Screen</Text>
        </TouchableWithoutFeedback> */}
      {/* <TouchableWithoutFeedback
          style={styles.box}
          onPress={() => {
            navigation.navigate('DemoClock');
          }}>
          <Text>Clock</Text>
        </TouchableWithoutFeedback> 
        </View> */}
     {/* </View> */}
    </View>
    </>
  );
};

export default Home;
const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.grayColor,
  },
  box: {
    height:ResponsivePixels._100,
    width: ResponsivePixels._150,
    fontSize:Fonts.size._20px,
    margin:ResponsivePixels._10,
    backgroundColor:Colors.lightWhite,
    justifyContent:'center',
    alignItems:'center'
  },
});
