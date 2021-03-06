import React from 'react';
import { Dimensions, StyleSheet, ListView, Image, AsyncStorage, BackAndroid } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Icon, Text, List, ListItem, Thumbnail, Body, Left, Right, Form, Item, Input, Label } from 'native-base';
import Orientation from 'react-native-orientation';
//import footer style
import footer_styles from './style/footer';

import lang from './localization/fa.json';

import home_styles from './style/home';
import server_url from './config/server_url.json';

import PhotoUpload from 'react-native-photo-upload'

export default class upload_file_page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            last_name: null,
            avatar: null,
            uri: [{ size: 0 }],
            user_id: null
        };
        Orientation.lockToPortrait();

        AsyncStorage.getItem('user_profile', (err, result) => {
            if (result != null) {
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

    btn_save() {
        var timestamp = Date.now();
        var photo = {
            file: this.state.avatar,
            // uri: "./img/take_mage.png",
            // type: 'image/jpeg',
            // name: 'photo' + timestamp + '.jpg',
            // size: this.state.avatar.size,
            type: this.props.navigation.state.params.name,
            user_id: this.state.user_id

        };
        const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            }
        }
        var request = _.extend({
            body: JSON.stringify(photo)
        }, config);
        fetch(server_url.upload, request)
            .then((response) => response.json())
            .then((data) => {
                alert(lang.success);
                this.props.navigation.replace(this.props.navigation.state.params.parent);
            })

    }

    render() {
        var { navigate } = this.props.navigation;
        var name = this.props.navigation.state.params.name;
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
                            {name}
                        </Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <Button
                        style={{ marginTop: 20 }}
                        onPress={() => { this.btn_save() }}>
                        <Body>
                            <Text style={{ color: "#ffffff" }}>
                                {lang.save}
                            </Text>
                        </Body>
                    </Button>
                    <Body>
                        <PhotoUpload
                            onPhotoSelect={avatar => {
                                if (avatar) {
                                    this.setState({
                                        avatar: avatar
                                    });
                                    console.log('Image base64 string: ', avatar);
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

export const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    img: {
        paddingVertical: 30,
        width: width * 0.9,
        height: height * 0.7,
        borderRadius: 5,
        marginTop: 20,
    },
});