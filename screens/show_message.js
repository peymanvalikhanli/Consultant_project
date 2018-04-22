import React from 'react';
import { StyleSheet, ListView, AsyncStorage } from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, List, ListItem, Thumbnail, Body, Left, Right } from 'native-base';

//import footer style
import footer_styles from './style/footer';

import main_styles from './style/main';

import home_styles from './style/home';

import lang from './localization/fa.json';

import server_url from './config/server_url.json';

import axios from 'axios';


export default class show_message extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            text: ""
        };
        this.get_data();

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

    get_data() {
        axios.post(server_url.messages, {
            act: 'messages_get_by_ID',
            ID: this.props.navigation.state.params.ID
        })

            .then(response => {

                if (response.data.msg != undefined || response.data.msg != null) {
                    alert(response.data.msg);
                }
                if (response.data[0] != undefined || response.data[0] != null) {
                    this.setState({ title: response.data[0].title });
                    this.setState({ text: response.data[0].text });
                   // alert(this.state.text);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    render() {

        var { navigate } = this.props.navigation;
        return (
            <Container>
                <Header style={footer_styles.header}>
                    <Right />
                </Header>
                <Content>
                    <ListItem itemDivider style={main_styles.list_div}>
                        <Body>
                            <Text>{lang.title}</Text>
                        </Body>
                    </ListItem>
                    <ListItem icon>
                        <Left />
                        <Body>
                            <Text>
                                {this.state.title}
                            </Text>
                        </Body>
                        <Right />
                    </ListItem>
                    <ListItem itemDivider style={main_styles.list_div}>
                        <Body>
                            <Text>{lang.text}</Text>
                        </Body>
                    </ListItem>
                    <ListItem icon>
                        <Left />
                        <Body>
                            <Text>
                                {this.state.text}
                            </Text>
                        </Body>
                        <Right />
                    </ListItem>
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


