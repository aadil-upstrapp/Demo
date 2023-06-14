import {openDatabase} from 'react-native-sqlite-storage';
import {Alert} from 'react-native';
import {GetAllData, PassDataModel} from '../model/PassDataModel';
import {DisplayDataList} from '../model/DisplayDataModel';
const db = openDatabase({name: 'UserDatabase.db'});
export default {
  openDataBase() {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='register_form'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS register_form', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS register_form(roll_no INT(4)  , user_name VARCHAR(20), age INT(4), class INT(4), gender VARCHAR(10),PRIMARY KEY (roll_no, class) )',
              [],
            );
          }
        },
      );
    });
  },
  inserData(data: PassDataModel, props) {
    db.transaction(function (tx: any) {
      // console.log('insert line 1 ',data)
      tx.executeSql(
        `INSERT INTO ${data.tableName} (roll_no, user_name, age,class,gender) VALUES (?,?,?,?,?)`,
        [
          data.rollNum,
          data.userName,
          data.userAge,
          data.userClass,
          data.userGender,
        ],
        // console.log('data.roll_no, data.user_name, data.age, data.class, data.gender',data.roll_no, data.user_name, data.age, data.class, data.gender),

        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'You are Registered Successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => props.navigation.navigate('ViewAllUser'),
                },
              ],
              {cancelable: false},
            );
          }
        },
        () => {
          Alert.alert(
            'Error',
            'Roll Number already exists',
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
  displayAllUser(dataGet) {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM register_form where class IS Not NULL  order By roll_no,class ',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
          }
          dataGet(temp);
        },
      );
    });
  },
  selectUser(data: DisplayDataList, getData: object) {
    db.transaction(tx => {
      // console.log('data',data),

      tx.executeSql(
        `SELECT * FROM register_form where class=${data.class} And roll_no=${data.roll_no}`,
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          getData(temp);
        },
      );
    });
  },
  deleteData(data: any) {
    // console.log(data.route.params);

    db.transaction(tx => {
      tx.executeSql(
        `delete from register_form where class=${data.route.params.class} And roll_no=${data.route.params.roll_no} `,
        [],
        (tx, results) => {
          // console.log('delete');

          if (results.rowsAffected > 0) {
            Alert.alert(
              'Delete Data Success',
              'Deleted Data',
              [
                {
                  text: 'Ok',
                  onPress: () => data.navigation.navigate('ViewAllUser'),
                },
              ],
              {cancelable: false},
            );
          }
        },
      );
    });
  },

  updateData(props, changeData: DisplayDataList) {
    // console.log('changeData',changeData),
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE register_form SET user_name=?, age=?,class=? , gender=? WHERE class=? And roll_no=?',
        // 'UPDATE register_form SET class=?,user_name=?, age=? , gender=? WHERE roll_no=? Ans class=? ',
        [
          changeData.user_name,
          changeData.age,
          changeData.class,
          changeData.gender,
          props.route.params.class,
          changeData.roll_no,
        ],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'User updated successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => props.navigation.navigate('ViewAllUser'),
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
};

/* const SqlityMethod = (PassedComponent: any) => memo((props: any) => {
  const insertData= db.transaction(function (tx:any) {
    tx.executeSql(
      'INSERT INTO register_form (roll_no, user_name, age,class,gender) VALUES (?,?,?,?,?)',
      [rollNum, name, age, std, gender],
      (tx, results) => {
        console.log('Results', results.rowsAffected);
        if (results.rowsAffected > 0) {
          Alert.alert(
            'Success',
            'You are Registered Successfully',
            [
              {
                text: 'Ok',
                // onPress: () => navigation.navigate('HomeScreen'),
              },
            ],
            {cancelable: false},
          );
        } else alert('Registration Failed');
      },
    );
  })
  const baseProps={dataBase}
  // console.log('props',props);
  
    return <PassedComponent {...props} {...baseProps} />
    
   
})
export default SqlityMethod */
