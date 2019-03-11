// @flow
import { createStackNavigator, createAppContainer } from "react-navigation";
import {HomeScreen} from './HomeScreen.js';
import {YoutubeScreen} from './YoutubeScreen.js';

const AppNavigator = createStackNavigator({
    Home: HomeScreen,
    Video: YoutubeScreen
  }, {
    headerMode: 'none',
    initialRouteName: 'Home'
});

export default createAppContainer(AppNavigator);
