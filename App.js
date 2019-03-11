// @flow
import { createStackNavigator, createAppContainer } from "react-navigation";
import {HomeScreen} from './HomeScreen.js';

const AppNavigator = createStackNavigator({
    Home: HomeScreen
  }, {
    headerMode: 'none'
});

export default createAppContainer(AppNavigator);
