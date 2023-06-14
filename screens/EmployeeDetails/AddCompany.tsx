import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  TextInput,
  FlatList,
} from 'react-native';
import Mybutton from '../Form/Mybutton';
import {CompanyModel} from './model/CompanyModel';
import SqliteMethod from './sqlite/SqliteMethod';
import {Dropdown} from 'react-native-element-dropdown';
const AddCompany: React.FC = props => {
  const [companyName, setCompanyName] = useState('');
  const [data, getData] = useState([]);
  const [getName, setGetName] = useState('');

  const companyData: CompanyModel = {
    tableName: 'Company_details',
    companyName:companyName.toLowerCase(),
  };

  useEffect(() => {
    // SqliteMethod.createTable();
    // SqliteMethod.deleteData();
    // SqliteMethod.updateData()
    SqliteMethod.selectTable(companyData.tableName, getData);
    // data.forEach(i=>setGetName(i.company_name))
  }, []);

  // console.log(data);
  // console.log('data',data.map(i=>i.company_name));
// data.map(i=>console.log(i.company_name))

  const insertData = () => {
    if (!companyName) {
      alert('Please Enter company Name');
      return;
    }
    // data.map(i=>i.company_name==companyName)
    // else if(companyName==getName){
      // else if(data.map(i=>i.company_name==companyName)){
    //     else if(){
    //   alert('Company name already exists')
    //   return
    // }

    SqliteMethod.insertData(companyData);
    setCompanyName('')
  };

  return (
    <View style={styles.main}>
      <Text style={styles.title}>Add Company</Text>
      <View style={styles.form}>
        <Text>Comapany Name</Text>
        <TextInput
          value={companyName}
          onChangeText={setCompanyName}
          style={styles.input}
        />
      </View>
      <Mybutton title="Submit" customClick={insertData} />
      <View>
      <Dropdown
          style={styles.dropdown}
          // data={datas.forEach((i)=>console.log(i.company_name))}
          // data={datas.forEach((i)=>(i.company_name))}
          data={data}
          maxHeight={300}
          labelField="company_name"
          valueField="company_name"
          placeholder="Company Name"
          searchPlaceholder="Search..."
          // value={datas.forEach((i)=> i.company_Id)}
          value={companyData}
          onChange={item => {
            (item);
          }}
        />
      </View>
    </View>
  );
};
export default AddCompany;
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  form: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
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
  dropdown: {
    marginLeft: 45,
    height: 50,
    width: 150,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
});
