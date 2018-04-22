import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, 
  NavigatorIOS, 
  Text, 
  View, 
  AppRegistry, 
  AsyncStorage
} from 'react-native';

import { StackNavigator } from 'react-navigation';
import home_page from './screens/home'; 
import files_page from './screens/files';
import message_page from './screens/messages';
import new_message_page from './screens/new_message';
import show_message from './screens/show_message';
import profile_page from './screens/profile';
import send_file_page from './screens/send_file'; 
import introduction_page from './screens/introduction';
import location_page from './screens/location';
import verify_page from './screens/verify';
import profile_edit_page from './screens/profile_edit';
import upload_file_page from './screens/upload_file'; 

import RN from 'react-navigation'


//AsyncStorage.clear();

const nave = StackNavigator({
  introduction: { screen: introduction_page },
  verify:{ screen: verify_page},
  Home: { screen: home_page },
  files: { screen: files_page },
  message: { screen: message_page },
  new_message:{ screen: new_message_page},
  show_message:{ screen: show_message},
  profile: { screen: profile_page },
  edit_profile: { screen: profile_edit_page},
  send_file: {screen: send_file_page},
  location: {screen: location_page},
  upload_file: { screen: upload_file_page},
},{
  headerMode: "none"
});

export default nave;


AppRegistry.registerComponent('flow',nave)
