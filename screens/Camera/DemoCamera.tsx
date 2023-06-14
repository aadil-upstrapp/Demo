import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  PermissionsAndroid,
  TouchableWithoutFeedback,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  Image,
} from 'react-native';
import {BaseProps} from '../KhataBook/Model/BaseProps';
import {RNCamera} from 'react-native-camera';
import {useCamera} from 'react-native-camera-hooks';
import RNFS from 'react-native-fs';
import ResponsivePixels from '../constants/ResponsivePixels';
import Colors from '../constants/Colors';
const DemoCamera: React.FC<BaseProps> = ({navigation}) => {
  const [change,setChange]=useState(false)
  const [{cameraRef}, {takePicture}] = useCamera(null);

  useEffect(() => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA)
      .then(CAMERA => {
        if (CAMERA == 'granted') {
          console.log('Camera Granted');
        }
      })
      .catch(e => {
        console.log(e);
      });
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO)
      .then(RECORDAUDIO => {
        if (RECORDAUDIO == 'granted') {
          console.log('Audio Granted');
        }
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  const CaptureHandle = async () => {
    try {
      const data = await takePicture();
      const filePath = data.uri;
      console.log(filePath);
      
      const newFilePath = RNFS.ExternalDirectoryPath + '/MyTest.jpg';
      console.log(newFilePath);
      
      RNFS.moveFile(filePath, newFilePath)
        .then(() => {
          console.log('Images', filePath, '--to--', newFilePath);
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
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
            source={require('../../assets/Images/ic_arrow_back.png')}
            style={{
              width: ResponsivePixels._30,
              height: ResponsivePixels._30,
              tintColor: Colors.black,
              marginHorizontal: ResponsivePixels._5,
            }}
          />
        </TouchableWithoutFeedback>
      </View>
      <RNCamera
        ref={cameraRef}
        type={change?RNCamera.Constants.Type.front: RNCamera.Constants.Type.back}
        style={styles.preview}>
        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: ResponsivePixels._40,
            right:ResponsivePixels._50,
            backgroundColor: Colors.white,
            borderRadius: ResponsivePixels._25,
            width: ResponsivePixels._50,
            height: ResponsivePixels._50,
            justifyContent:'center',
            alignItems:'center'
          }}
          onPress={() => {
            change?setChange(false):setChange(true)
          }}>
            <Image source={require('../../assets/Images/Switch_Camera_Icon.png')} style={{width:ResponsivePixels._30,height:ResponsivePixels._30}} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: ResponsivePixels._20,
            backgroundColor: Colors.white,
            borderRadius: ResponsivePixels._50,
            width: ResponsivePixels._100,
            height: ResponsivePixels._100,
            justifyContent:'center',
            alignItems:'center'
          }}
          onPress={() => {
            CaptureHandle();
          }}>
          <Text style={{}}>Capture</Text>
        </TouchableOpacity>
      </RNCamera>
    </View>
  );
};
export default DemoCamera;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});
