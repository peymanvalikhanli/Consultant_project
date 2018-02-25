import React from 'react';
import {StyleSheet, Image} from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, List, ListItem, Thumbnail, Body, Left, Right, Switch } from 'native-base';

import UserAvatar from 'react-native-user-avatar';
//import footer style
import footer_styles from './style/footer';

import profile_styles from './style/profile';


export default class profile_page extends React.Component{

    async componentWillMount() {
        await Expo.Font.loadAsync({
          'Roboto': require('native-base/Fonts/Roboto.ttf'),
          'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        });
      }

    static navigationOptions = {
        title:'',
        
    }; 
    render(){ 
        var {navigate}=this.props.navigation; 
        return(
            <Container>
                sss
                <UserAvatar name="ت ص و ی ر" size={150} />
                <Text>نام و نام خانوادگی</Text>
                <Text></Text>
                <Text>+۹۸ ۹۳۶ ۵۸۲ ۰۷۲۳</Text>
                 <List>
                    <ListItem itemDivider>
                        <Text></Text>
                    </ListItem>     
                    <ListItem icon>
                        <Left>
                            <Icon name="map" />
                        </Left>
                        <Body>
                            <Text>زبان</Text>
                        </Body>
                        <Right>
                            <Icon name="arrow-forward" />
                        </Right>
                    </ListItem>
                    <ListItem icon>
                    <Left>
                        <Icon name="mail" />
                    </Left>
                    <Body>
                        <Text>پیام ها</Text>
                    </Body>
                    <Right>
                        <Icon name="arrow-forward" />
                    </Right>
                    </ListItem>
                    <ListItem itemDivider>
                        <Text></Text>
                    </ListItem>     
                    <ListItem icon>
                        <Left>
                            <Icon name="card" />
                        </Left>
                        <Body>
                        <Text>عکس کارت ملی</Text>                           
                        </Body>
                        <Right>
                            <Icon name="checkmark" />
                        </Right>
                    </ListItem>
                    <ListItem icon>
                    <Left>
                        <Icon name="card" />
                    </Left>
                    <Body>
                        <Text>عکس شناسنامه</Text>
                    </Body>
                    <Right>
                        <Icon name="checkmark" />
                    </Right>
                    </ListItem>
                    <ListItem itemDivider>
                        <Text></Text>
                    </ListItem>     
                    <ListItem icon>
                        <Left>
                            <Icon name="help-buoy" />
                        </Left>
                        <Body>
                        <Text>راهنما</Text>                           
                        </Body>
                        <Right>
                            <Icon name="arrow-forward" />
                        </Right>
                    </ListItem>
                </List>
            <Content />
            <Footer 
                style={ footer_styles.footer_body }
            >
                <FooterTab>
                    <Button 
                        vertical
                        onPress={()=>this.props.navigation.navigate("files") }
                    >
                        <Icon active name="folder-open" style={footer_styles.footer_btn} />
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


