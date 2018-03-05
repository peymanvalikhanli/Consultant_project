import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, 
  NavigatorIOS, 
  Text, 
  View, 
  AppRegistry, 
} from 'react-native';

import { StackNavigator } from 'react-navigation';
import home_page from './screens/home'; 
import files_page from './screens/files';
import message_page from './screens/messages';
import profile_page from './screens/profile';
import send_file_page from './screens/send_file'; 
import introduction_page from './screens/introduction';
import location_page from './screens/location';

import RN from 'react-navigation'

const nave = StackNavigator({
  introduction: { screen: introduction_page },
  Home: { screen: home_page },
  files: { screen: files_page },
  message: { screen: message_page },
  profile: { screen: profile_page },
  send_file: {screen: send_file_page},
  location: {screen: location_page},
});
export default nave;

AppRegistry.registerComponent('flow',nave)
