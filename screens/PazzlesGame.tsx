import React, {useState} from 'react';
import {useEffect} from 'react';
import {View, StyleSheet, Text,Image, StatusBar} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Colors from './constants/Colors';
import Fonts from './constants/Fonts';
import ResponsivePixels from './constants/ResponsivePixels';
const PazzlesGame: React.FC = ({ navigation: { goBack } }) => {
  const [boxItem, setBoxItems] = useState(['','','','','','','','','','','','','','','','']);
  const [divideArray, setDivideArray] = useState([]);
  const [lastIndex, setLastIndex] = useState([3,3]);
  const [selectedIndex, setSelectedIndex] = useState([]);
  const copyArray = [...boxItem];

  let word = 'ADMINISTRATIVEL';
  word=word.split('')

  useEffect(() => {
    boxItem.map((item, index) => {
      const randomword = [Math.floor(Math.random() * word.length)];
      copyArray[index] = word[randomword];
      word.splice(randomword, 1);
    });
    Check();
    DivideArray(copyArray, 4);
  }, []);
  


  function DivideArray(arr, chunkSize) {
    const res = [];
    while (arr.length > 0) {
      const chunk = arr.splice(0, chunkSize);
      res.push(chunk);
    }

    setDivideArray(res);
  }

 
   useEffect(() => {
     checkValue();
   }, [selectedIndex,lastIndex]);

   const checkValue = () => {
     let FirstIndex = lastIndex[0];
     let SecoundIndex = lastIndex[1];
     let ChangeSecoundIndex = lastIndex[1];
 
     
     if (lastIndex[0] == 0) {
       SecoundIndex = lastIndex[1] - 1;
       ChangeSecoundIndex = lastIndex[1] + 1;
       if (selectedIndex[0] == FirstIndex + 1 && selectedIndex[1]==lastIndex[1]) {
         setLastIndex([FirstIndex + 1, lastIndex[1]]);
         const temp = divideArray[lastIndex[0]][lastIndex[1]];
         divideArray[lastIndex[0]][lastIndex[1]] =
           divideArray[selectedIndex[0]][selectedIndex[1]];
         divideArray[selectedIndex[0]][selectedIndex[1]] = temp;
       } else if (selectedIndex[1] == ChangeSecoundIndex && selectedIndex[0]==lastIndex[0]) {
         setLastIndex([FirstIndex, ChangeSecoundIndex]);
         const temp = divideArray[lastIndex[0]][lastIndex[1]];
         divideArray[lastIndex[0]][lastIndex[1]] =
           divideArray[selectedIndex[0]][selectedIndex[1]];
         divideArray[selectedIndex[0]][selectedIndex[1]] = temp;
       } else if (selectedIndex[1] == SecoundIndex && selectedIndex[0]==lastIndex[0]) {
         setLastIndex([FirstIndex, SecoundIndex]);
         const temp = divideArray[lastIndex[0]][lastIndex[1]];
         divideArray[lastIndex[0]][lastIndex[1]] =
           divideArray[selectedIndex[0]][selectedIndex[1]];
         divideArray[selectedIndex[0]][selectedIndex[1]] = temp;
       }
     }
     if (lastIndex[0] == 1 || lastIndex[0] == 2) {
       SecoundIndex = lastIndex[1] - 1;
       ChangeSecoundIndex = lastIndex[1] + 1;
       if (selectedIndex[0] == FirstIndex + 1 && selectedIndex[1]==lastIndex[1]) {
         setLastIndex([FirstIndex + 1, lastIndex[1]]);
         const temp = divideArray[lastIndex[0]][lastIndex[1]];
         divideArray[lastIndex[0]][lastIndex[1]] =
           divideArray[selectedIndex[0]][selectedIndex[1]];
         divideArray[selectedIndex[0]][selectedIndex[1]] = temp;
       }
       if (selectedIndex[0] == FirstIndex - 1 && selectedIndex[1]==lastIndex[1]) {
         setLastIndex([FirstIndex - 1, lastIndex[1]]);
         const temp = divideArray[lastIndex[0]][lastIndex[1]];
         divideArray[lastIndex[0]][lastIndex[1]] =
           divideArray[selectedIndex[0]][selectedIndex[1]];
         divideArray[selectedIndex[0]][selectedIndex[1]] = temp;
       } else if (selectedIndex[1] == ChangeSecoundIndex && selectedIndex[0]==lastIndex[0]) {
         setLastIndex([FirstIndex, ChangeSecoundIndex]);
         const temp = divideArray[lastIndex[0]][lastIndex[1]];
         divideArray[lastIndex[0]][lastIndex[1]] =
           divideArray[selectedIndex[0]][selectedIndex[1]];
         divideArray[selectedIndex[0]][selectedIndex[1]] = temp;
       } else if (selectedIndex[1] == SecoundIndex && selectedIndex[0]==lastIndex[0]) {
         setLastIndex([FirstIndex, SecoundIndex]);
         const temp = divideArray[lastIndex[0]][lastIndex[1]];
         divideArray[lastIndex[0]][lastIndex[1]] =
           divideArray[selectedIndex[0]][selectedIndex[1]];
         divideArray[selectedIndex[0]][selectedIndex[1]] = temp;
       }
     }
     if (lastIndex[0] == 3) {
       SecoundIndex = lastIndex[1] - 1;
       ChangeSecoundIndex = lastIndex[1] + 1;
       if (selectedIndex[0] == FirstIndex - 1 && selectedIndex[1]==lastIndex[1]) {
         setLastIndex([FirstIndex - 1, lastIndex[1]]);
         const temp = divideArray[lastIndex[0]][lastIndex[1]];
         divideArray[lastIndex[0]][lastIndex[1]] =
           divideArray[selectedIndex[0]][selectedIndex[1]];
         divideArray[selectedIndex[0]][selectedIndex[1]] = temp;
       } else if (selectedIndex[1] == ChangeSecoundIndex && selectedIndex[0]==lastIndex[0]) {
         setLastIndex([FirstIndex, ChangeSecoundIndex]);
         const temp = divideArray[lastIndex[0]][lastIndex[1]];
         divideArray[lastIndex[0]][lastIndex[1]] =
           divideArray[selectedIndex[0]][selectedIndex[1]];
         divideArray[selectedIndex[0]][selectedIndex[1]] = temp;
       } else if (selectedIndex[1] == SecoundIndex && selectedIndex[0]==lastIndex[0]) {
         setLastIndex([FirstIndex, SecoundIndex]);
         const temp = divideArray[lastIndex[0]][lastIndex[1]];
         divideArray[lastIndex[0]][lastIndex[1]] =
           divideArray[selectedIndex[0]][selectedIndex[1]];
         divideArray[selectedIndex[0]][selectedIndex[1]] = temp;
       }
     }
   };
  const Check=()=>{
    if(
      copyArray[0][0]=='A'&& copyArray[0][1]=='D'&& copyArray[0][2]=='M'&& copyArray[0][3]=='I' &&
      copyArray[1][0]=='N'&& copyArray[1][1]=='I'&& copyArray[1][2]=='S'&& copyArray[1][3]=='T' &&
      copyArray[2][0]=='R'&& copyArray[2][1]=='A'&& copyArray[2][2]=='T'&& copyArray[2][3]=='I' &&
      copyArray[3][0]=='V'&& copyArray[3][1]=='E'&& copyArray[3][2]=='L'
      )
      {
        console.log('win');
        
      }
    
  }

  return (
    <>
    <StatusBar
    backgroundColor={Colors.white}
    barStyle='dark-content'
    />
    <View style={styles.main}>
        <TouchableWithoutFeedback
          style={{height: ResponsivePixels._35, width: ResponsivePixels._35}}
          onPress={() => {
            goBack()
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
        <Text style={{fontSize:Fonts.size._20px,fontFamily:Fonts.name.bold,color:Colors.black}}>Pazzles Game</Text>
      </View>
      <View style={{justifyContent:'center',alignItems:'center'}}>
      {divideArray?.map((item, index) => {
        return (
          <View style={{flexDirection: 'row'}}>
            {divideArray[index]?.map((items, indexs) => {
              return (
                <View style={{flexDirection: 'row'}}>
                  <TouchableWithoutFeedback
                    style={[
                      {
                        borderWidth: 1,
                        height: ResponsivePixels._100,
                        width: ResponsivePixels._100,
                        justifyContent: 'center',
                        alignItems: 'center',
                      },
                      lastIndex[0] == index && lastIndex[1] == indexs
                        ? styles.selectedWord
                        : null,
                    ]}

                    onPress={() => {
                      setSelectedIndex([index, indexs])
                      checkValue()
                    }}>
                    <Text>{items}</Text>
                  </TouchableWithoutFeedback>
                </View>
              );
            })}
          </View>
        );
      })}
      </View>
      <View style={styles.title}>
        <Text style={{fontSize:Fonts.size._18px,color:Colors.black,fontFamily:Fonts.name.extraBold}}>Word : ADMINISTRATIVELY</Text>
      </View>
    </View>
    </>
  );
};
export default PazzlesGame;
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: ResponsivePixels._20,
  },
  title:{
    justifyContent:'center',
    alignItems:'center',
    paddingVertical:ResponsivePixels._70,
  },
  box: {
    flexDirection: 'row',
    justifyContent:'center',
    flex:1
  },
  boxItems: {
    borderWidth: ResponsivePixels._1,
    height: ResponsivePixels._50,
    width: ResponsivePixels._50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedWord: {
    borderWidth: ResponsivePixels._3,
  },
});
