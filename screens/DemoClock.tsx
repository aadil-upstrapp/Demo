import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  Button,
} from 'react-native';
import Colors from './constants/Colors';
import ResponsivePixels from './constants/ResponsivePixels';
import {BaseProps} from './KhataBook/Model/BaseProps';

const DemoClock: React.FC<BaseProps> = ({route, navigation}) => {
    const [dateTime,setDateTime]=useState<Date>()
   useEffect(() => {
     setTimeout(() => {
       setDateTime(new Date());
     }, 0);
   }, [new Date()]);

   const create = () => {
    let date = new Date();
    date.setDate(date.getDate() + 1);
    date.setHours(16, 49);
    
    AlarmClock.createAlarm(date.toISOString(), 'My Custom Alarm');
    console.log(moment(date.toISOString()).format('DD HH mm'));
  };

  return (
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
      {/* <Button title="Create Alarm at 1:55PM" onPress={() => create()} /> */}
       <Text>{moment(dateTime).format('hh:mm:ss')}</Text>
       <Text>{moment(dateTime).format('DD/MM/YYYY a')}</Text>
 
      </View>
    </View>
  );
};
export default DemoClock;
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
