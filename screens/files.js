import React from 'react';
import {StyleSheet, Image, View} from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, List, ListItem, Thumbnail, Body, Left, Right, Switch, Title } from 'native-base';

import UserAvatar from 'react-native-user-avatar';
//import footer style
import footer_styles from './style/footer';
import main_styles from './style/main';

export default class send_file_page extends React.Component{

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
    render(){ 
        var {navigate}=this.props.navigation; 
        return(
            <Container> 
                <Header style={footer_styles.header}>
                    <Left>
                    </Left>
                    <Body>
                        <Title style={footer_styles.header_btn}></Title>
                    </Body>
                    <Right>
                    </Right>
                </Header>   
                <Content>                
                <List style={main_styles.list}>    
                    <ListItem itemDivider style={main_styles.list_div}>
                        <Text>
                            پرونده های درحال اجرا
                        </Text>
                    </ListItem>
                    
                    <ListItem icon>
                        <Body>
                            <Text style={main_styles.list_text_color}>
                            بیمه نامه سال قبل
                            </Text>
                        </Body>
                        <Right>
                            <Icon name="arrow-forward" />
                        </Right>
                    </ListItem>
                    <ListItem itemDivider style={main_styles.list_div}>
                        <Text>
                            پرونده های انجام شده
                        </Text>
                    </ListItem>
                    <ListItem icon>
                        <Body>
                            <Text style={main_styles.list_text_color}>
                            کارت ملی
                            </Text>
                        </Body>
                        <Right>
                            <Icon name="arrow-forward" />
                        </Right>
                    </ListItem>
                    <ListItem itemDivider style={main_styles.list_div}>
                        <Text>
                            پرونده های لغو شده
                        </Text>
                    </ListItem>
                    <ListItem icon>
                        <Body>
                            <Text style={main_styles.list_text_color}>
                            کارت ملی
                            </Text>
                        </Body>
                        <Right>
                            <Icon name="arrow-forward" />
                        </Right>
                    </ListItem>
                    
                </List>
            </Content>
            <Footer 
                style={ footer_styles.footer_body }
            >
                <FooterTab>
                    <Button 
                        vertical
                        
                    >
                        <Icon active name="folder-open" style={footer_styles.footer_btn_active} />
                        <Text style={footer_styles.footer_btn}>پرونده</Text>
                    </Button>
                    <Button 
                        vertical
                        onPress={()=>this.props.navigation.navigate("message") }
                    >
                        <Icon active name="ios-chatbubbles" style={footer_styles.footer_btn} />
                        <Text style={footer_styles.footer_btn}>پیام</Text>
                    </Button>
                    <Button 
                        vertical
                        onPress={()=>this.props.navigation.navigate("Home") }
                    >
                        <Icon active name="md-home" style={footer_styles.footer_btn} />
                        <Text style={footer_styles.footer_btn}>خانه</Text>
                    </Button>
                </FooterTab>
            </Footer>
            </Container>
        );
    }

} 


