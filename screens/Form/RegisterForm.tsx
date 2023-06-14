import React, {useState} from 'react';
import {View, SafeAreaView, Text, TextInput, StyleSheet} from 'react-native';
import Mybutton from './Mybutton';
// import RadioGroup from 'react-native-radio-buttons-group';
import {Dropdown} from 'react-native-element-dropdown';
import SqliteMethod from './sqlite/SqliteMethod';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import Select from "react-select-native";
import { PassDataModel } from './model/PassDataModel';

// var db = openDatabase({name: 'UserDatabase.db'});
const radioButtonsData: RadioButtonProps[] = [
  {
    id: '1', // acts as primary key, should be unique and non-empty string
    label: 'Male',
    value: 'Male',
  },
  {
    id: '2',
    label: 'Female',
    value: 'Female',
  },
];
const RegisterForm: React.FC = (props) => {
  const [rollNum, setRollNum] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [std, setStd] = useState('');
  const [gender, setGender] = useState('male');
  // const [radioButtons, setRadioButtons] =
  //   useState<RadioButtonProps[]>(radioButtonsData);

  const Std = [
    {label: '1', value: '1'},
    {label: '2', value: '2'},
    {label: '3', value: '3'},
    {label: '4', value: '4'},
    {label: '5', value: '5'},
    {label: '6', value: '6'},
    {label: '7', value: '7'},
    {label: '8', value: '8'},
    {label: '9', value: '9'},
    {label: '10', value: '10'},
    {label: '11', value: '11'},
    {label: '12', value: '12'},
  ];
  const data:PassDataModel = {
    tableName:'register_form',
    rollNum: parseInt(rollNum),
    userName: name,
    userAge:parseInt(age),
    userGender: gender,
    userClass: parseInt(std),
  };
  // console.log(typeof(rollNum),data);
  
  const registerUser = () => {
    if (!rollNum) {
      alert('Please fill roll number');
      return;
    }
    if (!name) {
      alert('Please fill name');
      return;
    }
    if (!age) {
      alert('Please fill age');
      return;
    }
    if (!std) {
      alert('Please select class');
      return;
    }
    if (!gender) {
      alert('Please select gender');
      return;
    }
    SqliteMethod.inserData(data,props);
  };

  /* function onPressRadioButton(radioButtonsArray: RadioButtonProps[]) {
    // console.log(
    //   'radioButtonsArray',
    //   (radioButtons[0].selected && radioButtons[0].value) ||
    //     (radioButtons[1].selected && radioButtons[1].value),
    // );
    //   console.log('radioButtonsArray',radioButtons[1].selected&&radioButtons[1]);
    setGender(
      (radioButtons[0].selected && radioButtons[0].value) ||
        (radioButtons[1].selected && radioButtons[1].value),
    );
    setRadioButtons(radioButtonsArray);
    console.log(gender);
  } */

  var radionData = [
    {label:'male ' , value:'male' },
    {label:'fe-male', value:'female'},
  ];

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 50,
      }}>
      <Text style={{fontSize: 20, fontWeight: 'bold'}}>Register Form</Text>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          paddingHorizontal: 20,
          paddingVertical: 50,
        }}>
        <View style={styles.row}>
          <Text style={styles.label}>Roll Number: </Text>
          <TextInput
            value={rollNum}
            onChangeText={setRollNum}
            style={styles.input}
            keyboardType="number-pad"
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Name : </Text>
          <TextInput value={name} onChangeText={setName} style={styles.input} />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Age : </Text>
          <TextInput
            value={age}
            onChangeText={setAge}
            style={styles.input}
            keyboardType="number-pad"
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Class :</Text>
          
          <Dropdown
            style={styles.dropdown}
            // placeholderStyle={styles.placeholderStyle}
            // selectedTextStyle={styles.selectedTextStyle}
            // inputSearchStyle={styles.inputSearchStyle}
            // iconStyle={styles.iconStyle}
            data={Std}
            // search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Class"
            searchPlaceholder="Search..."
            value={std}
            onChange={item => {
              setStd(item.value);
            }}
          />
         {/*   <Select
        options={Std}
        // onChange={(e) =>{setStd(e)}}
        unselected={{
          value: "empty",
          label: "pls select"
        }}
        value={std}
        defaultValue={Std[0].value}
      /> */}
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Gender : </Text>
          <RadioForm
            radio_props={radionData}
            initial={0}
            formHorizontal={true}
            buttonSize={10}
            
            // style={{fontSize:10}}
            onPress={(e: any) => {
              setGender(e);
            }}
          />
        </View>
        <Mybutton title="Submit" customClick={registerUser} />
      
     
      
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  dropdown: {
    marginLeft: 10,
    height: 50,
    width: 60,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  row: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    height: 50,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    width: 70,
  },
  input: {
    borderColor: 'blue',
    borderWidth: 0.5,
    marginHorizontal: 5,
    paddingHorizontal: 20,
    height: 40,
    width: '70%',
  },
});
export default RegisterForm;
