// import {openDatabase} from 'react-native-sqlite-storage';
// import {Alert} from 'react-native';
// import {UserModel} from './Model/UserModel';
// import {CustomerModel} from './Model/CustomerModel';
// import {TransactionModel} from './Model/TransactionModel';
// import {
//   COLUMN_AMOUNT,
//   COLUMN_EMAIL,
//   TABLE_KHATABOOK,
//   COLUMN_PASSWORD,
//   COLUMN_PHONE_NUMBER,
//   COLUMN_RECEIVE_ID,
//   COLUMN_RECEIVE_PHONE_NUMBER,
//   COLUMN_SENDER_ID,
//   TABLE_TRANSACTION,
//   COLUMN_USER_ID,
//   COLUMN_USER_NAME,
//   COLUMN_CURRENT_BALANCE,
//   COLUMN_PHONENUMBER,
//   TABLE_CUSTOMER,
//   COLUMN_MONEY,
// } from './Constants/Constants';
// const db = openDatabase({name: 'UserDatabase.db'});
// // export const TABLE_PERSOMN='tbl_person'
// // e COLUMN_ID = 'ID'
// export default {
//   createUser() {
//     db.transaction(function (txn) {
//       txn.executeSql(
//         "SELECT name FROM sqlite_master WHERE type='table' AND name='khatabook_user'",
//         [],
//         function (tx, res) {
//           console.log('item:', res.rows.length);
//           if (res.rows.length == 0) {
//             tx.executeSql('DROP TABLE IF EXISTS khatabook_user', []);
//             tx.executeSql(
//               'CREATE TABLE khatabook_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(30) ,phone_number INTEGER(10) ,profile VARCHAR(30),password VARCHAR(10),email VARCHAR(30) ,account_details VARCHAR(100))',
//               [],
//             );
//           }
//         },
//       );
//     });
//   },
//     createCustomers() {
//     db.transaction(function (txn) {
//       txn.executeSql(
//         "SELECT name FROM sqlite_master WHERE type='table' AND name='customer'",
//         [],
//         function (tx, res) {
//           console.log('item:', res.rows.length);
//           if (res.rows.length == 0) {
//             tx.executeSql('DROP TABLE IF EXISTS customer', []);
//             tx.executeSql(
//               'create table customer (cutomer_id INTEGER PRIMARY KEY AUTOINCREMENT,user_name VARCHAR(30) ,phoneNumber INTEGER(15),current_balance INTEGER(30),sender_id  INTEGER REFERENCES registration_form(user_id)) ',
        
//               [],
//             );
//           }
//         },
//       );
//     });
//     /*  db.transaction(function (ts) {
//       ts.executeSql(
//         'create table customer (cutomer_id INTEGER PRIMARY KEY AUTOINCREMENT,user_name VARCHAR(30) ,phoneNumber INTEGER(15),profile VARCHAR(30),sender_id  INTEGER REFERENCES registration_form(user_id)) ',
//               'CREATE TABLE customer (cutomer_id INTEGER PRIMARY KEY AUTOINCREMENT,user_name VARCHAR(30) ,phoneNumber INTEGER(15)  ,profile VARCHAR(30),sender_id  INTEGER REFERENCES registration_form(user_id) )',
        
//         [],
//       );
//     }); */
//   },
//   createTransactionTable() {
//     db.transaction(function (txn) {
//       txn.executeSql(
//         "SELECT name FROM sqlite_master WHERE type='table' AND name='transaction_table'",
//         [],
//         function (tx, res) {
//           console.log('item:', res.rows.length);
//           if (res.rows.length == 0) {
//             tx.executeSql('DROP TABLE IF EXISTS transaction_table', []);
//             tx.executeSql(
//               `CREATE TABLE ${TABLE_TRANSACTION} (id INTEGER PRIMARY KEY AUTOINCREMENT,${COLUMN_RECEIVE_ID} INTEGER NOT NULL,${COLUMN_AMOUNT} INTEGER,typeof VARCHAR(30) ,user_name VARCHAR(30) ,receive_PhoneNumber INTEGER(15) NOT NULL ,profile VARCHAR(30),date VARCHAR(30),time VARCHAR(30),${COLUMN_SENDER_ID} INTEGER REFERENCES registration_form(${COLUMN_USER_ID}))`,
//               [],
//             );
//           }
//         },
//       );
//     });
//   },
//   insertTransactionTable(navigation, data: TransactionModel) {
//     // data,time
// //  console.log(data);
 
