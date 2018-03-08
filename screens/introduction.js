
import React, { PureComponent } from 'react';
import { Dimensions, Image, StyleSheet, View, NetInfo } from 'react-native';

import { Container, Header, Content, Footer, Button, Icon, Text, Body, Left, Right ,Form, Item, Input, Label } from 'native-base';

//http://app.fonoontadbir.ir/controller_robo/controller_locations.php

import SwiperFlatList from 'react-native-swiper-flatlist';

//import footer style
import footer_styles from './style/footer';


NetInfo.isConnected.fetch().then(isConnected => {
    alert('First, is ' + (isConnected ? 'online' : 'offline'));
  });
  function handleFirstConnectivityChange(isConnected) {
    alert('Then, is ' + (isConnected ? 'online' : 'offline'));
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      handleFirstConnectivityChange
    );
  }
  NetInfo.isConnected.addEventListener(
    'connectionChange',
    handleFirstConnectivityChange
  );

 
export default class App extends PureComponent {

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
      }
   
    }

    btn_send_OnClick (){
        alert("phone number is :\n"+this.state.country_id+""+this.state.phone_number);
    }

    render() {
    return (
       <Container>
            <Header style={footer_styles.header}/>
            <Content>
                <View style={styles.container}>
                    <SwiperFlatList
                    showPagination
                    >
                        <View style={styles.child}>
                            <Body>
                                <Image
                                    source={require("./img/introduction.gif")}
                                />
                            </Body>
                        </View>
                        <View style={styles.child}>
                            
                        </View>
                        <View style={styles.child}>
                            <Body>
                                <Text style={styles.text}>
                                ورود به سیستم 
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
                                        keyboardType="phone-pad"
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
                                            ارسال 
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
});