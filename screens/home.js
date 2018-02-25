import React from 'react';
import {StyleSheet} from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, List, ListItem, Thumbnail, Body } from 'native-base';

//import footer style
import footer_styles from './style/footer';

import home_styles from './style/home';

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
  
    render(){ 
        var {navigate}=this.props.navigation; 
        return(
            <Container style={ home_styles.body }>
               <Header style={footer_styles.header}/>
                <List>
                    <ListItem style={ home_styles.clling } >
                    <Thumbnail square size={80} source={require('./img/img_call.png')} style={home_styles.btn_img} />
                    <Body>
                        <Text style={ home_styles.text }>تماس با مشاور</Text>
                        <Text note style={ home_styles.text }>_________________________________</Text>
                    </Body>
                    </ListItem>
                    <ListItem style={ home_styles.message }>
                    <Thumbnail square size={80} source={require('./img/img_new_meassage.png')} style={home_styles.btn_img} />
                    <Body>
                        <Text style={ home_styles.text }>ارسال پیام</Text>
                        <Text note style={ home_styles.text }>_________________________________</Text>
                    </Body>
                    </ListItem>
                    <ListItem style={ home_styles.file }
                    onPress={()=>this.props.navigation.navigate("send_file") }>
                    <Thumbnail square size={80} source={require('./img/img_file.png')} style={home_styles.btn_img} />
                    <Body>
                        <Text style={ home_styles.text }>ارسال مدارک</Text>
                        <Text note style={ home_styles.text }>_________________________________</Text>
                    </Body>
                    </ListItem>
                    <ListItem style={ home_styles.profile }
                     onPress={()=>this.props.navigation.navigate("profile") }>
                    <Thumbnail square size={80} source={require('./img/img_profile.png')} style={home_styles.btn_img} />
                    <Body>
                        <Text style={ home_styles.text }>پروفایل</Text>
                        <Text note style={ home_styles.text }>_________________________________</Text>
                    </Body>
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
                    <Button vertical>
                        <Icon active name="md-home" style={footer_styles.footer_btn_active} />
                        <Text style={footer_styles.footer_btn_active}>خانه</Text>
                    </Button>
                </FooterTab>
            </Footer>
            </Container>
        );
    }

} 