//       db.transaction(function (tn) {
//         tn.executeSql(
//           `insert into ${TABLE_TRANSACTION} (${COLUMN_SENDER_ID},${COLUMN_RECEIVE_ID},${COLUMN_AMOUNT},${COLUMN_RECEIVE_PHONE_NUMBER},${COLUMN_CURRENT_BALANCE}) Values(?,?,?,?,?)`,
//           [
//             data.sender_id,data.receive_id,data.amount,data.receive_phoneNumber, data.current_bal
//           ],
//           // console.log('result',tn),

//           /* (tn, results) => {
//             console.log('Results', results.rowsAffected);
//             if (results.rowsAffected > 0) {
//               Alert.alert(
//                 'Success',
//                 'Successfully',
//                 [
//                   {
//                     text: 'Ok',
//                     onPress: () => navigation.goBack(),
//                   },
//                 ],
//                 {cancelable: false},
//               );
//             }
//           },
//           () => {
//             Alert.alert(
//               'Error',
//               'email or phone number already exists',
//               [
//                 {
//                   text: 'Ok',
//                 },
//               ],
//               {cancelable: false},
//             );
//           }, */
//         );
//       });
//   },
//   updateData(navigation, data) {
//     // console.log(data)
    
//     db.transaction(function (tn) {
//       tn.executeSql(
//         // `update ${TABLE_KHATABOOK} set current_balance=${data.current_bal}  where ${COLUMN_USER_ID}=${data.sender_id}`,
//         `update ${TABLE_CUSTOMER} set money=${data.current_bal}  where cutomer_id=${data.sender_id}`,
//         [],
//         (tn, results) => {
//           console.log('Results', results.rowsAffected);
//            if (results.rowsAffected > 0) {
//             Alert.alert(
//               'Success',
//               'Successfully',
//               [
//                 {
//                   text: 'Ok',
//                   onPress: () => navigation.goBack(),
//                 },
//               ],
//               {cancelable: false},
//             );
//           } else alert('Updation Failed');
//         },
//         () => {
//           Alert.alert(
//             'Error',
//             'Class already exists',
//             [
//               {
//                 text: 'Ok',
//                 // onPress: () => props.navigation.navigate('ViewAllUser'),
//               },
//             ],
//             {cancelable: false},
//           );
//         },
//       );
//     });
//   },


//   /*  checkTableEXISTS() {
//     db.transaction(function (txn) {
//       txn.executeSql(
//         "SELECT name FROM sqlite_master WHERE type='table' AND name='customer'",
//         [],
//         function (tx, res) {
//           console.log('item:', res.rows.length);
//         },
//       );
//     });
//   }, */
//   insertData(data: UserModel, navigation) {
//     db.transaction(function (ts) {
//       ts.executeSql(
//         `insert into ${TABLE_KHATABOOK} (${COLUMN_USER_NAME},${COLUMN_CURRENT_BALANCE}) Values (?,?)`,
//         [data.username,data.current_bal],
        
//         (ts, results) => {
//           console.log('Results', results.rowsAffected);
//            // `insert into ${TABLE_KHATABOOK} (${COLUMN_USER_NAME},${COLUMN_EMAIL},${COLUMN_PHONE_NUMBER},${COLUMN_PASSWORD},${COLUMN_CURRENT_BALANCE}) Values (?,?,?,?,?)`// [data.username, data.email, data.phoneNum, data.password,data.current_bal],
       
