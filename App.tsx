/* /**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

/* import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { MyNavigator } from './screens/Navigation';

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <MyNavigator/>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App; */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react';
 import 'react-native-gesture-handler';
 import {persistStore} from 'redux-persist';
 import {LogBox} from 'react-native';
 import {Provider} from 'react-redux';
 import {Root} from 'native-base';
 import { MenuProvider } from "react-native-popup-menu";
 import {PersistGate} from 'redux-persist/integration/react';
 import { applyMiddleware, createStore } from "redux";
 
 import ReduxThunk from "redux-thunk";
 
//  import { ProgressDialog } from './components';
//  import AlertDialog from './components/AlertDialog';
//  import BottomAlertDialog from './components/BottomAlertDialog';
import reducers from './screens/KhataBook/reducers';
import { MyNavigator } from './screens/Navigation';
 
 const store = createStore(reducers, applyMiddleware(ReduxThunk));
 export const pStore = persistStore(store);
 export {store};
 
 const App: React.FC = () => {
   LogBox.ignoreAllLogs();
 
   return (
     <Provider store={store}>
        <PersistGate persistor={pStore}>
          <Root>
            <MenuProvider>
              
              <MyNavigator />
            </MenuProvider>
          </Root>
        </PersistGate>
      </Provider>
   );
 };
 
 export default App;
 