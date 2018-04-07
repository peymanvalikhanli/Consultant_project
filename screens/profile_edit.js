import React from 'react';
import {StyleSheet, ListView} from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Icon, Text, List, ListItem, Thumbnail, Body, Left, Right, Form, Item, Input, Label } from 'native-base';
import Orientation from 'react-native-orientation';
//import footer style
import footer_styles from './style/footer';

import lang from './localization/fa.json';

import home_styles from './style/home';


export default class profile_edit_page extends React.Component{
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
    render(){ 
        var {navigate}=this.props.navigation; 
        return(
            <Container>
                <Header style={footer_styles.header}>
                    <Left>
                        <Button transparent
                        onPress={()=>this.props.navigation.replace("profile") }>
                        <Icon style={footer_styles.header_btn} name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={footer_styles.header_btn}>
                        {lang.new_message}
                        </Title>
                    </Body>
                    <Right/>
                </Header>
               <Content>
                    <Form >
                        <Item floatingLabel>
                            <Label>
                                {lang.name}
                            </Label>
                            <Input
                                maxLength={50}
                                onChange={(event) => this.setState({name: event.nativeEvent.text})}
                                />
                                
                        </Item>
                        <Item floatingLabel>
                            <Label>
                                {lang.last_name}
                            </Label>
                            <Input
                                maxLength={50}
                                onChange={(event) => this.setState({last_name: event.nativeEvent.text})}
                                />
                                
                        </Item>
                    </Form>
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


