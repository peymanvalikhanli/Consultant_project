import React from 'react';
import { StyleSheet, Image, View, AsyncStorage, ListView, BackAndroid } from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, List, ListItem, Thumbnail, Body, Left, Right, Switch, Title } from 'native-base';

import UserAvatar from 'react-native-user-avatar';
//import footer style
import footer_styles from './style/footer';

import main_styles from './style/main';

import lang from './localization/fa.json';

import server_url from './config/server_url.json';

import axios from 'axios';

const datas = [];

export default class send_file_page extends React.Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            basic: true,
            listViewData_open: datas,
            listViewData_close: datas,
            listViewData_cancel: datas,
            data: null,
            user_id: 0
        };

        AsyncStorage.getItem('user_profile', (err, result) => {
            if (result != null) {
                //  alert(result);
                var global_data = JSON.parse(result);
                this.setState({ user_id: global_data.ID });
                this.get_data();
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

    get_data() {
        axios.post(server_url.files, {
            act: 'files_get_by_user_id',
            user_id: this.state.user_id,
        })

            .then(response => {

                if (response.data.msg != undefined || response.data.msg != null) {
                    alert(response.data.msg);
                }
                if (response.data[0] != undefined || response.data[0] != null) {
                    response.data.length

                    data_res_open = {};
                    data_res_close = {};
                    data_res_cancel = {};
                    var index_open = 0;
                    var index_close = 0;
                    var index_cancel = 0;
                    var main_data = response.data;
                    for (index = 0; index < response.data.length; index++) {
                        if (response.data[index].type == -1) {
                            data_res_cancel[index_cancel] = response.data[index].title;
                            main_data[index].list_index = index_cancel;
                            index_cancel++;
                        } else if (response.data[index].type == 0) {
                            data_res_open[index_open] = response.data[index].title;
                            main_data[index].list_index = index_open;
                            index_open++;
                        } else if (response.data[index].type == 1) {
                            data_res_close[index_close] = response.data[index].title;
                            main_data[index].list_index = index_close;
                            index_close++;
                        }
                        //alert(data_res[index]);
                    }
                    this.setState({ listViewData_cancel: data_res_cancel });
                    this.setState({ listViewData_open: data_res_open });
                    this.setState({ listViewData_close: data_res_close });
                    this.setState({ data: main_data });
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    static navigationOptions = {
        title: '',
        header: null,
    };



    btn_show_file(secId, rowId, rowMap, file_type) {
        
        for (index = 0; index < this.state.data.length; index++) {
            if (this.state.data[index].list_index == rowId && this.state.data[index].type == file_type) {
               // alert("this is a message"+ this.state.data[index].comment);
               this.props.navigation.replace("show_file", { ID: this.state.data[index].ID });
            }
        }
    }

    render() {
        var { navigate } = this.props.navigation;
        return (
            <Container>
                <Header style={footer_styles.header}>
                    <Left>
                    </Left>
                    <Body>
                        <Title style={footer_styles.header_btn}></Title>
                    </Body>
                    <Right>
                    </Right>
                </Header>
                <Content>
                    <List style={main_styles.list}>
                        <ListItem itemDivider style={main_styles.list_div}>
                            <Body>
                                <Text>
                                    {lang.file_open}
                                </Text>
                            </Body>
                        </ListItem>
                    </List>
                    <List style={main_styles.list}
                        dataSource={this.ds.cloneWithRows(this.state.listViewData_open)}
                        renderRow={(data, secId, rowId, rowMap) =>
                            <ListItem icon
                                onPress={_ => this.btn_show_file(secId, rowId, rowMap, 0)}
                            >
                                <Right />
                                <Body>
                                    <Text>{data}</Text>
                                </Body>
                                <Left />
                            </ListItem>}
                        renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                            <Button full danger>
                                <Icon active name="trash" />
                            </Button>}
                        rightOpenValue={0}
                    />
                    <List style={main_styles.list}>
                        <ListItem itemDivider style={main_styles.list_div}>
                            <Body>
                                <Text>
                                    {lang.file_close}
                                </Text>
                            </Body>
                        </ListItem>
                    </List>
                    <List style={main_styles.list}
                        dataSource={this.ds.cloneWithRows(this.state.listViewData_close)}
                        renderRow={(data, secId, rowId, rowMap) =>
                            <ListItem icon
                            onPress={_ => this.btn_show_file(secId, rowId, rowMap, 1)}>
                                <Right />
                                <Body>
                                    <Text>{data}</Text>
                                </Body>
                                <Left />
                            </ListItem>}
                        renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                            <Button full danger>
                                <Icon active name="trash" />
                            </Button>}
                        rightOpenValue={0}
                    />
                    <List style={main_styles.list}>
                        <ListItem itemDivider style={main_styles.list_div}>
                            <Body>
                                <Text>
                                    {lang.file_cancel}
                                </Text>
                            </Body>
                        </ListItem>
                    </List>
                    <List style={main_styles.list}
                        dataSource={this.ds.cloneWithRows(this.state.listViewData_cancel)}
                        renderRow={(data, secId, rowId, rowMap) =>
                            <ListItem icon
                            onPress={_ => this.btn_show_file(secId, rowId, rowMap, -1)}>
                                <Right />
                                <Body>
                                    <Text>{data}</Text>
                                </Body>
                                <Left />
                            </ListItem>}
                        renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                            <Button full danger>
                                <Icon active name="trash" />
                            </Button>}
                        rightOpenValue={0}
                    />
                </Content>
                <Footer
                    style={footer_styles.footer_body}
                >
                    <FooterTab
                        style={footer_styles.footer_body}>
                        <Button
                            vertical
                        >
                            <Icon active name="folder-open" style={footer_styles.footer_btn_active} />
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


