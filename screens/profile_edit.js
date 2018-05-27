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


export default class profile_edit_page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_profile:
                {
                    name: "",
                    last_name: "",
                    tel: ""
                },
            name: null,
            last_name: null
        };
        Orientation.lockToPortrait();
        AsyncStorage.getItem('user_profile', (err, result) => {
            if (result != null) {
                //  alert(result);
                var global_data = JSON.parse(result);
                this.setState({ user_profile: global_data });
                this.setState({ name: global_data.name });
                this.setState({ last_name: global_data.last_name });

            }
        });
    }

    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
        return true;
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

    btn_save_onclick() {
        axios.post(server_url.mobo_user, {
            act: 'mobo_users_edit_profile_by_ID',
            ID: this.state.user_profile.ID,
            name: this.state.name,
            last_name: this.state.last_name
        })
            .then(response => {

                if (response.data.msg != undefined || response.data.msg != null) {
                    axios.post(server_url.mobo_user, {
                        act: 'mobo_users_get_by_ID',
                        ID: this.state.user_profile.ID,
                    })
                        .then(response => {
                            if (response.data[0].ID != undefined || response.data[0].ID != null) {
                                //this.get_data();
                                //alert(response.data[0].ID);
                                this.setState({ user_id: response.data[0].ID });
                                try {
                                    AsyncStorage.setItem('user_profile', JSON.stringify(response.data[0]));
                                } catch (error) {
                                    alert("can not write data in device");
                                }

                            } else {
                                alert(JSON.stringify(response.data[0]));
                            }

                        })
                        .catch(function (error) {
                            alert("data load error");
                        });
                    //alert(response.data.msg);
                    alert(lang.success);
                    this.props.navigation.replace("profile");

                }
                if (response.data.data != undefined || response.data.data != null) {

                    alert(lang.send_message);
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
                    <Left>
                        <Button transparent
                            onPress={() => this.props.navigation.replace("profile")}>
                            <Icon style={footer_styles.header_btn} name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={footer_styles.header_btn}>
                            {lang.profile}
                        </Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <Form >
                        <Item floatingLabel>
                            <Label>
                                {lang.name}
                            </Label>
                            <Input
                                maxLength={50}
                                onChange={(event) => this.setState({ name: event.nativeEvent.text })}
                                value={this.state.name}
                            />

                        </Item>
                        <Item floatingLabel>
                            <Label>
                                {lang.last_name}
                            </Label>
                            <Input
                                maxLength={50}
                                onChange={(event) => this.setState({ last_name: event.nativeEvent.text })}
                                value={this.state.last_name}
                            />

                        </Item>
                    </Form>
                    <Button
                        style={{ marginTop: 20 }}
                        onPress={() => { this.btn_save_onclick() }}>
                        <Body>
                            <Text style={{ color: "#ffffff" }}>
                                {lang.save}
                            </Text>
                        </Body>
                    </Button>
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


