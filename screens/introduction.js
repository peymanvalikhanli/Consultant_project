
import React, { PureComponent } from 'react';
import { Dimensions, Image, StyleSheet, View, NetInfo, Alert, AsyncStorage } from 'react-native';
import { Container, Header, Content, Footer, Button, Icon, Text, Body, Left, Right ,Form, Item, Input, Label } from 'native-base';
import Orientation from 'react-native-orientation';
import SwiperFlatList from 'react-native-swiper-flatlist';

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
 
export default class introduction_page extends PureComponent {

    static navigationOptions = {
        title:'',
        header: null,
    }; 

    constructor()
    {
      super();
      this.state={
          country_id:"+98",
          phone_number:null,
          is_change_page : false,
      }
      Orientation.lockToPortrait();
     
      AsyncStorage.getItem('user_profile', (err, result) => {
         if(result!= null){
            this.setState({is_change_page:true});
            this.go_home_page();
            // alert(result);
        }  
     });
    }

    change_page(){
        if(this.state.is_change_page){
            this.props.navigation.replace("verify",{phone:this.state.country_id+""+this.state.phone_number});
        }
    }

    go_home_page(){
        if(this.state.is_change_page){
            this.props.navigation.replace("Home");
        }
    }
    
    btn_send_OnClick (){
        
        if(this.state.phone_number== null || this.state.phone_number == undefined || this.state.phone_number.length<10)
        {
            Alert.alert(
                lang.error,
                lang.filling_the_phone_number,
                [
                    {text: lang.ok},
                ],
                { cancelable: false });
            return;
        }
        if(this.state.country_id== null || this.state.country_id == undefined || this.state.country_id.length<3)
        {
            Alert.alert(
                lang.error,
                lang.filling_the_country_id,
                [
                    {text: lang.ok},
                ],
                { cancelable: false });
                return;
        }
       

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
                <View key="view_1" style={styles.container}>
                    <SwiperFlatList
                    showPagination
                    >
                        <View key="view_1_1" style={[styles.child,{backgroundColor:"#f5f5f5"}]}>
                            <Body style={{backgroundColor:"#f0f0f0"}}>
                                <Image 
                                    style={styles.img}
                                    source={require("./img/introduction1.jpeg")}
                                />
                            </Body>
                        </View>
                        <View key="view_1_2" style={styles.child}>
                            <Body>
                                <Text style={styles.text}>
                                {lang.system_login}
                                </Text>
                                <Form style={styles.form} >
                                    <Item inlineLabel>
                                    <Input
                                        keyboardType="phone-pad"
                                        placeholder="+98"
                                        maxLength={3}
                                        onChange={(event) => this.setState({country_id: event.nativeEvent.text})}
                                        >
                                        +98
                                    </Input>
                                    <Input
                                        keyboardType="numeric"
                                        placeholder="###-####-###"
                                        maxLength={10}
                                        onChange={(event) => this.setState({phone_number: event.nativeEvent.text})}
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
                        </View>
                    </SwiperFlatList>
                </View>  
            </Content>    
        </Container>
    );
  }
}
 
export const { width, height } = Dimensions.get('window');
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    height:height*0.87
  },
  child: {
    height: height*0.905,
    width,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  text: {
    marginTop: height*0.1,
    fontSize: width * 0.08,
    color:"#1bbbc4",
  },
  form:{
    width: width*0.6,
    marginTop: height*0.1,
  },
  form_btn:{
    marginTop: height*0.2,
    marginLeft: width*0.05,
    width:width*0.5,
    backgroundColor:"#1bbbc4",
  },
  img:{
      width:width*0.8,
      height:width*0.8*1.7,
      marginTop: width*0.1,
      justifyContent: 'center',
      alignItems: 'stretch',
      resizeMode: 'stretch',
  },
});