//           if (results.rowsAffected > 0) {
//             Alert.alert(
//               'Success',
//               'You are Registered Successfully',
//               [
//                 {
//                   text: 'Ok',
//                   // onPress: () => props.navigation.navigate('Login'),
//                 },
//               ],
//               {cancelable: false},
//             );
//           }
//         },
//         () => {
//           Alert.alert(
//             'Error',
//             'email or phone number already exists',
//             [
//               {
//                 text: 'Ok',
//               },
//             ],
//             {cancelable: false},
//           );
//         },
//       );
//     });
//   },
//    insertCustomer(data: CustomerModel, navigation) {
//     // console.log(data);
    
//     db.transaction(function (ts) {
//       ts.executeSql(
//         `insert into ${TABLE_CUSTOMER} (${COLUMN_USER_NAME},${COLUMN_PHONENUMBER},${COLUMN_MONEY},${COLUMN_SENDER_ID}) Values (?,?,?,?)`,
//         [data.username, data.phoneNum,data.current_bal, data.SenderId],
//         (tx, results) => {
//           console.log('Results', results.rowsAffected);
//           if (results.rowsAffected > 0) {
//             navigation.goBack();
//           }
//         },
//       );
//     });
//   },
//   /*  select(data, AmountGet) {
//     // ORDER BY id DESC
//     // console.log(data);
//     db.transaction(function (ts) {
//       // ts.executeSql(`select * from ${data.tableName} where receive_id=${data.receiveId} mansuriaadil265@gmail.com`, [], (ts, results) => {
//       ts.executeSql(
//         `select * from ${data.tableName} where ${COLUMN_RECEIVE_ID}=${data.receiveId} or ${COLUMN_SENDER_ID}=${data.receiveId}  `,
//         [],
//         (ts, results) => {
//           // ts.executeSql(`select * from ${data.tableName} where sender_id=3 or receive_id=3 `, [], (ts, results) => {
//           var temp = [];
//           for (let i = 0; i < results.rows.length; ++i) {
//             temp.push(results.rows.item(i));
//           }
//           AmountGet(temp);
//         },
//       );
//     });
//   }, */
//   selectLastData(data, AmountGet) {
//     // ORDER BY id DESC
//     // console.log(data);
//     db.transaction(function (ts) {
//       // ts.executeSql(`select * from ${data.tableName} where receive_id=${data.receiveId} mansuriaadil265@gmail.com`, [], (ts, results) => {
//       ts.executeSql(
//         `select * from ${data.tableName} where (${data.COLUMN_SENDER_ID}=${data.receiveId} or ${data.COLUMN_RECEIVE_ID}=${data.receiveId}) ORDER BY id DESC `,
//         [],
//         (ts, results) => {
//           // ts.executeSql(`select * from ${data.tableName} where sender_id=3 or receive_id=3 `, [], (ts, results) => {
//           var temp = [];
//           for (let i = 0; i < results.rows.length; ++i) {
//             temp.push(results.rows.item(i));
//           }
//           AmountGet(temp);
//         },
//       );
//     });
//   },
//   selectAllData(data, TransactionData) {
//     // ORDER BY id DESC
//     // console.log(data);
//     db.transaction(function (ts) {
//       // ts.executeSql(`select * from ${data.tableName} where receive_id=${data.receiveId} mansuriaadil265@gmail.com`, [], (ts, results) => {ORDER BY id  DESC
//       ts.executeSql(
//         `select * from ${TABLE_TRANSACTION} where (${COLUMN_RECEIVE_ID}=${data.senderId} or ${COLUMN_RECEIVE_ID}=${data.receiveId})  And (${COLUMN_SENDER_ID}=${data.senderId} or ${COLUMN_SENDER_ID}=${data.receiveId}) `,
//         // `select * from ${TABLE_TRANSACTION}  `,
//         [],
//         (ts, results) => {
//           // ts.executeSql(`select * from ${data.tableName} where sender_id=3 or receive_id=3 `, [], (ts, results) => {
//           var temp = [];
//           for (let i = 0; i < results.rows.length; ++i) {
//             temp.push(results.rows.item(i));
//           }
//           TransactionData(temp);
//         },
//       );
//     });
//   },
//   /*   receiveSelect(data,AmountGot) {
//     // ORDER BY id DESC
//     db.transaction(function (ts) {
//       // ts.executeSql(`select * from ${data.tableName} where receive_id=${data.receiveId} mansuriaadil265@gmail.com`, [], (ts, results) => {
//       ts.executeSql(`select * from ${data.tableName} where receive_id=${data.receiveId} `, [], (ts, results) => {
//         var temp = [];
//         for (let i = 0; i < results.rows.length; ++i) {
//           temp.push(results.rows.item(i));
//         }
//         AmountGot(temp);
//       });
//     });
//   }, */
//   deleteData() {
//     // console.log(data.route.params);

