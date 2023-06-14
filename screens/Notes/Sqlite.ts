import {openDatabase} from 'react-native-sqlite-storage';
import {Alert} from 'react-native';
import {CreateTableModel} from './model/CreateTableModel';
import {DataModel} from './model/DataModel';
import {TableDataModel} from './model/TableDataModel';
const db = openDatabase({name: 'Notes.db'});
export default {
  openDataBase() {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='user_notes'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS user_notes', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS user_notes(user_id INTEGER  PRIMARY KEY AUTOINCREMENT  , title VARCHAR(200), notes VARCHAR(100), DateTime varchar(40) )',
              [],
            );
          }
        },
      );
    });
  },
  insertData(navigation, data: TableDataModel) {
    db.transaction(function (tn) {
      tn.executeSql(
        'insert into user_notes (notes,title,DateTime) values(?,?,?)',
        [data.notes, data.title,data.dateTime],
        // console.log('data'),

        (tn, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Insert Data Successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('ViewAllNotes'),
                },
              ],
              {cancelable: false},
            );
          }
        },
        () => {
          Alert.alert(
            'Error',
            '',
            [
              {
                text: 'Ok',
              },
            ],
            {cancelable: false},
          );
        },
      );
    });
  },
  displayAllNotes(getData) {
    db.transaction(function (ts) {
      ts.executeSql('select * from user_notes  ORDER BY  DateTime DESC', [], (ts, result) => {
        var temp = [];
        for (let i = 0; i < result.rows.length; ++i){
          temp.push(result.rows.item(i));
        }
        getData(temp);
      });
    });
  },
  selectNotes(id, getdata) {
    db.transaction(function (ts) {
      ts.executeSql(
        `select * from user_notes where user_id=${id}`,
        [],
        (ts, result) => {
          var temp = [];
          for (let i = 0; i < result.rows.length; ++i)
            temp.push(result.rows.item(i));
          getdata(temp);
        },
      );
    });
  },
  updateNotes(navigation, id, data: TableDataModel) {
    db.transaction(function (tn) {
      tn.executeSql(
        `update user_notes set title=?,notes=?,DateTime=?  where user_id=${id}`,
        [data.title, data.notes,data.dateTime],
        (tn, results) => {
          console.log('Results', results.rowsAffected);
           
          
           if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'User updated successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => 
                 navigation.navigate('ViewAllNotes'),
                  
                },
              ],
              {cancelable: false},
            );
          } else alert('Updation Failed');
        },
        () => {
          Alert.alert(
            'Error',
            'Class already exists',
            [
              {
                text: 'Ok',
                // onPress: () => props.navigation.navigate('ViewAllUser'),
              },
            ],
            {cancelable: false},
          );
        },
      );
    });
  },
  updateTable() {
    db.transaction(function (tn) {
      tn.executeSql(
        `ALTER TABLE user_notes
        ADD DateTime varchar(40);`,
        [],
        (tn, results) => {
          console.log('Results', results.rowsAffected);
           
          
           if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'User updated successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => 
                 navigation.navigate('ViewAllNotes'),
                  
                },
              ],
              {cancelable: false},
            );
          } else alert('Updation Failed');
        },
        () => {
          Alert.alert(
            'Error',
            'Class already exists',
            [
              {
                text: 'Ok',
                // onPress: () => props.navigation.navigate('ViewAllUser'),
              },
            ],
            {cancelable: false},
          );
        },
      );
    });
  },
  deleteNotes(id) {
    db.transaction(function (tx) {
      tx.executeSql(
        `delete from user_notes where user_id=${id}`,
        [],
        (tx, results) => {
          // console.log('delete');

          if (results.rowsAffected > 0) {
            Alert.alert(
              'Delete Data Success',
              'Deleted Data',
              [
                {
                  text: 'ok',
                  // onPress: () => data.navigation.navigate('ViewAllUser'),
                },
              ],
              {cancelable: false},
            );
          }
        },
      );
    });
  },
};
