import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

// import change from '../screens/DemoTestCase/FunctionAndState';
// import FunctionAndState from '../screens/DemoTestCase/FunctionAndState';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import DemoState from '../screens/DemoState';
configure({adapter: new Adapter()});
test('function test', () => {
  // const HomeData=renderer.create(<FunctionAndState />).toJSON()
  // console.log('HomeData',HomeData.children[1].children);
  // expect(change(2)).toEqual(40);
  const HomeData = renderer.create(<DemoState />).getInstance();
  console.log(HomeData);
  expect(HomeData.Change(2)).toEqual(20);
});
