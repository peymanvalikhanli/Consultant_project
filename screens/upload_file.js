import React from 'react';
import {Dimensions, StyleSheet, ListView, Image} from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Icon, Text, List, ListItem, Thumbnail, Body, Left, Right, Form, Item, Input, Label } from 'native-base';
import Orientation from 'react-native-orientation';
//import footer style
import footer_styles from './style/footer';

import lang from './localization/fa.json';

import home_styles from './style/home';

import PhotoUpload from 'react-native-photo-upload'

export default class upload_file_page extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name:null, 
            last_name:null,
        };
        Orientation.lockToPortrait();
      }
      
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

    select_image(){
        alert('salam peyman jun');
    }

    render(){ 
        var {navigate}=this.props.navigation;
        var name = this.props.navigation.state.params.name ;
        var parent = this.props.navigation.state.params.parent ;
        return(
            <Container>
                <Header style={footer_styles.header}>
                    <Left>
                        <Button transparent
                        onPress={()=>this.props.navigation.replace(parent) }>
                        <Icon style={footer_styles.header_btn} name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={footer_styles.header_btn}>
                        {name}
                        </Title>
                    </Body>
                    <Right/>
                </Header>
               <Content>
                    <Body>
                        <PhotoUpload
                            onPhotoSelect={avatar => {
                                if (avatar) {
                                console.log('Image base64 string: ', avatar)
                                }
                            }}
                            >
                            <Image
                                style={styles.img}
                                resizeMode='cover'
                                source={require('./img/take_mage.png')}
                            />
                        </PhotoUpload>
                    </Body>
                    <Button
                    style={{marginTop:20}}>   
                        <Body>
                            <Text style={{color:"#ffffff"}}>
                                {lang.save}
                            </Text>
                        </Body>
                    </Button>
                
                </Content>
            <Footer 
                style={ footer_styles.footer_body }
            >
                 <FooterTab
                style={ footer_styles.footer_body }>
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
                    <Button 
                        vertical
                        onPress={()=>this.props.navigation.replace("Home") }
                    >
                        <Icon active name="md-home" style={footer_styles.footer_btn} />
                        <Text style={footer_styles.footer_btn}>
                            {lang.home}
                        </Text>
                    </Button>
                </FooterTab>
            </Footer>
            </Container>
        );
    }

} 

export const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    img:{
        paddingVertical: 30,
        width: width*0.9,
        height: width*0.9,
        borderRadius: 5,
        marginTop: 20,
    },
  });