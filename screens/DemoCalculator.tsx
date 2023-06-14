import _ from 'lodash';
import React, { useEffect,useState } from 'react';
import {Text, View, StyleSheet,Image, StatusBar} from 'react-native';
import {FlatList, TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Colors from './constants/Colors';
import Fonts from './constants/Fonts';
import ResponsivePixels from './constants/ResponsivePixels';
import {COLUMN_CALCULATOR_ID, COLUMN_FIRST_NUMBER, COLUMN_RESULT, TABLE_CALCULATOR_HISTORY } from './KhataBook/Sqlite/SqliteConstants';
import { SqliteUtils } from './KhataBook/Sqlite/SqliteUtils';

const DemoCalculator: React.FC = ({ navigation: { goBack } }) => {
  const [number, setNumber] = useState('');
  const [secoundNumber, setSecoundNumber] = useState('');
  const [operations, setOperations] = useState('');
  const [result, setResult] = useState('0');
  const [datas,setDatas]=useState([]);
  const [viewData,setViewData]=useState([]);  
  const [calculatorHistory,setCalculatorHistory]=useState([]);

  const DisplayHistory=async()=>{
    const data= await SqliteUtils.select({tableName:TABLE_CALCULATOR_HISTORY,orderBy:[COLUMN_CALCULATOR_ID],orderByDesc:true})
    if(data[0].rows.length>0){
      var temp=[]
      for(let i=0;i<data[0].rows.length;++i){
        temp.push(data[0].rows.item(i))
      }
    }
    setCalculatorHistory(temp)
  }

  function change(x){
   return x*10
  }
  
  const btnClick = i => {
    let temp = [...datas];
    let tempNum = [...viewData];
    if(i=='%'){
      if(datas.length==0){
        setNumber(number/100)
        setSecoundNumber(secoundNumber/100)
      }
      else{
        setNumber(((datas.length>3?datas[datas.length-1]:datas[datas.length-3])* parseFloat(number))/100)
        // setSecoundNumber(secoundNumber[secoundNumber.length])
        /* let num=secoundNumber.indexOf(datas[datas.length-2]) */
        // num=num+1
        // setSecoundNumber(secoundNumber.slice(0,secoundNumber.length-num+2))
       /*  console.log(secoundNumber.length==num,num,'secoundNumber num');
        // setSecoundNumber(secoundNumber.replace(/(.{5}).{2}/,"$112"))
        setSecoundNumber(secoundNumber.replace(secoundNumber.substring(num,secoundNumber.length),datas[datas.length-1]* parseFloat(number))/100)
        */ // if(secoundNumber.length==num){
        // // setSecoundNumber(secoundNumber.indexOf(num,secoundNumber.length,(datas[datas.length-1]*parseFloat(number)/100)))  
        // setSecoundNumber(secoundNumber.slice(0,secoundNumber.length-num+2),secoundNumber+(datas[datas.length-1]* parseFloat(number))/100)
        // }
        // // setNumber('')
        // console.log('secoundNumber',secoundNumber.substring(num,secoundNumber.length),secoundNumber.slice(0,secoundNumber.length-num+1));
        
      }
    }
    else if ((i == '+' || i == '-' || i == '×' || i == '÷'||i == '%')&& number) {
      if (i == '×') {
      //  temp.push(parseInt(number),i,result?parseInt(result):0);
    
      temp.push(parseFloat(number),i,result?parseFloat(result):0);
      tempNum.push(parseFloat(number),i)
      }
      else {
        // temp.push(parseFloat(number),i,result?parseFloat(result):parseFloat(number));
       temp.push(parseFloat(number),i,result?parseFloat(result):0);
       tempNum.push(parseFloat(number),i)
      }
    //  console.log('temp',temp);
      setViewData(tempNum)
      setDatas(temp);
      setSecoundNumber(secoundNumber + i);
      setNumber('');
    } 
  //  &&(secoundNumber[secoundNumber.length-1]!='+'&&secoundNumber[secoundNumber.length-1]!='x')
    else if(i!='+'&& i != '-' && i != '×' && i != '÷'&& i != '%' &&number.length<10) {
      setNumber(number + i);
      setSecoundNumber(secoundNumber + i);
    }
  }
 
  const calculation = () => {
    let res=datas.length-1;
    let opt=datas.length-2;
    let firstNum=datas.length-3;

    if ((datas[opt] == '+'||datas[opt+1] == '+')&& number) {   
      res==1?
      setResult(parseFloat(datas[firstNum]) + parseFloat(number))
     : setResult((res==2?parseFloat(datas[firstNum]):parseFloat(datas[res])) + parseFloat(number));
    //  : setResult((parseFloat(datas[res])) + parseFloat(number));
      
    }else if (datas[opt] == '-'&& number) {
      setResult((res==2?datas[firstNum]: datas[res]) - parseFloat(number));
    }else if (datas[opt] == '÷'&& number) {
    if(datas.length<=3){
      setResult((datas[firstNum]) / parseFloat(number));
    }else if(datas.length==6){
      if(datas[res-4]=='+'){
        setResult((parseFloat(datas[firstNum]) / parseFloat(number))+ parseFloat(datas[res-5]))  
      }else if(datas[res-4]=='-'){
        setResult(parseFloat(datas[res-5])- parseFloat(datas[firstNum]) / parseFloat(number))  
      }else if(datas[res-4]=='×'){
        setResult(parseFloat(datas[datas.length-1]) / parseFloat(number))  
      }  
    }else if(datas.length>6){
      if(datas[res-4]=='+'){
        setResult((parseFloat(datas[firstNum])/ parseFloat(number))+ parseFloat(datas[res-3]))  
      }else if(datas[res-4]=='-'){
        setResult(parseFloat(datas[res-3])- parseFloat(datas[firstNum])/ parseFloat(number))  
      }else if(datas[res-4]=='×'){
        setResult(parseFloat(datas[datas.length-1])/ parseFloat(number))  
      }
    }
    }else if(datas[opt]=='×'&& number){ 
    datas[res]!=0?        
     (datas[datas.length-5]=='+'&& datas.length==6)?
      setResult((parseFloat(datas[firstNum]) * parseFloat(number)+ parseFloat(datas[datas.length-6])))
      :
     (datas[datas.length-5]=='-'&& datas.length==6)?
      setResult(parseFloat(datas[datas.length-6])- parseFloat(datas[firstNum]) * parseFloat(number))
      :
     (datas[datas.length-5]=='+')?
      setResult((parseFloat(datas[firstNum]) * parseFloat(number)+ parseFloat(datas[res-3])))
      :
     (datas[datas.length-5]=='-')?
      setResult(parseFloat(datas[res-3])- parseFloat(datas[firstNum]) * parseFloat(number))
      :
      setResult(parseFloat(datas[res]) * parseFloat(number)) 
      :
      setResult((parseFloat(datas[firstNum])*parseFloat(number))+parseFloat(datas[res])) 
    } 
  }

  useEffect(() => {
    DisplayHistory();
    calculation();
  }, [number, operations, secoundNumber]);

  const insertCalculationHistory=()=>{
    
    if(secoundNumber!=''&& result!=''){
      // SqliteUtils.insert({tableName:TABLE_CALCULATOR_HISTORY,columnNames:[COLUMN_FIRST_NUMBER,COLUMN_OPERATION,COLUMN_SECOUND_NUMBER,COLUMN_RESULT],values:[number,operations,secoundNumber,result]})
      SqliteUtils.insert({tableName:TABLE_CALCULATOR_HISTORY,columnNames:[COLUMN_FIRST_NUMBER,COLUMN_RESULT],values:[secoundNumber,result]})
      clear()
    }
  }

  const clearBtn = () => {
    if(_.isEmpty(number)){
      SqliteUtils.delete({tableName:TABLE_CALCULATOR_HISTORY})
      setCalculatorHistory([])
    }
    setNumber('');
    setSecoundNumber('');
    setOperations('');
    setResult('');
    setDatas([])
    setViewData([])

  }

  const clear = () => {
    setNumber('');
    setSecoundNumber('');
    setOperations('');
    setResult('')
    setDatas([])
    setViewData([])
  }

  const del=()=>{
    setSecoundNumber(secoundNumber.toString().slice(0,-1))
    setNumber(number.toString().slice(0,-1))    
   if(number.length==0&& secoundNumber.length-1&& datas.length>3)
   {
      setOperations('')      
      setNumber(datas[datas.length-3].toString())
      setDatas(datas.slice(0,-3))
      setViewData(viewData.slice(0,-2))  
  }
  else if(datas.length==3&&datas[datas.length-2]==secoundNumber[secoundNumber.length-1] ){
    setDatas(datas.slice(0,-2))
    setViewData(viewData.slice(0,-1))   
  }
  else if(datas.length==1){
    /*   setDatas(datas[datas.length-1].toString().slice(0,-1))
    console.log('datas',datas);
    // setDatas(datas.join(', '))
    setNumber(number.slice(0,-1))
    setNumber(datas.toString()) */
    // clearBtn()
    setNumber(datas);
    setResult('')
    // setNumber(number.slice(0,-1))
    setDatas([]);
    setViewData([]);
  }
  }

  function numberWithCommas(num) {
    return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }                

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
            goBack();
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
        {calculatorHistory?.length>0?
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
                setNumber(number+item[COLUMN_RESULT].toString())
                setSecoundNumber(secoundNumber+ item[COLUMN_RESULT].toString())
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
                  }>{   `${numberWithCommas(item[COLUMN_FIRST_NUMBER])}`}</Text>
                <Text style={styles.numberStyle}>{`= ${
                numberWithCommas(item[COLUMN_RESULT])
                }`}</Text>
              </TouchableWithoutFeedback>
            )}
          />
        :null}
        <View style={{position: 'absolute', bottom: 285, right: 0}}>
          <View
            style={{
              alignItems: 'flex-end',
              paddingVertical: ResponsivePixels._20,
              height: ResponsivePixels._200,
            }}>
             <Text style={styles.answerStyle}>
            {/* {numberWithCommas(secoundNumber)} */}
            {viewData.map((item,index)=>(
              
              <Text style={styles.answerStyle}>
                {numberWithCommas(item)}
                </Text>
            ))}
            {numberWithCommas(number)}
            </Text>
           
            <Text style={styles.answerStyle}>
            {datas.length!=0?
                result ?  `= ${numberWithCommas(result)}`:`= 0`
               :'0'}
            </Text>
          </View>
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: 10,
            flexWrap: 'wrap',
            width: '100%',
            justifyContent: 'center',
         }}>
          <View style={styles.rowStyle}>
            <TouchableWithoutFeedback
              containerStyle={styles.button}
              onPress={() => {
                clearBtn();
              }}>
              <Text style={styles.numberStyle}>C</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              containerStyle={styles.button}
              onPress={() => {
               del()
              }}>
              <Text style={styles.numberStyle}>CE</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              containerStyle={styles.button}
              onPress={() => {
                // setOperations('/');
                btnClick('÷')
              }}>
              <Text style={styles.numberStyle}>÷</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              containerStyle={styles.button}
              onPress={() => {
                // setOperations('%');
                btnClick('%')
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
                btnClick('+')
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
                btnClick('-')
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
                btnClick('×')
              }}>
              <Text style={styles.numberStyle}>×</Text>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.rowStyle}>
           
            <TouchableWithoutFeedback
              containerStyle={styles.button}
              onPress={() => {
                if(number){
                  btnClick(0);
                }
              }}>
              <Text style={styles.numberStyle}>0</Text>
            </TouchableWithoutFeedback>
            
            <TouchableWithoutFeedback
              containerStyle={styles.button}
              onPress={() => {
                if(number&& number!='0'&& number.length<9){
                  setNumber(number+'00')
                  setSecoundNumber(secoundNumber+'00')
                }
              }}>
              <Text style={styles.numberStyle}>00</Text>
            </TouchableWithoutFeedback>
            
            <TouchableWithoutFeedback
              containerStyle={styles.button}
              onPress={() => {
                if(number)
                {
                 if(!(number.includes('.')))btnClick('.')
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
                insertCalculationHistory();
               }}>
              <Text style={styles.numberStyle}>=</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    </>
  );
};
export default DemoCalculator;
const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: ResponsivePixels._50,
    marginStart: ResponsivePixels._10,
    marginEnd: ResponsivePixels._10,
    paddingVertical:ResponsivePixels._10,
    paddingHorizontal:ResponsivePixels._30,
    borderRadius: ResponsivePixels._10,
    backgroundColor: Colors.backgroundColor,
    flex:1,
  },
  rowStyle:{
  flexDirection: 'row',
  marginVertical:ResponsivePixels._10
  },
  numberStyle:{
    fontFamily:Fonts.name.bold,
    fontSize:Fonts.size._18px,
    color:Colors.black2,
    textAlign:'right'
  },
  answerStyle:{
    fontSize: Fonts.size._20px,
    color:Colors.black2,
    fontFamily:Fonts.name.bold,
    paddingHorizontal:ResponsivePixels._20,
    paddingVertical:ResponsivePixels._10,
    textAlign:'right'
  }
});
