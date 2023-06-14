import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import {Dropdown} from 'react-native-element-dropdown';
import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';


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
const AddForm: React.FC = () => {
  const [rollId, setRollId] = useState();
  const [name, setName] = useState();
  const [age, setAge] = useState();
  const [std, setStd] = useState(1);
  const [gender, setGender] = useState();
  var db = openDatabase({ name: 'UserDatabase.db' });

  const [radioButtons, setRadioButtons] =
    useState<RadioButtonProps[]>(radioButtonsData);

  function onPressRadioButton(radioButtonsArray: RadioButtonProps[]) {
    setRadioButtons(radioButtonsArray);
  }

  const DataBase = ()=>{
    
}
  
 
  return (
    <View style={styles.main}>
      <View style={{marginVertical: 20}}>
        <View style={styles.row}>
          <Text style={styles.label}>Roll Number: </Text>
          <TextInput
            value={rollId}
            onChangeText={setRollId}
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
          {/* <Dropdown
            style={styles.dropdown}
            // placeholderStyle={styles.placeholderStyle}
            // selectedTextStyle={styles.selectedTextStyle}
            // inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={Day}
            // search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Day"
            searchPlaceholder="Search..."
            value={Day}
            onChange={item => {
              setDay(item.value);
            }}
          />
          <Dropdown
            style={styles.dropdown}
            // placeholderStyle={styles.placeholderStyle}
            // selectedTextStyle={styles.selectedTextStyle}
            // inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={Std}
            // search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Month"
            searchPlaceholder="Search..."
            value={Std}
            onChange={item => {
              setMonth(item.value);
            }}
          /> */}
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
            iconStyle={styles.iconStyle}
            data={Std}
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
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Gender : </Text>
          <RadioGroup
            radioButtons={radioButtons}
            onPress={onPressRadioButton}
            layout="row"
          />
        </View>
      </View>

      <TouchableWithoutFeedback
        onPress={() => {
          DataBase;
        }}>
        <Text style={styles.button}>Submit</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};
const styles = StyleSheet.create({
  main: {
    flex: 1,
    marginVertical: 30,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
     alignItems: 'center',
    marginBottom: 10,
    height: 50,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    width: 110,
  },
  input: {
    backgroundColor: 'white',
    marginHorizontal: 5,
    paddingHorizontal: 20,
    height: 40,
    width: '70%',
  },
  button: {
    // backgroundColor: '#4CAF50',
    // width:100,
    height: 30,
    paddingHorizontal: 30,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 20,
  },
  dropdown: {
    marginLeft: 10,
    height: 50,
    width: 60,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
export default AddForm;
