import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, FlatList, Image} from 'react-native';
import SqliteMethod from './sqlite/SqliteMethod';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {EmployeeDataModel} from './model/EmployeeDataModel';
import {CompanyDataModel} from './model/CompanyDataModel';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {MenuProvider} from 'react-native-popup-menu';

const ViewEmployee: React.FC = props => {
  const [dataPass, setdataPass] = useState();
  const [employeeData, setEmployeeData] = useState([]);
  const [companyData, setcompanyData] = useState([]);

  const employeeTable = {
    tableName: 'employee_detail',
  };
  const companyTable = {
    tableName: 'Company_Details',
  };

  useEffect(() => {
    SqliteMethod.selectTable(employeeTable.tableName, setEmployeeData);
    SqliteMethod.selectTable(companyTable.tableName, setcompanyData);
  }, [employeeData,companyData]);

  return (
    <>
      <View
        // style={styles.main}
        style={{
          flex: 1,
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 30,
        }}>
        <MenuProvider>
          <Text style={styles.title}>Employee Data</Text>
         
            <FlatList
              data={employeeData}
              renderItem={({item}: EmployeeDataModel) => (
                <View style={{paddingVertical: 20}}>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      // setShow(false);
                    }}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      // opacity: opacity,
                    }}>
                    <Text style={styles.label}> Name:</Text>
                    <Text style={styles.NameValue}>{item.employee_name} </Text>
                    <Text style={styles.label}>Company Name:</Text>
                    <Text style={styles.value}>
                      {companyData.map(
                        (i: CompanyDataModel) =>
                          i.company_id == item.company_reference &&
                          i.company_name,
                      )}
                    </Text>
                    {/*  <TouchableWithoutFeedback
                    style={{position: 'relative', backgroundColor: '#fff'}}
                    onPress={() => {
                      show ? setShow(false) : setShow(true);

                      setdataPass({
                        Emp_Id: item.emp_id,
                        // Company_Id: item.company_reference,
                      });
                    }}>
                    <Image
                      source={require('../../assets/Images/dots.png')}
                      style={{width: 20, height: 20}}
                    />
                  </TouchableWithoutFeedback> */}

                    <Menu>
                      <MenuTrigger
                        onPress={() => {
                          setdataPass({
                            Emp_Id: item.emp_id,
                          });
                        }}>
                        <Image
                          source={require('../../assets/Images/dots.png')}
                          style={{width: 20, height: 20}}
                        />
                      </MenuTrigger>
                      <MenuOptions
                        optionsContainerStyle={{
                          width: 60,
                          height: 60,
                          borderRadius: 10,
                        }}>
                        <MenuOption
                          onSelect={() => {
                            props.navigation.navigate(
                              'UpdateEmployeeData',
                              dataPass,
                            );
                          }}
                          // text="Edit"
                        >
                          <Text style={{width: 50}}>Edit</Text>
                        </MenuOption>
                        <MenuOption
                          onSelect={() => {
                            props.navigation.navigate(
                              'DeleteEmployee',
                              dataPass,
                            );
                          }}>
                          <Text style={{width: 50}}>Delete</Text>
                        </MenuOption>
                      </MenuOptions>
                    </Menu>
                  </TouchableWithoutFeedback>
                </View>
              )}
            />
        </MenuProvider>
      </View>
    </>
  );
};
export default ViewEmployee;
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
  },
  title: {
    paddingVertical: 20,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  NameValue: {
    paddingHorizontal: 5,
    width: 60,
  },
  value: {
    paddingHorizontal: 5,
    width: 70,
    textTransform: 'capitalize',
  },
});
