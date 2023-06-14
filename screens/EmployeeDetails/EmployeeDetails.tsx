import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import Mybutton from '../Form/Mybutton';
import {EmployeeModel} from './model/EmployeeModel';
import SqliteMethod from './sqlite/SqliteMethod';
import RadioForm from 'react-native-simple-radio-button';
import {AddFieldModel} from './model/AddFieldModel';
const EmployeeDetails: React.FC = props => {
  const [employeeName, setEmployeeName] = useState('');
  const [employeeAge, setEmployeeAge] = useState('');
  const [companyData, setCompanyData] = useState([]);
  const [companyId, setCompanyId] = useState(0);
  const [gender, setGender] = useState('male');
  const [mobileNum, setMobileNum] = useState('');

  const dataGet: EmployeeModel = {
    companyId: companyId,
    employeeName,
    tableName: 'employee_detail',
    age: parseInt(employeeAge),
    gender,
    mobileNum: parseInt(mobileNum),
  };
  const employeeTable = {
    tableName: 'Company_Details',
    // 'Company_Details'
  };

  const radionData = [
    {label: 'male ', value: 'male'},
    {label: 'female', value: 'female'},
  ];

  const fieldName: AddFieldModel = {
    addFieldName: 'mobile_no',
    tableName: 'employee_detail',
  };

  useEffect(() => {
    SqliteMethod.employeeTable();
    // SqliteMethod.addField(fieldName);
    SqliteMethod.selectTable(employeeTable.tableName, setCompanyData);
  }, []);

  // console.log(companyData);
  // console.log('companyId', companyId);

  const insertData = () => {
    if (!companyId) {
      alert('Please Select Company Name');
      return;
    } else if (!employeeName) {
      alert('Please Enter Employee Name');
      return;
    } else if (!employeeAge) {
      alert('Please Enter Employee Age');
      return;
    }
    SqliteMethod.insertEmployee(props, dataGet);
    setEmployeeAge('');
    setEmployeeName('');
    setCompanyId(0);
    setMobileNum('');
  };

  return (
    <View style={styles.main}>
      <Text style={styles.title}>Employee Details</Text>
      <View style={styles.form}>
        <Text style={styles.label}>Select Company</Text>
        <Dropdown
          style={styles.dropdown}
          // data={datas.forEach((i)=>console.log(i.company_name))}
          // data={datas.forEach((i)=>(i.company_name))}
          data={companyData}
          maxHeight={300}
          labelField="company_name"
          valueField="company_name"
          placeholder="Company Name"
          searchPlaceholder="Search..."
          // value={datas.forEach((i)=> i.company_Id)}
          value={companyData}
          onChange={item => {
            setCompanyId(item.company_id);
          }}
        />
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>Employee Name</Text>
        <TextInput
          value={employeeName}
          onChangeText={setEmployeeName}
          style={styles.input}
        />
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>Age</Text>
        <TextInput
          value={employeeAge}
          onChangeText={setEmployeeAge}
          keyboardType="number-pad"
          style={styles.input}
        />
      </View>
      <View style={styles.form}>
        <Text style={{width: 200, fontSize: 15, fontWeight: 'bold'}}>
          Gender
        </Text>
        <RadioForm
          radio_props={radionData}
          initial={0}
          formHorizontal={true}
          buttonSize={10}
          // style={{marginLeft:50}}
          onPress={(e: any) => {
            setGender(e);
          }}
        />
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>Mobile Number</Text>
        <TextInput
          value={mobileNum}
          onChangeText={setMobileNum}
          keyboardType="number-pad"
          style={styles.input}
        />
      </View>
      <Mybutton title="Submit" customClick={insertData} />
    </View>
  );
};
export default EmployeeDetails;
const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    padding: 40,
  },
  title: {fontSize: 20, fontWeight: 'bold', marginVertical: 20},
  dropdown: {
    marginLeft: 45,
    height: 50,
    width: 150,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  form: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 10,
    flexDirection: 'row',
  },
  input: {
    borderColor: 'blue',
    borderWidth: 0.5,
    marginHorizontal: 5,
    paddingHorizontal: 20,
    height: 40,
    width: '70%',
    borderRadius: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: 'bold',
    width: 150,
  },
});
