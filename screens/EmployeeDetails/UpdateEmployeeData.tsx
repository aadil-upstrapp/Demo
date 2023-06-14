import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TextInput, FlatList, Image} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import Mybutton from '../Form/Mybutton';
import {EmployeeModel} from './model/EmployeeModel';
import SqliteMethod from './sqlite/SqliteMethod';
import RadioForm from 'react-native-simple-radio-button';
import {EmployeeData} from './model/EmployeeDataModel';

const UpdateEmployeeData: React.FC = ({route}) => {
  const [employeeName, setEmployeeName] = useState('');
  const [companyData, setCompanyData] = useState([]);
  const [companyid, setCompanyid] = useState(1);
  const [mobileNum, setMobileNum] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [num, setNum] = useState();

  const employeeTable = {
    tableName: 'employee_detail',
    // 'Company_Details'
  };
  const companyTable = {
    tableName: 'Company_Details',
    // 'Company_Details'
  };
  useEffect(() => {
    SqliteMethod.selectTable(companyTable.tableName, setCompanyData);
    
  }, []);
  useEffect(() => {
    SqliteMethod.selectEmployee(route.params, (data: EmployeeData[]) => {
      console.log('data', data);
      if (data.length > 0) {
        setCompanyid(data[0]?.company_reference);
        setEmployeeName(data[0].employee_name);
        setGender(data[0].gender);
        setMobileNum(data[0].mobile_no.toString());
        setAge(data[0].age.toString());
        // console.log('gender==="male" ? 0:1', gender == 'male' ? 0 : 1);
        setNum(data[0].gender == 'male' ? 0 : 1);
      } else {
        setNum(0);
      }
    });
  }, []);
  // console.log('companyData',props );

  const radionData = [
    {label: 'male ', value: 'male'},
    {label: 'female', value: 'female'},
  ];

  const changeData: EmployeeModel = {
    companyId: companyid,
    employeeName,
    gender,
    age: parseInt(age),
    mobileNum: parseInt(mobileNum),
    tableName: 'employee_detail',
  };
  // console.log('changeData',changeData);

  const updateDatas = () => {
    if (!employeeName) {
      alert('Please Select Company Name');
      return;
    } else if (!employeeName) {
      alert('Please Enter Employee Name');
      return;
    } else if (!age) {
      alert('Please Enter Employee Age');
      return;
    }
    // console.log('changeData',changeData);
    SqliteMethod.updateData(props, changeData);
  };

  // console.log('num', num);

  return (
    <>
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
            placeholder={companyData.map(
              i => i.company_id == companyid && i.company_name,
            )}
            // selectedValue={companyData.map((i)=>{i.company_id==companyId ?i.company_name:null})}
            // searchPlaceholder="Search..."
            value={companyData}
            // value={companyData}
            onChange={item => {
              // console.log('item', item);
              setCompanyid(item.company_id);
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
            value={age}
            onChangeText={setAge}
            keyboardType="number-pad"
            style={styles.input}
          />
        </View>
        <View style={styles.form}>
          <Text style={{width: 120, fontSize: 15, fontWeight: 'bold'}}>
            Gender
          </Text>
          {num != undefined && (
            <RadioForm
              radio_props={radionData}
              initial={num}
              style={{width: 100, marginRight: 120}}
              formHorizontal={true}
              buttonSize={10}
              // style={{marginLeft:50}}
              onPress={(e: any) => {
                setGender(e);
              }}
            />
          )}
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
        <View style={{alignItems: 'center', marginVertical: 20}}>
          <Mybutton title="Submit" customClick={updateDatas} />
        </View>
      </View>
    </>
  );
};
export default UpdateEmployeeData;
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff',
    // paddingVertical: 30,
    // paddingHorizontal:20
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  form: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 10,
    flexDirection: 'row',
  },
  dropdown: {
    marginRight: 70,
    height: 50,
    width: 150,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
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
    width: 120,
  },
  title: {
    paddingVertical: 20,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  /*   label: {
    fontSize: 14,
    fontWeight: 'bold',
    // paddingHorizontal: 5,
  }, */
  NameValue: {
    paddingHorizontal: 5,
    width: 60,
  },
  value: {
    paddingHorizontal: 5,
    width: 70,
  },
});
