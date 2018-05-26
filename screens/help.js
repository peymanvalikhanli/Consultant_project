import React from 'react';
import {StyleSheet, Image, View, BackAndroid} from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, List, ListItem, Thumbnail, Body, Left, Right, Switch, Title } from 'native-base';

import UserAvatar from 'react-native-user-avatar';
//import footer style
import footer_styles from './style/footer';
import main_styles from './style/main';

import lang from './localization/fa.json';

export default class help_page extends React.Component{

    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress', this.handleBackButton);
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
    render(){ 
        var {navigate}=this.props.navigation; 
        return(
            <Container> 
                <Header style={footer_styles.header}>
                    <Left>
                        <Button transparent
                        onPress={()=>this.props.navigation.replace("Home") }>
                        <Icon style={footer_styles.header_btn} name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={footer_styles.header_btn}>
                            {lang.send_file}
                        </Title>
                    </Body>
                    <Right>
                    </Right>
                </Header>
                <Content>                   
                <List style={main_styles.list}>    
                    <ListItem icon
                    onPress={()=>this.props.navigation.replace("upload_file",{name:lang.Insurance_policy_of_the_previous_year,parent:"send_file"})}
                    >
                        <Left>
                            <Icon name="arrow-back" />
                        </Left>
                        <Body>
                            <Text style={main_styles.list_text_color}>
                            {lang.Insurance_policy_of_the_previous_year}
                            </Text>
                        </Body>
                    </ListItem>
                    <ListItem icon
                    onPress={()=>this.props.navigation.replace("upload_file",{name:lang.Proposal_form_filled,parent:"send_file"})}
                    >
                        <Left>
                            <Icon name="arrow-back" />
                        </Left>
                        <Body>
                            <Text style={main_styles.list_text_color}>
                            {lang.Proposal_form_filled}
                            </Text>
                        </Body>
                    </ListItem>
                    <ListItem icon
                    onPress={()=>this.props.navigation.replace("upload_file",{name:lang.Power_of_Attorney,parent:"send_file"})}
                    >
                        <Left>
                            <Icon name="arrow-back" />
                        </Left>
                        <Body>
                            <Text style={main_styles.list_text_color}>
                            {lang.Power_of_Attorney}
                            </Text>
                        </Body>
                    </ListItem>
                    <ListItem icon
                    onPress={()=>this.props.navigation.replace("upload_file",{name:lang.Power_of_Attorney_Damage,parent:"send_file"})}
                    >
                        <Left>
                            <Icon name="arrow-back" />
                        </Left>
                        <Body>
                            <Text style={main_styles.list_text_color}>
                                {lang.Power_of_Attorney_Damage}
                            </Text>
                        </Body>
                    </ListItem>
                    <ListItem itemDivider style={main_styles.list_div}>
                        <Text></Text>
                    </ListItem>
                    <ListItem icon
                    onPress={()=>this.props.navigation.replace("upload_file",{name:lang.national_card_imge,parent:"send_file"})}
                    >
                        <Left>
                            <Icon name="arrow-back" />
                        </Left>
                        <Body>
                            <Text style={main_styles.list_text_color}>
                                {lang.national_card_imge}
                            </Text>
                        </Body>
                    </ListItem>
                    {/* <ListItem icon
                    onPress={()=>this.props.navigation.replace("upload_file",{name:lang.Photo_ID,parent:"send_file"})}
                    >
                        <Left>
                            <Icon name="arrow-back" />
                        </Left>
                        <Body>
                            <Text style={main_styles.list_text_color}>
                                {lang.Photo_ID}
                            </Text>
                        </Body>
                    </ListItem> */}
                </List>
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


