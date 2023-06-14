import React, {useState, useEffect} from 'react';
// import Styled from 'styled-components/native';
import {Button, TextInput} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE, Polyline} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
// import Geolocation from 'react-native-geolocation-service';
import GetLocation from 'react-native-get-location';
interface ILocation {
  latitude: number;
  longitude: number;
}

const UserLocation: React.FC = () => {
  const [search, setSearch] = useState('');
  const [locations, setLocations] = useState<ILocation>({
    latitude: 23.019841,
    longitude: 73.070642,
  });
  const [location, setLocation] = useState<ILocation>({
    latitude: 23.020473,
    longitude: 72.575923,
  });
  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        console.log('location',location);
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  }, []);
  // console.log('location',location);

  {
    // console.log('location', location);
  }
  //   const data=()=>{
  // Geoc
  //   }
  return (
    <>
      <MapView
        style={{flex: 1}}
        initialRegion={{
          latitude: locations.latitude,
          longitude: locations.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        provider={PROVIDER_GOOGLE}
        zoomEnabled={true}
        zoomControlEnabled={true}
        /*  onRegionChange={region => {
          setLocation({
            latitude: region.latitude,
            longitude: region.longitude,
          });
        }} */
        // onPress={region=>{
        //   setLocation({
        //     latitude:region.latitude,
        //     longitude:region.longitude
        //   })
        // }}
        /* onRegionChangeComplete={region => {
          setLocation({
            latitude: region.latitude,
            longitude: region.longitude,
          });
        }} */
      >
        <Polyline
          coordinates={[
            {latitude: 23.019841, longitude: 73.070642},
            {latitude: 23.020473, longitude: 72.575923},
            // { latitude: 37.7665248, longitude: -122.4161628 },
            // { latitude: 37.7734153, longitude: -122.4577787 },
            // { latitude: 37.7948605, longitude: -122.4596065 },
            // { latitude: 37.8025259, longitude: -122.4351431 }
          ]}
          strokeColor="blue" // fallback for when `strokeColors` is not supported by the map-provider
          strokeWidth={2}
        />
        <Marker
          coordinate={{
            latitude: locations.latitude,
            longitude: locations.longitude,
          }}
          title="Kapadvanj"
        />
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          title="Ahmedabad"
        />
      </MapView>
      <TextInput
        value={search}
        placeholder="Search here"
        onChangeText={setSearch}
        style={{
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
        }}
      />
      {/* <Button title='getData' onPress={data} /> */}
    </>
  );
};

export default UserLocation;
