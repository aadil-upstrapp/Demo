import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Text,
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
} from 'react-native';


export const ViewAllUserItem: React.FC = ({navigation, item}) => {
  const [show, setShow] = useState(false);
  const [data, setDate] = useState();
  // console.log(props);
  useEffect(() => {
    setShow(false);
  }, []);

  return (
    <View
      // key={item.roll_no}
      style={{
        backgroundColor: 'white',
        paddingHorizontal: 20,
        // paddingVertical: 30,
        // marginVertical: 10,
        flexDirection: 'row',
        // position: 'relative',
        height: 100,
      }}>
        {/* <MenuProvider> */}


      <Text style={styles.label}>Roll No: {item?.roll_no}</Text>
      <Text style={styles.label}>Name: {item?.user_name}</Text>

      <Text style={styles.label}>Class: {item?.class}</Text>
      <TouchableWithoutFeedback
        // style={{}}
        onPress={() => {
          show ? setShow(false) : setShow(true);
          setDate({rollNo: item?.roll_no, class: item.class});
        }}>
        <Image
          source={require('../../assets/Images/dots.png')}
          style={{width: 15, height: 15, marginVertical: 5}}
        />
      </TouchableWithoutFeedback>
      <View>
        
        {show && (
          <View
            style={{
              position: 'absolute',
              top: -10,
              // right: -20,
              backgroundColor: '#ffd',
              borderColor: '#ffda',
              borderRadius: 20,
              borderWidth: 10,
              height: 80,
              // padding:10
            }}>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('ViewUserDetails', data)}>
              <Text>View</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('UpdateData', data)}>
              <Text>Update</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('DeleteData', data)}>
              <Text>Delete</Text>
            </TouchableWithoutFeedback>
          </View>
        )}
      </View>
      {/* </MenuProvider> */}
    </View>
  );
};
const styles = StyleSheet.create({
  label: {
    paddingHorizontal: 5,
    width: 100,
  },
  addButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ffd',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  bottonPosition: {
    position: 'absolute',
    bottom: 0,
    right: 10,
    marginVertical: 10,
  },
});
