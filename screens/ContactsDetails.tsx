import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  StatusBar,
  BackHandler,
} from 'react-native';
import Colors from './constants/Colors';
import ResponsivePixels from './constants/ResponsivePixels';
import {BaseProps} from './KhataBook/Model/BaseProps';
const ContactsDetails: React.FC<BaseProps> = ({route, navigation}) => {
  // console.log(route.params.phoneNumbers.length==2?route.params.phoneNumbers:'hello');
  
  useEffect(()=>{
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  },[])

  const backAction=()=>{
    navigation.goBack();
    return true;
  }

  return (
    <>
    <StatusBar
    backgroundColor={Colors.bgLightBlue}
    barStyle='dark-content'
    />
    <View style={styles.main}>
      <View
        style={{
          padding: ResponsivePixels._10,
          justifyContent: 'center',
          marginBottom: ResponsivePixels._10,
          backgroundColor: Colors.bgLightBlue,
        }}>
        <TouchableWithoutFeedback
          style={{height: ResponsivePixels._30, width: ResponsivePixels._30}}
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            source={require('../assets/Images/ic_arrow_back.png')}
            style={{
              width: ResponsivePixels._30,
              height: ResponsivePixels._30,
              tintColor: Colors.black,
              marginHorizontal: ResponsivePixels._5,
            }}
          />
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.box}>
        <Text>{`Name: ${route.params?.displayName}`}</Text>

        <Text>{`Phone Number: ${route.params.phoneNumbers[0]?.number}`}</Text>

        <Text>
          {route.params.phoneNumbers.length == 2
            ? route.params.phoneNumbers[1]?.number
            : null}
        </Text>
      </View>
    </View>
    </>
  );
};
export default ContactsDetails;
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.bgLightBlue,
  },
  box: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
