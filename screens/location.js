import React from 'react';
import {StyleSheet, ListView, View} from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Icon, Text, List, ListItem, Thumbnail, Body, Left, Right } from 'native-base';

import MapView from 'react-native-maps';

//import footer style
import footer_styles from './style/footer';

import home_styles from './style/home';


export default class location_page extends React.Component{

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
        const { region } = this.props;
        var {navigate}=this.props.navigation; 
        return(
            <Container>
                <Header style={footer_styles.header}>
                    <Left>
                        <Button transparent
                        onPress={()=>this.props.navigation.navigate("Home") }>
                        <Icon style={footer_styles.header_btn} name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={footer_styles.header_btn}>ارسال موقیعت</Title>
                    </Body>
                    <Right/>
                </Header>
               <Content>
               <View style ={styles.container}>
        <Text>
            test page
            </Text>
        <MapView
          style={styles.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
        </MapView>
      </View>
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

const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      height: 400,
      width: 400,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
  });

