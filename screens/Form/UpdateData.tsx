import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Mybutton from './Mybutton';
import SqliteMethod from './sqlite/SqliteMethod';
import {Dropdown} from 'react-native-element-dropdown';
import RadioForm from 'react-native-simple-radio-button';
import {PassDataModel} from './model/PassDataModel';
import {DisplayDataList} from './model/DisplayDataModel';

// const radioButtonsData: RadioButtonProps[] = [
//   {
//     id: '1', // acts as primary key, should be unique and non-empty string
//     label: 'Male',
//     value: 'Male',
//   },
//   {
//     id: '2',
//     label: 'Female',
//     value: 'Female',
//   },
// ];
const UpdateData: React.FC = props => {
  const [rollNum, setRollNum] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [std, setStd] = useState('');
  const [gender, setGender] = useState('');
  const [num, setNum] = useState();
  // const male="male";
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
  /*   function onPressRadioButton(radioButtonsArray: RadioButtonProps[]) {
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
    gender=='male'?radioButtons[0].selected:radioButtons[1].selected
    setRadioButtons(radioButtonsArray);
    console.log(gender);
  } */
  const radioData = [
    {label: 'male ', value: 'male'},
    {label: 'female', value: 'female'},
  ];

  // console.log(gender);

  useEffect(() => {
    // SqliteMethod.openDataBase();
    SqliteMethod.selectUser(props.route.params, (data: DisplayDataList[]) => {
      // console.log(props);
      if (data.length > 0) {
        setRollNum(data[0].roll_no.toString());
        setName(data[0].user_name);
        setNum(data[0].gender == 'male' ? 0 : 1);
        setAge(data[0].age.toString());
        setGender(data[0].gender);
        setStd(data[0].class.toString());
      } else {
        setNum(0);
      }
    });
  });
  // let selected=0
  // if(gender=='female') { selected=1}

  // const listItemView = item => {
  //   return (
  //     <View
  //       key={item.roll_no}
  //       style={{backgroundColor: 'white', padding: 20, position: 'relative'}}>
  //       <Text>Roll No: {setRollNum(item.roll_no.toString())}</Text>
  //       <Text>Name: {setName(item.user_name)}</Text>
  //       <Text>Age: {setAge(item.age.toString())}</Text>
  //       <Text>Class: {setStd(item.class.toString())}</Text>
  //       <Text>Gender: {setGender(item.gender)}</Text>
  //     </View>
  //   );
  // };
  const changeData: DisplayDataList = {
    roll_no: parseInt(rollNum),
    user_name: name,
    age: parseInt(age),
    gender: gender,
    class: parseInt(std),
  };
  const updateData = () => {
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
    /*  if (!std) {
      alert('Please select class');
      return;
    } */
    if (!gender) {
      alert('Please select gender');
      return;
    }
    // console.log(changeData);

    SqliteMethod.updateData(props, changeData);
  };

  return (
    <>
      {/* {name ? ( */}
      <View
        style={{
          backgroundColor: 'white',
          flex: 1,
          justifyContent: 'center',
          paddingHorizontal: 30,
        }}>
        {/* <View style={{alignItems:'center',paddingVertical:20}}>
          <Text style={{fontSize:30,}}>
            Upadate Data
          </Text>
        </View> */}
        <View style={styles.row}>
          <Text style={styles.label}>Roll Number: </Text>
          <TextInput
            value={rollNum}
            onChangeText={setRollNum}
            style={styles.input}
            // keyboardType="number-pad"
            editable={false}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Name : </Text>
          <TextInput
            value={name}
            onChangeText={name => setName(name)}
            style={styles.input}
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Age : </Text>
          <TextInput
            value={age}
            onChangeText={setAge}
            style={styles.input}
            // keyboardType="number-pad"
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
            // disable
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
          {/* <RadioGroup
              radioButtons={radioButtons}
              onPress={onPressRadioButton}
              layout="row"
              // containerStyle={{marginRight:80}}
            /> */}
          {/* {console.log('gender===?0:1',gender==='female'?1:0)}
              {console.log('gender',gender)} */}

          {num != undefined && (
            <RadioForm
              radio_props={radioData}
              initial={num}
              formHorizontal={true}
              buttonSize={10}
              // style={{fontSize:10}}
              onPress={(e: any) => {
                setGender(e);
              }}
            />
          )}
        </View>
        <Mybutton title="Submit" customClick={updateData} />
      </View>
      {/*   ) : (
        <ActivityIndicator
          size={'large'}
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        />
      )} */}
    </>
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
    // backgroundColor:'red'
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
export default UpdateData;
