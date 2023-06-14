import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Text,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  ActivityIndicator,
  Image,
} from 'react-native';
import {DisplayAllUserDetailsModel} from './model/DisplayAllUserDetailsModel';
import SqliteMethod from './sqlite/SqliteMethod';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {MenuProvider} from 'react-native-popup-menu';
// import {ViewAllUserItem} from './ViewAllUserItem';

const ViewAllUser: React.FC = props => {
  const [flatListItems, setFlatListItems] = useState([]);
  const [data, setData] = useState();
  useEffect(() => {
    SqliteMethod.displayAllUser(setFlatListItems);
  }, [flatListItems]);

  const ViewAllUserItem = ({item}: DisplayAllUserDetailsModel) => {
    // console.log(item);

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
        <Text style={styles.label}>Roll No: {item.roll_no}</Text>
        <Text style={styles.label}>Name: {item.user_name}</Text>

        <Text style={styles.label}>Class: {item.class}</Text>
        <Menu>
          <MenuTrigger
            onPress={() => {
              // console.log(selectedId);
              setData({roll_no: parseInt(item.roll_no), class: item.class});
            }}>
            <Image
              source={require('../../assets/Images/dots.png')}
              style={{width: 15, height: 15, marginVertical: 5}}
            />
          </MenuTrigger>
          <MenuOptions
            optionsContainerStyle={{
              width: 70,
              // height: 80,
              borderRadius: 10,
              paddingHorizontal:10
            }}>
            <MenuOption
              onSelect={() => {
                props.navigation.navigate('ViewUserDetails', data);
              }}
              // text="Edit"
            >
              <Text style={{width: 50}}>View</Text>
            </MenuOption>
            <MenuOption
              onSelect={() => {
                props.navigation.navigate('UpdateData', data);
              }}
              // text="Edit"
            >
              <Text style={{width: 50}}>Update</Text>
            </MenuOption>
            <MenuOption
              onSelect={() => {
                props.navigation.navigate('DeleteData', data);
              }}
              // text="Edit"
            >
              <Text style={{width: 50}}>Delete</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
        {/*  <TouchableWithoutFeedback
          // style={{}}
          onPress={() => {
            // console.log(selectedId);

            show ? setShow(false) : setShow(true);
            setData({roll_no: parseInt(item.roll_no), class: item.class});
            setSelectedId({
              rollNo: parseInt(item.roll_no),
              stdClass: item.class,
            });
            // console.log(data);
            // console.log(selectedId?.stdClasss, selectedId?.rollNo);
          }}>
          <Image
            source={require('../../assets/Images/dots.png')}
            style={{width: 15, height: 15, marginVertical: 5}}
          />
        </TouchableWithoutFeedback>
        <View>
          {item?.class == selectedId?.stdClass &&
            item?.roll_no == selectedId?.rollNo &&
            show && (
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  right: -20,
                  backgroundColor: '#fff',
                  borderColor: 'black',
                  borderRadius: 20,
                  borderWidth: 0.5,
                  height: 80,
                  width: 70,
                  alignItems: 'center',
                  justifyContent: 'center',
                  elevation: 30,
                  shadowColor: 'yourchoice',
                  shadowRadius: 10,
                  shadowOpacity: 1,
                  // padding:10
                }}>
                <TouchableWithoutFeedback
                  onPress={() =>
                    props.navigation.navigate('ViewUserDetails', data)
                  }>
                  <Text style={{fontWeight: 'bold', marginBottom: 5}}>
                    View
                  </Text>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                  onPress={() => props.navigation.navigate('UpdateData', data)}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      marginBottom: 5,
                    }}>
                    Update
                  </Text>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                  onPress={() => props.navigation.navigate('DeleteData', data)}>
                  <Text style={{fontWeight: 'bold', marginBottom: 5}}>
                    Delete
                  </Text>
                </TouchableWithoutFeedback>
              </View>
            )}
        </View> */}
      </View>
    );
  };

  return (
    <>
      {flatListItems ? (
        <TouchableWithoutFeedback
          onPress={() => {
            // setShow(false);
          }}>
          <View
            style={[
              {
                flex: 1,
                backgroundColor: '#fff',
                position: 'relative',
                paddingHorizontal: 20,
                paddingVertical: 40,
              },
              // show && styles.display,
            ]}>
            <MenuProvider>
              <FlatList
                data={flatListItems}
                // ItemSeparatorComponent={listViewItemSeparator}
                keyExtractor={item => {
                  item.roll_no, item.class;
                }}
                renderItem={ViewAllUserItem}
                // renderItem={({item}) => <ViewAllUserItem item={item} navigation={props.navigation}   />}
                /*  renderItem={({item}) => (
                <View
                key={item.roll_no}
                style={{
                  backgroundColor: 'white',
                  paddingHorizontal: 20,
                  // paddingVertical: 30,
                  // marginVertical: 10,
                  flexDirection: 'row',
                  // position: 'relative',
                  height: 100,
                }}>
                <Text style={styles.label}>Roll No: {item.roll_no}</Text>
                <Text style={styles.label}>Name: {item.user_name}</Text>

                <Text style={styles.label}>Class: {item.class}</Text>
                <TouchableWithoutFeedback
                // style={{}}
                onPress={() => {
                  show ? setShow(false) : setShow(true);
                  setDate({rollNo: item.roll_no, class: item.class});
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
                    onPress={() =>
                      props.navigation.navigate('ViewUserDetails', data)
                    }>
                    <Text>View</Text>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                    onPress={() => props.navigation.navigate('UpdateData', data)}>
                    <Text>Update</Text>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                    onPress={() => props.navigation.navigate('DeleteData', data)}>
                    <Text>Delete</Text>
                    </TouchableWithoutFeedback>
                    </View>
                    )}
                    </View>
                    </View>
                    )} */
              />
              <View style={styles.bottonPosition}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    props.navigation.navigate('RegisterForm');
                  }}>
                  <Text style={styles.addButton}>+</Text>
                </TouchableWithoutFeedback>
              </View>
            </MenuProvider>
          </View>
        </TouchableWithoutFeedback>
      ) : (
        <ActivityIndicator
          size={'large'}
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    paddingHorizontal: 10,
    width: 100,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#18A558',
    color: '#fff',
    fontSize: 30,
    // padding:10,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  bottonPosition: {
    position: 'absolute',
    bottom: 0,
    right: 10,
    marginVertical: 10,
  },
  display: {
    shadowOpacity: 20,
  },
});
export default ViewAllUser;
