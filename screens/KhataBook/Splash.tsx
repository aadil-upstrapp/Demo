import React, {useEffect} from 'react';
import { Image, TouchableWithoutFeedback, View } from 'react-native';
import Colors from '../constants/Colors';
import { BaseProps } from './Model/BaseProps';
import { reset } from './Navigation/RootNavigation';
import WrapperComponent from './Navigation/WrapperComponent';

const Splash: React.FC<BaseProps> = ({navigation,session}) => {
  useEffect(() => {
    // setTimeout(() => {
        reset(session.user_id ? "ViewData" :  "Login")
    // },50);
  }, []);
  console.log('chnage');
  
  return(
    <View style={{flex:1}}>

<TouchableWithoutFeedback
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            source={require('../../assets/Images/ic_arrow_back.png')}
            style={{
              width: 30,
              height: 30,
              tintColor: Colors.black,
              marginRight: 5,
            }}
          />
        </TouchableWithoutFeedback>
        <View style={{flex:1,justifyContent:'center',alignSelf:'center'}}>

        <Image source={require('../../assets/Images/khatabook.png')}  style={{
          width: 100,
          height: 100,
          alignItems:'center',
          resizeMode:'contain',
          justifyContent:'center',
          // tintColor: Colors.black,
          marginRight: 5,
        }} />
        </View>
    </View>
  )
}
export default WrapperComponent(Splash);