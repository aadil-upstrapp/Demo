import React, {useState} from 'react';
import {Text, View, StyleSheet,Image, StatusBar} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import En from '../locales/En';
import {useTranslation} from 'react-i18next';
import Hd from '../locales/Hd';
import Ar from '../locales/Ar';
import Ud from '../locales/Ud';
import ResponsivePixels from './constants/ResponsivePixels';
import Colors from './constants/Colors';
import { BaseProps } from './KhataBook/Model/BaseProps';
import Fonts from './constants/Fonts';

const ChangeLanguage: React.FC<BaseProps> = ({navigation:{goBack}}) => {
  const [language, setLanguage] = useState(En);
  // const {t} = useTranslation();
  return (
    <>
    <StatusBar
    backgroundColor={Colors.backgroundColor}
    barStyle='dark-content'
    />
    <View style={styles.main} >
    <TouchableWithoutFeedback
          style={{height: ResponsivePixels._30, width: ResponsivePixels._30}}
          onPress={() => {
            goBack()
          }}>
          <Image
            source={require('../assets/Images/ic_arrow_back.png')}
            style={styles.backButtonStyle}
          />
        </TouchableWithoutFeedback>
    
    <View style={{justifyContent: 'center', alignItems: 'center'}}>

      
      <Text style={styles.titleStyle}>{'Change Language'}</Text>
      <View style={{flexDirection: 'row',marginVertical:ResponsivePixels._20}}>
        <TouchableWithoutFeedback
          onPress={() => {
            setLanguage(En);
          }}
          style={styles.click}>
          <Text style={styles.textStyle}>{'English'}</Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          style={styles.click}
          onPress={() => {
            setLanguage(Hd);
          }}>
          <Text style={styles.textStyle}>{'Hindi'}</Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          style={styles.click}
          onPress={() => {
            setLanguage(Ar);
          }}>
          <Text style={styles.textStyle}>{'Arabic'}</Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          style={styles.click}
          onPress={() => {
            setLanguage(Ud);
          }}>
          <Text style={styles.textStyle}>{'Urdu'}</Text>
        </TouchableWithoutFeedback>
      </View>
        {/* {language==Ar&& language==Ud ?  */}
      <View style={{flexDirection: 'row',marginVertical:ResponsivePixels._10}}>
        <Text style={styles.helloTextStyle}>{language.name }</Text>
        {/* <Text style={styles.helloTextStyle}>{t(language.name)}</Text> */}
      </View>
        {/* :0  }  */}
    </View>
    </View>
    </>
  );
};
export default ChangeLanguage;
const styles = StyleSheet.create({
  main:{
    padding:ResponsivePixels._20,
    backgroundColor:Colors.backgroundColor,
    flex:1
  },
  titleStyle:{fontSize:Fonts.size._25px,color:Colors.black,fontFamily:Fonts.name.medium,marginTop:ResponsivePixels._20},
  click: {
    backgroundColor: Colors.white,
    marginVertical: ResponsivePixels._10,
    marginHorizontal: ResponsivePixels._5,
    width:ResponsivePixels._80,alignItems:'center',
    borderRadius:ResponsivePixels._10,
    padding:ResponsivePixels._10
  },
  backButtonStyle:{
    width: ResponsivePixels._30,
    height: ResponsivePixels._30,
    tintColor: Colors.buttonColor,
    marginRight: ResponsivePixels._5,
  },
  textStyle:{
    fontFamily:Fonts.name.OpenSans_Regular,
    fontSize:Fonts.size._15px,
    color:Colors.black
  },
  helloTextStyle:{marginHorizontal: ResponsivePixels._5,fontFamily:Fonts.name.OpenSans_Bold,color:Colors.black,fontSize:Fonts.size._20px}
});
