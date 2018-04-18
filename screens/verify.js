
import React, { PureComponent } from 'react';
import { Dimensions, Image, StyleSheet, View, NetInfo, Alert, AsyncStorage } from 'react-native';
import { Container, Header, Content, Footer, Button, Icon, Text, Body, Left, Right ,Form, Item, Input, Label } from 'native-base';
import Orientation from 'react-native-orientation';

import RNExitApp from 'react-native-exit-app';

//import footer style
import footer_styles from './style/footer';

import lang from './localization/fa.json';

import server_url from './config/server_url.json';

import axios from 'axios';

function handleFirstConnectivityChange(isConnected) {
    if(!isConnected){
        
        Alert.alert(
            lang.error,
            lang.check_internet_connection,
            [
              {text: 'بله', onPress: () => RNExitApp.exitApp()},
            ],
            { cancelable: false }
          )
    }
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      handleFirstConnectivityChange
    );
}
NetInfo.isConnected.addEventListener(
    'connectionChange',
    handleFirstConnectivityChange
);
 
export default class verify_page extends PureComponent {

    static navigationOptions = {
        title:'',
        header: null,
    }; 

    constructor()
    {
      super();
      this.state={
          verify_code:"",
          is_change_page : false,
      }
      Orientation.lockToPortrait();
    }

    change_page(){
        if(this.state.is_change_page){
            this.props.navigation.replace("Home");
        }
    }
    
    btn_send_OnClick (){
       
        if(this.state.verify_code== null || this.state.verify_code == undefined || this.state.verify_code.length<4)
        {
            Alert.alert(
                lang.error,
                lang.filling_the_verify_code,
                [
                    {text: lang.ok},
                ],
                { cancelable: false });
            return;
        }
       
        //ُTODO: set verify cod on server data peyman plz doing
        axios.post(server_url.mobo_user, {
            act: 'mobo_users_set',
            tel: this.state.country_id+""+this.state.phone_number,
          })
          .then(response=> {
            
            if(response.data.msg != undefined || response.data.msg != null){
                alert(response.data.msg);
            }
            if(response.data.data!= undefined || response.data.data != null ){
                if(response.data.data == 1){
                    try {
                        let user_profile = {
                            phone:this.props.navigation.state.params.phone
                        };  
                        // await 
                        AsyncStorage.setItem('user_profile', JSON.stringify(user_profile)); 
                      } catch (error) {
                        // Error saving data
                      }
                    this.setState({is_change_page:true});
                    this.change_page();
                }else{
                   alert(lang.error);
                }
            }
                      
          })
          .catch(function (error) {
            console.log(error);
          });
          

    }

    render() {
        var {navigate}=this.props.navigation; 
    return (
       <Container>
            <Header style={footer_styles.header}/>
            <Content> 
                <Body>
                    <Text style={styles.text}>
                    {lang.system_verify}
                    </Text>
                    <Form style={styles.form} >
                        <Item inlineLabel>
                        <Input
                            keyboardType="numeric"
                            placeholder="####"
                            maxLength={4}
                            onChange={(event) => this.setState({verify_code: event.nativeEvent.text})}
                            />
                        </Item>
                    </Form>
                    <Button style={styles.form_btn}
                    onPress={()=>{this.btn_send_OnClick()}}
                    >
                        <Body>
                            <Text style={{color:"#ffffff"}}>
                                {lang.send}
                            </Text>
                        </Body>
                    </Button>
                </Body>    
            </Content>    
        </Container>
    );
  }
}
 
export const { width, height } = Dimensions.get('window');
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  child: {
    height: height*0.905,
    width,
    justifyContent: 'center',
    backgroundColor: '#eeeeee',
  },
  text: {
    marginTop: height*0.1,
    fontSize: width * 0.08,
    color:"#1bbbc4",
  },
  form:{
    width: width*0.4,
    marginTop: height*0.1,
  },
  form_btn:{
    marginTop: height*0.2,
    width:width*0.4,
    backgroundColor:"#1bbbc4",
  },
  img:{
      width,
      height:width*0.9,
      marginTop: width*0.1,
      justifyContent: 'center',
      alignItems: 'stretch',
      resizeMode: 'stretch',
  },
});