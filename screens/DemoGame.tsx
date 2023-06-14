import React, {useState,useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,

  Image,
  StatusBar,
} from 'react-native';
import {FlatList, TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Colors from './constants/Colors';
import Fonts from './constants/Fonts';
import ResponsivePixels from './constants/ResponsivePixels';
import { BaseProps } from './KhataBook/Model/BaseProps';

const DemoGame: React.FC<BaseProps> = ({navigation: {goBack},route}) => {
  const [boxArray, setBoxArray] = useState(['','','','','','','','','']);
  const [box, setBox] = useState(['','','','','','','','','']);
  const [winMsg,setWinMsg]=useState('')
  const temp = [...boxArray];
  const reset=['','','','','','','','',''];
  const [value, setValue] = useState(true);

  // console.log(route);
  
    useEffect(()=>{        
        checkResult()
    },[boxArray])

    const checkResult=()=>{
        if((boxArray[0]=='O'&&boxArray[1]=='O'&&boxArray[2]=='O')||(boxArray[3]=='O'&&boxArray[4]=='O'&&boxArray[5]=='O')||(boxArray[6]=='O'&&boxArray[7]=='O'&&boxArray[8]=='O')||(boxArray[0]=='O'&&boxArray[3]=='O'&&boxArray[6]=='O')||(boxArray[1]=='O'&&boxArray[4]=='O'&&boxArray[7]=='O')||(boxArray[2]=='O'&&boxArray[5]=='O'&&boxArray[8]=='O')||(boxArray[2]=='O'&&boxArray[4]=='O'&&boxArray[6]=='O')||(boxArray[0]=='O'&&boxArray[4]=='O'&&boxArray[8]=='O'))
        { 
           setWinMsg('O Win')
            return
        }
       else if((boxArray[0]=='X'&&boxArray[1]=='X'&&boxArray[2]=='X')||(boxArray[3]=='X'&&boxArray[4]=='X'&&boxArray[5]=='X')||(boxArray[6]=='X'&&boxArray[7]=='X'&&boxArray[8]=='X')||(boxArray[0]=='X'&&boxArray[3]=='X'&&boxArray[6]=='X')||(boxArray[1]=='X'&&boxArray[4]=='X'&&boxArray[7]=='X')||(boxArray[2]=='X'&&boxArray[5]=='X'&&boxArray[8]=='X')||(boxArray[2]=='X'&&boxArray[4]=='X'&&boxArray[6]=='X')||(boxArray[0]=='X'&&boxArray[4]=='X'&&boxArray[8]=='X'))
        {
            setWinMsg('X Win')
            return
        }
      else if((boxArray[0]!=''&& boxArray[1]!=''&&boxArray[2]!='')&&(boxArray[3]!=''&&boxArray[4]!=''&&boxArray[5]!='')&&(boxArray[6]!=''&&boxArray[7]!=''&&boxArray[8]!=''))
        {
            setWinMsg('Match Draw')
            return
        }
    }
    const insertAutoCompleteValue=(index:number)=>{
      temp[index]='X';
      box.splice(1,1)
      setBoxArray(temp)
    }
    const checkForAutoComplete=(pos1: number, pos2: number, pos3: number) =>{      
      if((temp[pos1]=='X'&& temp[pos2]=='X'||temp[pos1]=='O'&& temp[pos2]=='O' )&& temp[pos3]==''){
        insertAutoCompleteValue(pos3)
        return true
      }
      else if((temp[pos1]=='X'&& temp[pos3]=='X'||temp[pos1]=='O'&& temp[pos3]=='O' )&& temp[pos2]==''){
        insertAutoCompleteValue(pos2)
        return true
      }
      else if((temp[pos2]=='X'&& temp[pos3]=='X'||temp[pos2]=='O'&& temp[pos3]=='O' )&& temp[pos1]==''){
        insertAutoCompleteValue(pos1)
        return true
      }
    }

    const computer=()=>{
      if(route.params.GameType=='Hard'){
        if (checkForAutoComplete(0, 1, 2)) return;
       else if (checkForAutoComplete(3, 4, 5)) return;
       else if (checkForAutoComplete(6, 7, 8)) return;
       else if (checkForAutoComplete(0, 3, 6)) return;
       else if (checkForAutoComplete(1, 4, 7)) return;
       else if (checkForAutoComplete(2, 5, 8)) return;
       else if (checkForAutoComplete(0, 4, 8)) return;
       else if (checkForAutoComplete(2, 4, 6)) return;
        
        else if (box.length > 1) {
          let play = Math.floor(Math.random() * boxArray.length);
          while (temp[play] == 'X' || temp[play] == 'O') {
            play = Math.floor(Math.random() * boxArray.length);
          }
          temp[play] = 'X';
          box.splice(1, 1);
          setBoxArray(temp);
         return;
       }
      }
      else if(route.params.GameType=='Easy'){
        if(box.length>1){
          let play = Math.floor(Math.random() * boxArray.length);
            while(temp[play] == "X"||temp[play] == "O" ){
              play = Math.floor(Math.random() * boxArray.length);
            }
            temp[play] = 'X';
            box.splice(1, 1);
            setBoxArray(temp)
            return;
          }
      }
    }
  const resetData=()=>{
    setBox(reset)
    setBoxArray(reset)
    setValue(true)
  }

 return (
  <>
  <StatusBar
    backgroundColor={Colors.white}
    barStyle='dark-content'
    />

    <View style={{backgroundColor:Colors.white,flex:1}}>
      <TouchableWithoutFeedback
        style={styles.backButtonStyle}
        onPress={() => {
          goBack();
        }}>
        <Image
          source={require('../assets/Images/ic_arrow_back.png')}
          style={{
            width: ResponsivePixels._35,
            height: ResponsivePixels._35,
            tintColor: Colors.buttonColor,
            marginRight: ResponsivePixels._5,
          }}
        />
      </TouchableWithoutFeedback>
      <View style={styles.title}>
        <Text
          style={styles.titleTextStyle}>
          Tic Tac Toe Game
        </Text>
      </View>
      <View style={styles.box}>
        <FlatList
          data={boxArray}
          numColumns={3}
          renderItem={({item, index}) => (
            <TouchableWithoutFeedback
              disabled={boxArray[index]||winMsg}
              onPress={() => { 
                if(route.params.GameType=='UserVsUser' )
                {
                  if(value){
                    temp[index] = 'O';
                    box.splice(1, 1);
                    setBoxArray(temp); 
                    setValue(false)
                  }
                  else{
                    temp[index] = 'X';
                    box.splice(1, 1);
                    setBoxArray(temp);
                    setValue(true) 
                  }  
              }
               else if(route.params.GameType=='Easy'||route.params.GameType=='Hard' )
                { 
                  temp[index] = 'O';
                  box.splice(1, 1);
                  setBoxArray(temp);
                  computer()
                }                        
              }}
              style={styles.boxs}>
              <Text style={{color: Colors.white}}>{item}</Text>
            </TouchableWithoutFeedback>
          )}
        />
      </View>
      <Text style={styles.winMsgStyle}>{winMsg}</Text>
      <View
        style={{
          marginHorizontal: ResponsivePixels._170,
          alignContent: 'center',
          marginVertical:ResponsivePixels._10
        }}>
        {winMsg!='' && (
        <Button
          title="Reset"
          onPress={() => {
            resetData();
            setWinMsg('')
          }}
        />
         )} 
      </View>
    </View>
    </>
  );
};
export default DemoGame;
const styles = StyleSheet.create({
  box: {
    height: ResponsivePixels._150,
    marginVertical: ResponsivePixels._50,
    alignItems: 'center',
  },
  backButtonStyle:{
    height: ResponsivePixels._35,
    width: ResponsivePixels._35,
    marginVertical: ResponsivePixels._20,
    marginHorizontal: ResponsivePixels._10,
  },
  boxs: {
    backgroundColor: Colors.grayColor,
    width: ResponsivePixels._120,
    borderRightWidth: ResponsivePixels._1,
    borderRightColor: Colors.black,
    borderBottomColor: Colors.black,
    height: ResponsivePixels._50,
    borderBottomWidth: ResponsivePixels._1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: ResponsivePixels._25,
  },
  titleTextStyle:{
    fontSize: Fonts.size._22px,
    color: Colors.black,
    fontFamily: Fonts.name.extraBold,
  },
  winMsgStyle: {
    fontSize: Fonts.size._15px,
    color: Colors.black,
    textAlign: 'center',
  },
});
