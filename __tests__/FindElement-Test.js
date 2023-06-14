import React from 'react';
import 'react-native';
import renderer from 'react-test-renderer';
import GetElement from '../screens/DemoTestCase/GetElement';
let findElement = function (tree, element) {
  for (node in tree.children) {
    console.log('tree.children[node]', tree.children[node]);
    if (tree.children[node].props.testID == element) return true;
  }
  return undefined;
};
it('find element data', () => {
  const HomeData = renderer.create(<GetElement />).toJSON();
  console.log('HomeData', HomeData);
  expect(findElement(HomeData, 'username')).toBeDefined();

});
