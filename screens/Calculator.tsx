import _ from 'lodash';
import React, { useEffect,useState } from 'react';
import {Text, View, StyleSheet,Image, StatusBar} from 'react-native';
import {FlatList, TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Colors from './constants/Colors';
import Fonts from './constants/Fonts';
import ResponsivePixels from './constants/ResponsivePixels';
import {   COLUMN_FIRST_NUMBER, COLUMN_OPERATION, COLUMN_RESULT, COLUMN_SECOUND_NUMBER, TABLE_CALCULATOR_HISTORY } from './KhataBook/Sqlite/SqliteConstants';
import { SqliteUtils } from './KhataBook/Sqlite/SqliteUtils';

const Calculator: React.FC = ({ navigation }) => {
  const [number, setNumber] = useState('');
  const [secoundNumber, setSecoundNumber] = useState('');
  const [operations, setOperations] = useState('');
  const [result, setResult] = useState('');
  // const [calculatorHistory,setCalculatorHistory]=useState([])

  const btnClick = i => {
 /*    if(i=='%'){
      if(secoundNumber==''){
        setNumber(number/100)
        console.log(number/100);
        
      }
      else{
        setSecoundNumber((parseFloat(number)* parseFloat(secoundNumber))/100)
      }
   } */
    operations ? setSecoundNumber(secoundNumber.toString() + i) : setNumber(number.toString() + i);
  };
  
  
  useEffect(()=>{ calculation()},[number,secoundNumber,operations])
/*   const DisplayHistory=async()=>{
    const data= await SqliteUtils.select({tableName:TABLE_CALCULATOR_HISTORY})
    if(data[0].rows.length>0){
      var temp=[]
      for(let i=0;i<data[0].rows.length;++i){
        temp.push(data[0].rows.item(i))
      }
    }
    setCalculatorHistory(temp)
  } */

  const calculation = () => {
    if (operations == '+') {
      setResult(parseFloat(number) + parseFloat(secoundNumber));
    } else if (operations == '-') {
      setResult(parseFloat(number) - parseFloat(secoundNumber));
    } else if (operations == '×') {
      setResult(parseFloat( number) * parseFloat(secoundNumber));
    } else if (operations == '÷') {
      setResult(parseFloat( number) / parseFloat(secoundNumber));
    }
  };
 
  const clearBtn = () => {
    if(_.isEmpty(number)){
      SqliteUtils.delete({tableName:TABLE_CALCULATOR_HISTORY})
      // setCalculatorHistory([])
    }
    setNumber('');
    setSecoundNumber('');
    setOperations('');
    setResult('');

  };
  const clear = () => {
    setNumber('');
    setSecoundNumber('');
    setOperations('');
   setResult('')
  };

  return (
    <>
    <StatusBar
    backgroundColor={Colors.white}
    barStyle='dark-content'
    />
      <View
        style={{flex: 1, position: 'relative', backgroundColor: Colors.white}}>
        <TouchableWithoutFeedback
          style={{
            height: ResponsivePixels._40,
            width: ResponsivePixels._40,
            margin: ResponsivePixels._10,
          }}
          onPress={() => {
           navigation.goBack();
          }}>
          <Image
            source={require('../assets/Images/ic_arrow_back.png')}
            style={{
              width: ResponsivePixels._40,
              height: ResponsivePixels._40,
              tintColor: Colors.buttonColor,
              marginRight: ResponsivePixels._5,
            }}
          />
        </TouchableWithoutFeedback>
        
        <TouchableWithoutFeedback style={{alignItems:'center',justifyContent:'center',height:ResponsivePixels._50}}onPress={()=>{navigation.navigate('DemoCalculator')}}>
        <Text>Multiple operations</Text>

          </TouchableWithoutFeedback>
        {/* {calculatorHistory?.length>0?
        <FlatList
          data={calculatorHistory}
          scrollEnabled={true}
          style={{
            maxHeight: ResponsivePixels._300,
            // paddingVertical: ResponsivePixels._10,
          }}
          renderItem={({item}) => (
            <TouchableWithoutFeedback
              onPress={() => {
                item[COLUMN_RESULT] == 0
                  ? operations? setSecoundNumber(secoundNumber+item[COLUMN_FIRST_NUMBER].toString()): setNumber(number+ item[COLUMN_FIRST_NUMBER].toString())
                  : operations? setSecoundNumber(secoundNumber+ item[COLUMN_RESULT].toString()): setNumber(number+ item[COLUMN_RESULT].toString());
              }}
              style={{
                flexWrap: 'wrap-reverse',
                paddingHorizontal: ResponsivePixels._30,
                alignItems: 'flex-start',
                paddingVertical: ResponsivePixels._10,
              }}>
              <Text
                style={
                  styles.numberStyle
                }>{`${item[COLUMN_FIRST_NUMBER]} ${item[COLUMN_OPERATION]} ${item[COLUMN_SECOUND_NUMBER]}`}</Text>
              <Text style={styles.numberStyle}>{`= ${
                item[COLUMN_OPERATION] == ''
                  ? item[COLUMN_FIRST_NUMBER]
                  : item[COLUMN_RESULT]
              }`}</Text>
            </TouchableWithoutFeedback>
          )}
        />
      :null} */}
        <View style={{position: 'absolute', bottom: 285, right: 0}}>
          <View
            style={{
              alignItems: 'flex-end',
              paddingVertical: ResponsivePixels._20,
              // paddingEnd: ResponsivePixels._20,
              // paddingStart:ResponsivePixels._20,
              height: ResponsivePixels._150,
            }}>
            {/*  {result ? (
          <Text
            style={styles.answerStyle}>{`${result} ${operations} ${secoundNumber} `}</Text>
        ) : (
          <Text
            style={styles.answerStyle}>{`${number} ${operations} ${secoundNumber} `}</Text>
        )} */}
            <Text style={styles.answerStyle}>
              {operations
                ? `${number} ${operations} ${secoundNumber}`
                : `${number}`}
            </Text>
            {/* {result? */}
            <Text
              style={styles.answerStyle}>{ result ? `= ${result}`: number? `= ${number}`:0}</Text>
              {/* style={styles.answerStyle}>{`= ${result}`}</Text> */}
            {/* :<Text></Text>} */}
          </View>
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: 10,
            flexWrap: 'wrap',
            width: '100%',
            justifyContent: 'center',
            // borderTopWidth: 1,
            // paddingHorizontal: ResponsivePixels._10,
          }}>
          <View style={styles.rowStyle}>
            <TouchableWithoutFeedback
              // containerStyle={styles.button}
              containerStyle={styles.button}
              onPress={() => {
                clearBtn();
              }}>
              <Text style={styles.numberStyle}>C</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              containerStyle={styles.button}
              onPress={() => {
                operations
                  ? secoundNumber.toString().length > 0
                    ? setSecoundNumber(secoundNumber.toString().slice(0, -1))
                    : setOperations('')
                  : setNumber(number.toString().slice(0, -1));
              }}>
              <Text style={styles.numberStyle}>CE</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              containerStyle={styles.button}
              onPress={() => {
                setOperations('÷');
              }}>
              <Text style={styles.numberStyle}>÷</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              containerStyle={styles.button}
              onPress={() => {
                // btnClick('%');
              }}>
              <Text style={styles.numberStyle}>%</Text>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.rowStyle}>
            <TouchableWithoutFeedback
              containerStyle={styles.button}
              onPress={() => {
                btnClick(1);
              }}>
              <Text style={styles.numberStyle}>1</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              containerStyle={styles.button}
              onPress={() => {
                btnClick(2);
              }}>
              <Text style={styles.numberStyle}>2</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              containerStyle={styles.button}
              onPress={() => {
                btnClick(3);
              }}>
              <Text style={styles.numberStyle}>3</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              containerStyle={styles.button}
              onPress={() => {
                setOperations('+');
              }}>
              <Text style={styles.numberStyle}>+</Text>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.rowStyle}>
            <TouchableWithoutFeedback
              containerStyle={styles.button}
              onPress={() => {
                btnClick(4);
              }}>
              <Text style={styles.numberStyle}>4</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              containerStyle={styles.button}
              onPress={() => {
                btnClick(5);
              }}>
              <Text style={styles.numberStyle}>5</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              containerStyle={styles.button}
              onPress={() => {
                btnClick(6);
              }}>
              <Text style={styles.numberStyle}>6</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                setOperations('-');
              }}
              containerStyle={styles.button}>
              <Text style={styles.numberStyle}>-</Text>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.rowStyle}>
            <TouchableWithoutFeedback
              containerStyle={styles.button}
              onPress={() => {
                btnClick(7);
              }}>
              <Text style={styles.numberStyle}>7</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              containerStyle={styles.button}
              onPress={() => {
                btnClick(8);
              }}>
              <Text style={styles.numberStyle}>8</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              containerStyle={styles.button}
              onPress={() => {
                btnClick(9);
              }}>
              <Text style={styles.numberStyle}>9</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              containerStyle={styles.button}
              onPress={() => {
                setOperations('×');
              }}>
              <Text style={styles.numberStyle}>×</Text>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.rowStyle}>
            <TouchableWithoutFeedback
              containerStyle={styles.button}
              onPress={() => {
                /* operations
                  ? secoundNumber.includes('.')
                    ? btnClick('')
                    : btnClick('.')
                  : number.includes('.')
                  ? btnClick('')
                  : btnClick('.'); */
                  if(number&& (!operations))
                {
                 if(!(number.includes('.')))btnClick('.')
                }
                else if(secoundNumber&& operations){
                  if(!(secoundNumber.includes('.')))btnClick('.')
                  
                }
                else{
                  btnClick('0.')
                }
                
              }}>
              <Text style={styles.numberStyle}>.</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              containerStyle={styles.button}
              onPress={() => {
                btnClick(0);
              }}>
              <Text style={styles.numberStyle}>0</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              containerStyle={styles.button}
              onPress={() => {

                operations
                  ? secoundNumber.includes('-')
                    ? setSecoundNumber(secoundNumber.replace('-', ''))
                    : setSecoundNumber('-' + secoundNumber)
                  : number.includes('-')
                  ? setNumber(number.replace('-', ''))
                  : setNumber('-' + number);
              }}>
              <Text style={styles.numberStyle}>+/-</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              containerStyle={styles.button}
              onPress={() => {
                // insertCalculationHistory();
                // calculation(operations)
              }}>
              <Text style={styles.numberStyle}>=</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    </>
  );
};
export default Calculator;
const styles = StyleSheet.create({
 
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    // width: ResponsivePixels._86,
    height: ResponsivePixels._50,
    // marginVertical: ResponsivePixels._10,
    marginStart: ResponsivePixels._10,
    marginEnd: ResponsivePixels._10,
    paddingVertical:ResponsivePixels._10,
    paddingHorizontal:ResponsivePixels._30,
    borderRadius: ResponsivePixels._10,
    backgroundColor: Colors.backgroundColor,
    flex:1,
  },
  rowStyle:{flexDirection: 'row',marginVertical:ResponsivePixels._10},
  numberStyle:{
    fontFamily:Fonts.name.medium,
    fontSize:Fonts.size._18px,
    color:Colors.black2,
    textAlign:'center'
  },
  answerStyle:{
    fontSize: Fonts.size._20px,
    color:Colors.black2,
    fontFamily:Fonts.name.medium,
    paddingHorizontal:ResponsivePixels._30,
    paddingVertical:ResponsivePixels._10
  }
});
