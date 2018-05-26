import React from 'react';
import {StyleSheet,  AsyncStorage} from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, List, ListItem, Thumbnail, Body } from 'native-base';
import Orientation from 'react-native-orientation';
//import footer style
import footer_styles from './style/footer';

import lang from './localization/fa.json';

import home_styles from './style/home';

//import call lib 
import call from 'react-native-phone-call'


import server_url from './config/server_url.json';

import axios from 'axios';



export default class home_page extends React.Component{

    async componentWillMount() {
        await Expo.Font.loadAsync({
          'Roboto': require('native-base/Fonts/Roboto.ttf'),
          'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        });
      }

    static navigationOptions = {
        title:'',
        header: null,
    }; 

    constructor()
    {
      super();
      this.state={
          calling_number:"02126420740",
          user_id:null,
      }
      Orientation.lockToPortrait();
      
      // You only need to define what will be added or updated
      AsyncStorage.getItem('user_profile', (err, result) => {
         if(result!= null){
        //alert(result);
        var global_data = JSON.parse(result);
       
        if (global_data.ID==null || global_data.ID == undefined ){
            
            //send packet to server and recive useer data from server
            axios.post(server_url.mobo_user, {
                act: 'mobo_users_get_by_tel',
                tel: global_data.phone,
              })
              .then(response=> {
                if(response.data[0].ID != undefined || response.data[0].ID != null){
                    //this.get_data();
                    //alert(response.data[0].ID);
                    this.setState({user_id:response.data[0].ID});
                    try {
                        AsyncStorage.setItem('user_profile', JSON.stringify(response.data[0])); 
                      } catch (error) {
                        alert("can not write data in device");
                      }
                    
                }else{
                    alert(JSON.stringify(response.data[0]));
                }
              
            })
            .catch(function (error) {
                alert("data load error");
              });
          }else{
             // alert(global_data.ID); 
          }
        }else{
              alert("data is null");
          }
      });

    }

    calling(){
        const args = {
            number: this.state.calling_number, // String value with the number to call
            prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call 
          }
           
          call(args).catch(console.error)
    }
  
    render(){ 
        var {navigate}=this.props.navigation; 
        
        return(
            <Container style={ home_styles.body }>
               <Header style={footer_styles.header}/>
               <Content>
                <List>
                    <ListItem style={ home_styles.clling } 
                        onPress={()=> this.calling()}>
                    <Thumbnail square size={80} source={require('./img/img_call.png')} style={home_styles.btn_img} />
                    <Body>
                        <Text style={ home_styles.text }>
                            {lang.call_by_consultant}
                        </Text>
                    </Body>
                    </ListItem>
                    <ListItem style={ home_styles.message }
                        onPress={()=>this.props.navigation.replace("new_message",{parent:"Home"}) }>
                    <Thumbnail square size={80} source={require('./img/img_new_meassage.png')} style={home_styles.btn_img} />
                    <Body>
                        <Text style={ home_styles.text }>
                            {lang.send_message}
                        </Text>
                    </Body>
                    </ListItem>
                    <ListItem style={ home_styles.file }
                    onPress={()=>this.props.navigation.replace("send_file") }>
                    <Thumbnail square size={80} source={require('./img/img_file.png')} style={home_styles.btn_img} />
                    <Body>
                        <Text style={ home_styles.text }>
                            {lang.send_file}
                        </Text>
                    </Body>
                    </ListItem>
                    <ListItem style={ home_styles.location }
                     onPress={()=>this.props.navigation.replace("location") }>
                    <Thumbnail square size={80} source={require('./img/img_location.png')} style={home_styles.btn_img} />
                    <Body>
                        <Text style={ home_styles.text }>
                            {lang.send_location}
                        </Text>
                    </Body>
                    </ListItem>
                    <ListItem style={ home_styles.profile }
                     onPress={()=>this.props.navigation.replace("profile") }>
                    <Thumbnail square size={80} source={require('./img/img_profile.png')} style={home_styles.btn_img} />
                    <Body>
                        <Text style={ home_styles.text }>
                            {lang.profile}
                        </Text>
                    </Body>
                    </ListItem>        
                </List>
            </Content>
            <Footer 
                style={ footer_styles.footer_body }
            >
                <FooterTab style={ footer_styles.footer_body }>
                    <Button 
                        vertical
                        onPress={()=>this.props.navigation.replace("files") }
                    >
                        <Icon active name="folder-open" style={footer_styles.footer_btn} />
                        <Text style={footer_styles.footer_btn}>
                            {lang.file}
                        </Text>
                    </Button>
                    <Button 
                        vertical
                        onPress={()=>this.props.navigation.replace("message") }
                    >
                        <Icon active name="ios-chatbubbles" style={footer_styles.footer_btn} />
                        <Text style={footer_styles.footer_btn}>
                            {lang.messages}
                        </Text>
                    </Button>
                    <Button vertical>
                        <Icon active name="md-home" style={footer_styles.footer_btn_active} />
                        <Text style={footer_styles.footer_btn_active}>
                            {lang.home}
                        </Text>
                    </Button>
                </FooterTab>
            </Footer>
            </Container>
        );
    }

} 


