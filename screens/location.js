import React from 'react';
import { Dimensions, StyleSheet, ListView, View, Geolocation, AsyncStorage } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Icon, Text, List, ListItem, Thumbnail, Body, Left, Right } from 'native-base';
import Orientation from 'react-native-orientation';
import MapView, { Marker, ProviderPropType } from 'react-native-maps';
//import footer style
import footer_styles from './style/footer';

import home_styles from './style/home';

import lang from './localization/fa.json';

import server_url from './config/server_url.json';

import axios from 'axios';


export default class location_page extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            latitude: 35.6970333,
            longitude: 51.3524348,
            error: null,
            user_profile:
                {
                    ID: null
                }
        };
        Orientation.lockToPortrait();
        AsyncStorage.getItem('user_profile', (err, result) => {
            if (result != null) {
                //  alert(result);
                var global_data = JSON.parse(result);
                this.setState({ user_profile: global_data });
            }
        });
        this.onMapPress = this.onMapPress.bind(this);
    }

    async componentWillMount() {
        await Expo.Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        });
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                });
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
    }

    static navigationOptions = {
        title: '',
        header: null,
    };

    onMapPress(e) {
        this.setState({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
            error: null,
        });
    }

    get_position() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                });
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
    }

    btn_send_location() {
        axios.post(server_url.user_location, {
            act: 'user_location_set',
            user_id: this.state.user_profile.ID,
            Lat: this.state.latitude,
            Lng: this.state.longitude,
            created_by: this.state.user_profile.ID
        })
            .then(response => {

                if (response.data.msg != undefined || response.data.msg != null) {
                    alert(lang.success);
                    this.props.navigation.replace("Home");

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
        const { region } = this.props;
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
                            {lang.send_location}
                        </Title>
                    </Body>
                    <Right>
                        <Button transparent
                            onPress={() => this.get_position()}>
                            <Icon style={footer_styles.header_btn} name='ios-locate-outline' />
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <Body>
                        <MapView
                            style={styles.map}
                            onPress={this.onMapPress}
                            region={{
                                latitude: this.state.latitude,
                                longitude: this.state.longitude,
                                latitudeDelta: 0.015,
                                longitudeDelta: 0.0121,
                            }}
                        >
                            <Marker
                                coordinate={{
                                    latitude: this.state.latitude,
                                    longitude: this.state.longitude
                                }}
                            />
                        </MapView>
                    </Body>
                    <Button
                        style={{ marginTop: 20 }}
                        onPress={() => { this.btn_send_location() }}>
                        <Body>
                            <Text style={{ color: "#ffffff" }}>
                                {lang.send}
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


export const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {

        height: 400,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        width: width,
        height: height * 0.8,
    },
});

