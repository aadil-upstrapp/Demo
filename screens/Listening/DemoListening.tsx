import React, {useEffect, useState} from 'react';
import {StyleSheet,TouchableWithoutFeedback,View,Text,PermissionsAndroid,Image, StatusBar} from 'react-native';
import Colors from '../constants/Colors';
import Voice from '@react-native-voice/voice';
import ResponsivePixels from '../constants/ResponsivePixels';
import Fonts from '../constants/Fonts';
const DemoListening: React.FC = ({}) => {
  const [result, setResult] = useState('');
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO)
      .then(mic => {
        if (mic == 'granted') {
          console.log('granted');
          Voice.onSpeechStart = onSpeechStartHandler;
          Voice.onSpeechEnd = onSpeechEndHandler;
          Voice.onSpeechResults = onSpeechResultsHandler;
        }
        return () => {
          setVisible(false)
          Voice.destroy().then(Voice.removeAllListeners);
        };
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  const onSpeechRemove=()=>{
    setResult('');
    setVisible(false);
    Voice.destroy().then(Voice.removeAllListeners);
  };
  const onSpeechStartHandler = e => {
    console.log('onSpeechStartHandler', e);
  };
  const onSpeechEndHandler = e => {
    console.log('onSpeechEndHandler', e);
  };
  const onSpeechResultsHandler = e => {
    let text = e.value[0];
    setResult(text);
    console.log('onSpeechResultHandler', e);
  };
  const startRecoding = async () => {
    setVisible(true)
    try {
      await Voice.start('en-Us','gu-IN','hi-IN');
      	
// ur-PK
    } catch (error) {
      console.log('error', error);
    }
  };

  
  return (
    <>
    <StatusBar
    backgroundColor={Colors.white}
    barStyle='dark-content'
    />
   
    <View style={styles.main}>
      {
       !visible&& 
      <TouchableWithoutFeedback onPress={startRecoding}>
        <View style={styles.box}>
          <Image
            source={require('../../assets/Images/Chirag.jpg')}
            style={{width: ResponsivePixels._100, height: ResponsivePixels._50}}
          />
        </View>
      </TouchableWithoutFeedback> 
     }
      {
       visible&& 
       <TouchableWithoutFeedback 
       onPress={()=>{onSpeechRemove()}}
        style={{alignItems:'center'}}>
          <Image
            source={require('../../assets/Images/Aladdin.jpg')}
            style={{width:'90%', height:'90%',resizeMode:'stretch',position:'absolute',left:20,top:50}}
          />
       </TouchableWithoutFeedback>
      }
      <Text style={{textAlign:'center',padding:10,fontSize:Fonts.size._20px}}>{result}</Text>
    </View>
    </>
  );
};
export default DemoListening;
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  box: {
    position: 'absolute',
    top: '50%',
    alignSelf:'center',
    alignItems:'center',
    height: ResponsivePixels._50,
    width: ResponsivePixels._100,
    backgroundColor: Colors.backgroundColor,
  },
});
