import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import Mybutton from '../Form/Mybutton';
import {CompanyDataModel} from './model/CompanyDataModel';
import SqliteMethod from './sqlite/SqliteMethod';

const UpdateCompany: React.FC = props => {
  const [companyName, setCompanyName] = useState('');
  const [companyData, setCompanyData] = useState([]);
  const [companyid, setCompanyid] = useState(1);
  const companyTable = {
    tableName: 'Company_Details',
    // 'Company_Details'
  };

  useEffect(() => {
    SqliteMethod.selectTable(companyTable.tableName, setCompanyData);
  }, []);

  useEffect(() => {
    setCompanyName(companyid.company_name);
  }, [companyid]);

  // console.log('companyData',props );
  // console.log('changeData',changeData);

  const changeData: CompanyDataModel = {
    company_id: companyid.company_id,
    company_name: companyName,
  };

  const updateDatas = () => {
    if (!companyName) {
      alert('Please Select Company Name');
      return;
    }
    // console.log('changeData',changeData);
    SqliteMethod.updateCompanyData(props, changeData);
  };
// console.log('companyData',companyData);

  return (
    <>

      <View style={styles.main}>
        <Text style={styles.title}>Company Name</Text>
        <View style={styles.form}>
          <Text style={styles.label}>Select Company</Text>
          <Dropdown
            style={styles.dropdown}
            // data={datas.forEach((i)=>console.log(i.company_name))}
            // data={datas.forEach((i)=>(i.company_name))}
            data={companyData}
            maxHeight={300}
            labelField="company_name"
            valueField="company_name.to"
            // selectedValue={companyData.map((i)=>{i.company_id==companyId ?i.company_name:null})}
            // searchPlaceholder="Search..."
            value={companyData}
            // value={companyData}
            onChange={item => {
              console.log('item', item);
              setCompanyid(item);
            }}
          />
        </View>
        <View style={styles.form}>
          <Text style={styles.label}>Company Name</Text>

          <TextInput
            value={companyName}
            onChangeText={setCompanyName}
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
export default UpdateCompany;
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff',
    // paddingVertical: 30,
    paddingHorizontal: 20,
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
    // textTransform: 'capitalize',
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
