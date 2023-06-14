import React from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import ContextMenu from 'react-native-context-menu-view';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
const Menus: React.FC = data => {
  {
    // console.log('props', data);
  }
  return (
    // <View style={{marginVertical: 10,backgroundColor:'red'}}>
      // {/* <Text>Hello world!</Text> */}
      <Menu onSelect={value => alert(`Selected number: ${value}`)}>
  <MenuTrigger text='Select option' />
  <MenuOptions>
    <MenuOption value={1} text='One' />
    <MenuOption value={2}>
      <Text style={{color: 'red'}}>Two</Text>
    </MenuOption>
    <MenuOption value={3} disabled={true} text='Three' />
  </MenuOptions>
</Menu>
    // </View>
    // {/* <ContextMenu
    //   actions={[{title: 'Title 1'}, {title: 'Title 2'}]}
    //   onPress={e => {
    //     console.log(
    //       `Pressed ${e.nativeEvent.name} at index ${e.nativeEvent.index}`,
    //     );
    //   }}>

    //   <View
    //     style={{
    //       position: 'absolute',
    //       right: 0,
    //       // left: 243,
    //       backgroundColor: '#fff',
    //       height: 50,
    //       borderRadius: 10,
    //       width: 55,
    //       padding: 5,
    //       top: -32,
    //       shadowColor: '#000',
    //       shadowOffset: {
    //         width: 0,
    //         height: 2,
    //       },
    //       shadowOpacity: 0.25,
    //       shadowRadius: 4,
    //       elevation: 5,
    //       opacity:1,
    //     }}>
    //     <TouchableWithoutFeedback
    //       onPress={() => {

    //         data.navigation.navigate('UpdateEmployeeData', dataPass);
    //       }}>
    //       <Text>Edit</Text>
    //     </TouchableWithoutFeedback>
    //     <TouchableWithoutFeedback
    //       onPress={() => {
    //         data.navigation.navigate('DeleteEmployee', dataPass);
    //       }}>
    //       <Text>Delete</Text>
    //     </TouchableWithoutFeedback>
    //   </View>
    // </ContextMenu> */}
   
   
    // <View
//     style={{
//       position: 'absolute',
//       // right: 0,
//       left: 243,
//       backgroundColor: '#fff',
//       opacity: 1,
//       height: 50,
//       borderRadius: 10,
//       width: 55,
//       padding: 5,
//       // borderWidth: 0.5,
//       top: 9,
//       shadowColor: '#000',
//       shadowOffset: {
//         width: 0,
//         height: 2,
//       },
//       shadowOpacity: 0.25,
//       shadowRadius: 4,
//       elevation: 5,
//     }}>
//     <TouchableWithoutFeedback
//       onPress={() => {
//         props.navigation.navigate(
//           'UpdateEmployeeData',
//           dataPass,
//         );
//       }}>
//       <Text>Edit</Text>
//     </TouchableWithoutFeedback>
//     <TouchableWithoutFeedback
//       onPress={() => {
//         props.navigation.navigate('DeleteEmployee', dataPass);
//       }}>
//       <Text>Delete</Text>
//     </TouchableWithoutFeedback>
//   </View>
// )}
  );
};
export default Menus;