//     db.transaction(tx => {
//       tx.executeSql(
//         `delete from ${TABLE_TRANSACTION} where id=?`,
//         [],
//         (tx, results) => {
//           // console.log('delete');

//           if (results.rowsAffected > 0) {
//             Alert.alert(
//               'Delete Data Success',
//               'Deleted Data',
//               [
//                 {
//                   text: 'Ok',
//                   // onPress: () => data.navigation.navigate('ViewAllUser'),
//                 },
//               ],
//               {cancelable: false},
//             );
//           }
//         },
//       );
//     });
//   },
//   selectUser(data: UserModel, dataGet: object) {
//     db.transaction(function (ts) {
//       ts.executeSql(
//         `SELECT * FROM ${TABLE_KHATABOOK} where ${COLUMN_EMAIL}=? And ${COLUMN_PASSWORD}=?`,
//         [data.email, data.password],
//         (tx, results) => {
//           // console.log(results.rowsAffected);

//           var temp = [];
//           for (let i = 0; i < results.rows.length; ++i) {
//             temp.push(results.rows.item(i));
//           }
//           dataGet(temp);
//         },
//       );
//     });
//   },
//    selectCustomer(data, history: object) {
//     db.transaction(function (ts) {
//       ts.executeSql(
//         `SELECT * FROM ${TABLE_CUSTOMER} where ${COLUMN_SENDER_ID}=? order by cutomer_id desc `,
//         [data.senderId],
//         (ts, results) => {
//           var temp = [];
//           for (let i = 0; i < results.rows.length; ++i) {
//             temp.push(results.rows.item(i));
//           }
//           history(temp);
//         },
//       );
//     });
//   },
//   displayAllUser(UserId, dataGet) {
//     db.transaction(tx => {
//       tx.executeSql(
//         `SELECT * FROM ${TABLE_KHATABOOK} where ${COLUMN_USER_ID}!=? `,
//         // `SELECT * FROM ${TABLE_KHATABOOK}  `,
//         [UserId],
//         (tx, results) => {
//           var temp = [];
//           for (let i = 0; i < results.rows.length; ++i) {
//             temp.push(results.rows.item(i));
//           }
//           dataGet(temp);
//         },
//       );
//     });
//   },
//   // 'ALTER TABLE registration RENAME TO registration_form',
//   // 'DELETE FROM customer ',
//   // 'DROP TABLE customer ',
//   addField() {
//     db.transaction(function (ts) {
//       ts.executeSql(
//         // `ALTER TABLE ${TABLE_KHATABOOK} add current_balance`,
//         // `ALTER TABLE ${TABLE_CUSTOMER} DROP CONSTRAINT   ${COLUMN_PHONENUMBER}`,
//         // `delete from ${TABLE_TRANSACTION} where ${COLUMN_USER_ID}!=1 `,
//         [],
//         (ts, results) => {
//           console.log('delete', results.rowsAffected);

//           if (results.rowsAffected > 0) {
//             Alert.alert(
//               'Delete Data Success',
//               'Deleted Data',
//               [
//                 {
//                   text: 'Ok',
//                   // onPress: () => data.navigation.navigate('ViewAllUser'),
//                 },
//               ],
//               {cancelable: false},
//             );
//           }
//         },
//       );
//     });
//   },
//   /*  updateData() {
//     // console.log('changeData',changeData),
//     db.transaction(tx => {
//       tx.executeSql(
//         'UPDATE khatabook_user SET user_name="vasim" WHERE user_id=1',
//         [],
//       )})} */
// };
