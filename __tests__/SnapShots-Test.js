import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

import SnapShots from '../screens/DemoTestCase/SnapShots';
// import Home from '../screens/Home';
import DemoState from '../screens/DemoState';
// import change from '../screens/IndianFlag';
import IndianFlag from '../screens/IndianFlag';
describe('Main testing', () => {
  test('Snapshot testing', () => {
    const snap = renderer.create(<SnapShots />).toJSON();
    //  const snap= renderer.create(<Home />).toJSON();
    expect(snap).toMatchSnapshot();
  });
  
  /* it('function and state testing', () => {
    const HomeData = renderer.create(<DemoState />).getInstance();
    console.log(HomeData);
    // expect(HomeData.change(2)).toEqual(10);
    expect(HomeData.abc.length).toBe(0);
    //  HomeData.change(2)
    //   expect(HomeData.state.data).toEqual(10) 
  }); */
  /*  it('function testing ',()=>{
    expect(change(2)).toEqual(20)
  }); */
  /* let findElement = function (tree, element) {
    for (node in tree.children) {
      console.log('tree.children[node]', tree.children[node]);
      if (tree.children[node].props.testID == element) return true;
    }
    return undefined;
  };
  test('find value', () => {
    const HomeData = renderer.create(<IndianFlag />).toJSON();
    expect(findElement(HomeData, 'username')).toBeDefined();
  }); */
  /*   it('props',()=>{
    const wrapper=shallow(<IndianFlag data='hello'/>).props();
    // const Data=shallow(<IndianFlag data='hello'/>)
    console.log('data',wrapper.children[0].props.children);
    expect(wrapper.children[0].props.children).toEqual('hello')
  }) */
});
