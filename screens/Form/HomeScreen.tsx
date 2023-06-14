import React, {useEffect} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import Mybutton from './Mybutton';
import Mytext from './Mytext';
// import SqliteMethod from './sqlite/SqliteMethod';

// import {openDatabase} from 'react-native-sqlite-storage';
import SqliteMethod from './sqlite/SqliteMethod';

// var db = openDatabase({name: 'UserDatabase.db'});
const HomeScreen: React.FC = (props) => {
  useEffect(() => {
    SqliteMethod.openDataBase();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1}}>
          <Mytext text="SQLite Example" />
          <Mybutton
            title="Register"
            customClick={() => props.navigation.navigate('RegisterForm')}
          />
          <Mybutton
            title="Update"
            customClick={() => props.navigation.navigate('UpdateData')}
          />
          <Mybutton
            title="View"
            customClick={() => props.navigation.navigate('ViewUserDetails')}
          />
          <Mybutton
            title="View All"
            customClick={() => props.navigation.navigate('ViewAllUser')}
          />
          <Mybutton
            title="Delete"
            customClick={() => props.navigation.navigate('DeleteData')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
