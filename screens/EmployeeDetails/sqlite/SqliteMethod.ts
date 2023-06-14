import {openDatabase} from 'react-native-sqlite-storage';
import {Alert} from 'react-native';
import {CompanyModel} from '../model/CompanyModel';
import {EmployeeModel} from '../model/EmployeeModel';
import {CompanyDataModel} from '../model/CompanyDataModel';
import {EmployeeData} from '../model/EmployeeDataModel';
const db = openDatabase({name: 'UserDatabase.db'});
export default {
  createTable() {
    db.transaction(function (ts) {
      ts.executeSql(
        'CREATE TABLE Company_details(company_id INTEGER PRIMARY KEY AUTOINCREMENT, company_name VARCHAR(30) NOT NULL UNIQUE )',
        [],
      );
    });
  },
  employeeTable() {
    db.transaction(function (tx) {
      tx.executeSql(
        'CREATE TABLE employee_detail(emp_id INTEGER  PRIMARY KEY AUTOINCREMENT ,employee_name VARCHAR(30), age integer,gender varchar(20), company_reference INTEGER REFERENCES Company_details(company_id))',
        [],
      );
    });
  },
  addField(data) {
    db.transaction(function (tx) {
      tx.executeSql(
        `ALTER TABLE ${data.tableName} add ${data.addFieldName}`,
        [],
        // tx.executeSql(`DROP TABLE Company_details`, [],
      );
    });
  },
  insertData(data: CompanyModel) {
    db.transaction(function (tx) {
      tx.executeSql(
        `insert into ${data.tableName} (company_name) values(?)`,
        [data.companyName],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'You are Registered Successfully',
              [
                {
                  text: 'Ok',
                  // onPress: () => props.navigation.navigate('AddCompany'),
                },
              ],
              {cancelable: false},
            );
          }
        },
        () => {
          Alert.alert(
            'Error',
            'Company name already exists',
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
  insertEmployee(props, data: EmployeeModel) {
    db.transaction(function (tx) {
      tx.executeSql(
        `insert into ${data.tableName} (employee_name,company_reference,age,gender,mobile_no) values(?,?,?,?,?)`,
        [
          data.employeeName,
          data.companyId,
          data.age,
          data.gender,
          data.mobileNum,
        ],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'You are Registered Successfully',
              [
                {
                  text: 'Ok',
                  // onPress: () => props.navigation.navigate('AddCompany'),
                },
              ],
              {cancelable: false},
            );
          }
        },
        () => {
          Alert.alert(
            'Error',
            ' name already exists',
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
  selectTable(tableName, dataGet) {
    db.transaction(tx => {
      tx.executeSql(`SELECT * FROM ${tableName}`, [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        dataGet(temp);
      });
    });
  },
  selectEmployee( data, dataGet) {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM employee_detail where emp_id=${data.Emp_Id}`,
        [],
        (tx, results) => {
          
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
          dataGet(temp);
          console.log(temp);
        },
      );
    });
  },
  deleteData(props) {
    // console.log(props);
    db.transaction(tx => {
      tx.executeSql(
        `DELETE FROM  employee_detail where emp_id=${props.route.params.Emp_Id}`,
        [],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'User updated successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => props.navigation.navigate('ViewEmployee'),
                },
              ],
              {cancelable: false},
            );
          } else {
            alert('Please insert a valid User Id');
          }
        },
      );
    });
  },
  updateCompanyData(props, data: CompanyDataModel) {
    db.transaction(ts => {
      ts.executeSql(
        'UPDATE Company_details SET company_name=? WHERE  company_id=? ',
        [data.company_name, data.company_id],

        (ts, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'User Update successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => props.navigation.navigate('ViewEmployee'),
                },
              ],
              {cancelable: false},
            );
          } else {
            alert('Please insert a valid User Id');
          }
        },
      );
    });
  },
  updateData(props, data: EmployeeModel) {
    db.transaction(ts => {
      ts.executeSql(
        'UPDATE employee_detail SET employee_name=?,age=?,gender=?,mobile_no=?,company_reference=?  WHERE  emp_id=? ',
        [
          data.employeeName,
          data.age,
          data.gender,
          data.mobileNum,
          data.companyId,
          props.route.params.Emp_Id,
        ],

        (ts, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'User Update successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => props.navigation.navigate('ViewEmployee'),
                },
              ],
              {cancelable: false},
            );
          } else {
            alert('Please insert a valid User Id');
          }
        },
      );
    });
  },
};
