import React from 'react';
import {StyleSheet, Image, View} from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, List, ListItem, Thumbnail, Body, Left, Right, Switch, Title } from 'native-base';

import UserAvatar from 'react-native-user-avatar';
//import footer style
import footer_styles from './style/footer';
import main_styles from './style/main';

export default class profile_page extends React.Component{

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
                        <Button transparent
                        onPress={()=>this.props.navigation.navigate("Home") }>
                        <Icon style={footer_styles.header_btn} name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={footer_styles.header_btn}>پروفایل</Title>
                    </Body>
                    <Right>
                        <Button transparent> 
                            <Text style={footer_styles.header_btn}>ویرایش</Text>
                        </Button>
                    </Right>
                </Header>
                <Content>                   
                <View style={{flex: 1, flexDirection: 'column',justifyContent: 'center',alignItems: 'center',padding: 10 , backgroundColor:'#ffffff'}}>
                    <View>
                        <UserAvatar name="ت ص و ی ر" size={150} />
                    </View>
                    <View>
                        <Text>نام و نام خانوادگی</Text>
                    </View>
                    <View>
                        <Text>+۹۸ ۹۳۶ ۵۸۲ ۰۷۲۳</Text>
                    </View>
                </View>
                 <List style={main_styles.list}>
                    <ListItem itemDivider style={main_styles.list_div}>
                        <Text></Text>
                    </ListItem>     
                    <ListItem icon>
                        <Left>
                            
                            <Icon name="arrow-back" />
                        </Left>
                        <Body>
                            <Text>زبان</Text>
                        </Body>
                        <Right>
                        <Icon name="map" />
                        </Right>
                    </ListItem>
                    <ListItem icon>
                    <Left>
                        
                        <Icon name="arrow-back" />
                    </Left>
                    <Body>
                        <Text>پیام ها</Text>
                    </Body>
                    <Right>
                    <Icon name="mail" />
                    </Right>
                    </ListItem>
                    <ListItem itemDivider style={main_styles.list_div}>
                        <Text></Text>
                    </ListItem>     
                    <ListItem icon>
                        <Left>
                        <Icon name="checkmark" /> 
                        </Left>
                        <Body>
                        <Text>عکس کارت ملی</Text>                           
                        </Body>
                        <Right>
                        <Icon name="card" />
                        </Right>
                    </ListItem>
                    <ListItem icon>
                    <Left>
                    <Icon name="checkmark" />
                    </Left>
                    <Body>
                        <Text>عکس شناسنامه</Text>
                    </Body>
                    <Right>
                    <Icon name="card" />
                    </Right>
                    </ListItem>
                    <ListItem itemDivider style={main_styles.list_div}>
                        <Text></Text>
                    </ListItem>     
                    <ListItem icon>
                        <Left>
                            <Icon name="arrow-back" />
                        </Left>
                        <Body>
                        <Text>راهنما</Text>                           
                        </Body>
                        <Right>
                        <Icon name="help-buoy" />
                        </Right>
                    </ListItem>
                </List>
            </Content>
            <Footer 
                style={ footer_styles.footer_body }
            >
                <FooterTab
                style={ footer_styles.footer_body }>
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


