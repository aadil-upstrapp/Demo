import React, {useState} from 'react';
import {useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  ToastAndroid,
  Image,
  StatusBar,
} from 'react-native';
import {FlatList, TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Colors from './constants/Colors';
import Fonts from './constants/Fonts';
import ResponsivePixels from './constants/ResponsivePixels';

const TicTacToe: React.FC = ({navigation}) => {
 

  return (
<>

    <StatusBar
    backgroundColor={Colors.white}
    barStyle='dark-content'
    />
    <View style={{flex:1,backgroundColor:Colors.white}}>
      <TouchableWithoutFeedback
        style={{
          height: ResponsivePixels._35,
          width: ResponsivePixels._35,
          marginVertical: ResponsivePixels._20,
          marginHorizontal: ResponsivePixels._10,
        }}
        onPress={() => {
          navigation.goBack();
        }}>
        <Image
          source={require('../assets/Images/ic_arrow_back.png')}
          style={{
            width: ResponsivePixels._35,
            height: ResponsivePixels._35,
            tintColor: Colors.buttonColor,
            marginRight: ResponsivePixels._5,
          }}
        />
      </TouchableWithoutFeedback>

      <View style={styles.title}>
        <Text
          style={{
            fontSize: Fonts.size._22px,
            color: Colors.black,
            fontFamily: Fonts.name.extraBold,
          }}>
          Tic Tac Toe Game
        </Text>
      </View>
      
      <TouchableWithoutFeedback
        style={styles.selectUser}
        containerStyle={{alignSelf: 'center'}}
        onPress={() => {
          navigation.navigate('DemoGame',{GameType:'UserVsUser'});
        }}>
        <Text style={styles.userStyle}>User Vs User</Text>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        style={styles.selectUser}
        containerStyle={{alignSelf: 'center'}}
        onPress={() => {
          navigation.navigate('DemoGame',{GameType:'Easy'});
        }}>
        <Text style={styles.userStyle}>Computer Vs User Easy Game</Text>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        style={styles.selectUser}
        containerStyle={{alignSelf: 'center'}}
        onPress={() => {
          navigation.navigate('DemoGame',{GameType:'Hard'});
        }}>
        <Text style={styles.userStyle}>Computer Vs User Hard Game</Text>
      </TouchableWithoutFeedback>
    </View>
    </>
  );
};
export default TicTacToe;
const styles = StyleSheet.create({
  box: {
    height: ResponsivePixels._150,
    // marginHorizontal: ResponsivePixels._20,
    marginVertical: ResponsivePixels._50,
    alignItems: 'center',
  },
  boxs: {
    // flex: 1,
    // width: 124,
    backgroundColor: Colors.grayColor,
    width: ResponsivePixels._120,
    // borderLeftWidth: ResponsivePixels._1,
    borderRightWidth: ResponsivePixels._1,
    // borderLeftColor:Colors.black,
    borderRightColor: Colors.black,
    borderBottomColor: Colors.black,
    height: ResponsivePixels._50,
    borderBottomWidth: ResponsivePixels._1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: ResponsivePixels._25,
    // flex:1
  },
  selectUser: {
    width: ResponsivePixels._250,
    height: ResponsivePixels._100,
    backgroundColor: Colors.dividerColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: ResponsivePixels._20,
    marginVertical:ResponsivePixels._10,
  },
  userStyle:{
    color:Colors.white,
    fontFamily:Fonts.name.OpenSans_Bold,
    fontSize:Fonts.size._18px,
    textAlign:'center'
  }
});
