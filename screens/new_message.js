import React from 'react';
import { StyleSheet, ListView, AsyncStorage, BackAndroid } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Icon, Text, List, ListItem, Thumbnail, Body, Left, Right, Form, Item, Input, Label } from 'native-base';
import Orientation from 'react-native-orientation';
//import footer style
import footer_styles from './style/footer';

import lang from './localization/fa.json';

import home_styles from './style/home';

import server_url from './config/server_url.json';

import axios from 'axios';

export default class new_message_page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: null,
            text: null,
            user_id: 0
        };
        Orientation.lockToPortrait();

        AsyncStorage.getItem('user_profile', (err, result) => {
            if (result != null) {
                //  alert(result);
                var global_data = JSON.parse(result);
                this.setState({ user_id: global_data.ID });
            }
        });

    }

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
        title: '',
        header: null,
    };

    btn_send_on_click() {
        axios.post(server_url.messages, {
            act: 'messages_set',
            user_id: this.state.user_id,
            title: this.state.title,
            text: this.state.text,
            created_by: '0',
            replay_date: '0',
            replay: '0'
        })
            .then(response => {

                if (response.data.msg != undefined || response.data.msg != null) {
                    alert(response.data.msg);
                }
                if (response.data.data != undefined || response.data.data != null) {
                    // if(response.data.data == 1){
                    //     this.setState({is_change_page:true});
                    //     this.change_page();
                    // }else{
                    //    alert(lang.error);
                    // }
                    alert(lang.send_message);
                }

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        var { navigate } = this.props.navigation;
        var parent = this.props.navigation.state.params.parent;
        return (
            <Container>
                <Header style={footer_styles.header}>
                    <Left>
                        <Button transparent
                            onPress={() => this.props.navigation.replace(parent)}>
                            <Icon style={footer_styles.header_btn} name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={footer_styles.header_btn}>
                            {lang.new_message}
                        </Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <Button
                        style={{ marginTop: 20 }}
                        onPress={() => { this.btn_send_on_click() }}>
                        <Body>
                            <Text style={{ color: "#ffffff" }}>
                                {lang.send}
                            </Text>
                        </Body>
                    </Button>
                    <Form >
                        <Item floatingLabel>
                            <Label>
                                {lang.title}
                            </Label>
                            <Input
                                maxLength={50}
                                onChange={(event) => this.setState({ title: event.nativeEvent.text })}
                            />

                        </Item>
                        <Item floatingLabel>
                            <Label>
                                {lang.text}
                            </Label>
                            <Input
                                multiline
                                onChange={(event) => this.setState({ text: event.nativeEvent.text })}
                            />

                        </Item>
                    </Form>

                </Content>
                <Footer
                    style={footer_styles.footer_body}
                >
                    <FooterTab
                        style={footer_styles.footer_body}>
                        <Button
                            vertical
                            onPress={() => this.props.navigation.replace("files")}
                        >
                            <Icon active name="folder-open" style={footer_styles.footer_btn} />
                            <Text style={footer_styles.footer_btn}>
                                {lang.file}
                            </Text>
                        </Button>
                        <Button
                            vertical
                            onPress={() => this.props.navigation.replace("message")}
                        >
                            <Icon active name="ios-chatbubbles" style={footer_styles.footer_btn} />
                            <Text style={footer_styles.footer_btn}>
                                {lang.messages}
                            </Text>
                        </Button>
                        <Button
                            vertical
                            onPress={() => this.props.navigation.replace("Home")}
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


