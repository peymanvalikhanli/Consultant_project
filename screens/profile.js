import React from 'react';
import { StyleSheet, Image, View, AsyncStorage } from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, List, ListItem, Thumbnail, Body, Left, Right, Switch, Title } from 'native-base';
import Orientation from 'react-native-orientation';
import PhotoUpload from 'react-native-photo-upload';
//import footer style
import footer_styles from './style/footer';
import main_styles from './style/main';

import lang from './localization/fa.json';

import server_url from './config/server_url.json';

import axios from 'axios';


export default class profile_page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            avatar: null,
            uri: [{ size: 0 }],
            user_profile:
                {
                    name: "",
                    last_name: "",
                    tel: ""
                },
            user_avatar: null 
        };
        Orientation.lockToPortrait();
        AsyncStorage.getItem('user_profile', (err, result) => {
            if (result != null) {
                //  alert(result);
                var global_data = JSON.parse(result);
                this.setState({ user_profile: global_data });
                this.get_data();
            }
        });

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
        axios.post(server_url.attachments, {
            act: 'attachments_get_by_user_id',
            user_id: this.state.user_profile.ID,
        })

            .then(response => {

                if (response.data.msg != undefined || response.data.msg != null) {
                    alert(response.data.msg);
                }
                if (response.data[0] != undefined || response.data[0] != null) {
                    var url_avatar = null;
                    for (index = 0; index < response.data.length; index++) {
                        if (response.data[index].name == 'avatar') {
                            url_avatar = response.data[index].url;
                        }
                    }
                    
                    this.setState({ user_avatar: 'http://app.fonoontadbir.ir/controller_robo/'+url_avatar });
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    save_avatar() {
        var timestamp = Date.now();
        var photo = {
            file: this.state.avatar,
            type: "avatar",
            user_id: this.state.user_profile.ID

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
            })
    }
    render() {
        var { navigate } = this.props.navigation;
        return (
            <Container>
                <Header style={footer_styles.header}>
                    <Left>
                        <Button transparent
                            onPress={() => this.props.navigation.replace("Home")}>
                            <Icon style={footer_styles.header_btn} name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={footer_styles.header_btn}>
                            {lang.profile}
                        </Title>
                    </Body>
                    <Right>
                        <Button transparent
                            onPress={() => this.props.navigation.replace("edit_profile")}
                        >
                            <Text style={footer_styles.header_btn}>ویرایش</Text>
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 10, backgroundColor: '#ffffff', paddingBottom: 30 }}>
                        <View>
                            <PhotoUpload
                                onPhotoSelect={avatar => {
                                    if (avatar) {
                                        this.setState({
                                            avatar: avatar
                                        });
                                        this.save_avatar();
                                        console.log('Image base64 string: ', avatar)
                                    }
                                }}
                            >
                                <Image
                                    style={{
                                        paddingVertical: 30,
                                        width: 150,
                                        height: 150,
                                        borderRadius: 75
                                    }}
                                    resizeMode='cover'
                                    source={
                                        this.state.user_avatar == null ? require('./img/default_avatar.jpg') : { uri: this.state.user_avatar }
                                    }
                                />
                            </PhotoUpload>
                        </View>
                        <View>
                            <Text>{this.state.user_profile.name + " " + this.state.user_profile.last_name}</Text>
                        </View>
                        <View>
                            <Text>{this.state.user_profile.tel}</Text>
                        </View>
                    </View>
                    <List style={main_styles.list}>
                        {/* <ListItem itemDivider style={main_styles.list_div}>
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
                        </ListItem> */}
                        <ListItem itemDivider style={main_styles.list_div}>
                            <Text></Text>
                        </ListItem>
                        <ListItem icon
                            onPress={() => this.props.navigation.replace("upload_file", { name: lang.national_card_imge, parent: "profile" })}
                        >
                            <Left>
                                <Icon name="checkmark" />
                            </Left>
                            <Body>
                                <Text>
                                    {lang.national_card_imge}
                                </Text>
                            </Body>
                            <Right>
                                <Icon name="card" />
                            </Right>
                        </ListItem>
                        {/* <ListItem icon
                            onPress={() => this.props.navigation.replace("upload_file", { name: lang.Photo_ID, parent: "profile" })}
                        >
                            <Left>
                                <Icon name="checkmark" />
                            </Left>
                            <Body>
                                <Text>
                                    {lang.Photo_ID}
                                </Text>
                            </Body>
                            <Right>
                                <Icon name="card" />
                            </Right>
                        </ListItem> */}
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


