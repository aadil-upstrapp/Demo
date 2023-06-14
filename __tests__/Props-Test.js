import React from 'react';
import 'react-native';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Profile from '../screens/DemoTestCase/Profile';

configure({adapter: new Adapter()});

test('props test case', () => {
  const HomeData = shallow(<Profile data="hello" />).props();
  expect(HomeData.children[0].props.children).toBe('hello');
});
