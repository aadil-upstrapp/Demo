import React,{Component} from 'react';
import { View, Text} from 'react-native';
class DemoState extends Component {
  constructor(){
    super();
    this.state={
      data:'test',
    }
  }
    Change(x){
      // this.setState({data:x*5})
      return x*10
    }
    abc(){
      alert('Hello World');
    }

    render() {
      return (
         <View>
            <Text>Welcome</Text>
         </View>
      );
    }
}
export default DemoState