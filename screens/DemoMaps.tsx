import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Dimensions,
  Button,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation, {
  getCurrentPosition,
} from 'react-native-geolocation-service';
// import RNLocation from 'react-native-location';
import {enableLatestRenderer} from 'react-native-maps';

const DemoMaps: React.FC = props => {
  /*  RNLocation.configure({
    distanceFilter: null
   }) */
  interface ILocation {
    latitude: number;
    longitude: number;
  }
  const [search, setSearch] = useState('');

  const [location, setLocation] = useState<ILocation>({
    latitude: 23.022924,
    longitude: 73.07233,
  });

  // const [pickupCords, droplocationCords] = data;

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        console.log(position);
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
    );
  }, []);
  /*  const permissionHandle = async () => {

    console.log('here')
 
 
    let permission = await RNLocation.checkPermission({
     
      android: {
        detail: 'coarse' // or 'fine'
      }
    });
 
    console.log('here2')
    console.log(permission)
 
  } */

  return (
    <View style={styles.container}>
      <MapView
        style={styles.maps}
        // initialRegion={location.latitude}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        zoomEnabled={true}
        zoomControlEnabled={true}
        provider={PROVIDER_GOOGLE}
        onRegionChange={region => {
          setLocation({
            latitude: region.latitude,
            longitude: region.longitude,
          });
        }}
        // enableHighAccuracy={true}
        onRegionChangeComplete={region => {
          setLocation({
            latitude: region.latitude,
            longitude: region.longitude,
          });
        }}
        // forceRequestLocation={true}
        // showsUserLocation={true}
      >
        {/* <Marker coordinate={data.pickupCords} />
        <Marker coordinate={data.droplocationCords} /> */}

        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          title={'title'}
          description={'description'}
        />
        {/*    <Marker
          coordinate={pin}
          pinColor={'red'} // any color
          title={'title'}
          draggable={true}
          onDragStart={(e)=>{console.log(e.nativeEvent.coordinate);
          }}
          onDragEnd={(e)=>{
            setPin({
              latitude:e.nativeEvent.coordinate.latitude,
              longitude:e.nativeEvent.coordinate.longitude,
            })
            console.log(e.nativeEvent.coordinate);
          }}
          description={'description'}
          />
          </MapView>
          <TextInput
          value={search}
          placeholder="Search here"
          onChangeText={setSearch}
          style={styles.input}
      /> */}
      </MapView>
      {/*  <TextInput
        value={search}
        placeholder="Search here"
        onChangeText={setSearch}
        style={styles.input}
      /> */}
      {/* <Button title="Get Location" */}
      {/* // onPress={permissionHandle} */}
      {/* /> */}
    </View>
    // <MapView
    //   style={{flex: 1}}
    //   initialRegion={{
    //     latitude: 37.78825,
    //     longitude: -122.4324,
    //     latitudeDelta: 0.0922,
    //     longitudeDelta: 0.0421,
    //   }}
    // showsUserLocation={true}
    // />
  );
};
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    // flex:1,
    // height: 400,
    // width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  maps: {
    ...StyleSheet.absoluteFillObject,
    // height:620,
    // backgroundColor:'red',
    // width:'100%',
  },
  input: {
    borderColor: '#fff',
    borderWidth: 0.5,
    marginHorizontal: 5,
    paddingHorizontal: 20,
    height: 40,
    width: '90%',
    position: 'absolute',
    top: 20,
    right: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
  },
});
export default DemoMaps;
