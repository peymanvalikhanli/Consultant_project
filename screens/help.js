import React from 'react';
import { StyleSheet, Image, View, BackAndroid, Dimensions } from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, List, ListItem, Thumbnail, Body, Left, Right, Switch, Title } from 'native-base';

import Orientation from 'react-native-orientation';

//import footer style
import footer_styles from './style/footer';
import main_styles from './style/main';

import lang from './localization/fa.json';

import Pdf from 'react-native-pdf';

export default class help_page extends React.Component {

    constructor() {
        super();
        this.state = {
            page: 1,
        }
        Orientation.lockToPortrait();
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
    render() {
        var { navigate } = this.props.navigation;
        // const source = require('./asset/help.pdf');  // ios only
        const source = {uri:'http://app.fonoontadbir.ir/help/help.pdf',cache:true};
        
       
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
                            {lang.help}
                        </Title>
                    </Body>
                    <Right>
                    </Right>
                </Header>
                <Content>
                    <View style={styles.btn_container}>
                        <Button
                            onPress={() => this.setState({ page: this.state.page == 0 ? 0 : this.state.page - 1 })}>
                            <Icon style={footer_styles.header_btn} name='arrow-back' />
                        </Button>
                        <Button
                            onPress={() => this.setState({ page: this.state.page == 6 ? 6 : this.state.page + 1 })}>
                            <Icon style={footer_styles.header_btn} name='arrow-forward' />
                        </Button>

                    </View>
                    <View
                        style={styles.container}
                    >
                        <Pdf
                            source={source}
                            page={this.state.page}
                            onLoadComplete={(numberOfPages, filePath) => {
                                //console.log(`number of pages: ${numberOfPages}`);
                            }}
                            onPageChanged={(page, numberOfPages) => {
                                // console.log(`current page: ${page}`);
                            }}
                            onError={(error) => {
                                console.log(error);
                            }}
                            style={styles.pdf}
                        />
                    </View>
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

const styles = StyleSheet.create({
    btn_container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.9
    }
});