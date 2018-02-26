import React from 'react';
import {StyleSheet} from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, List, ListItem, Thumbnail, Body } from 'native-base';

//import footer style
import footer_styles from './style/footer';

import home_styles from './style/home';


export default class message_page extends React.Component{

    async componentWillMount() {
        await Expo.Font.loadAsync({
          'Roboto': require('native-base/Fonts/Roboto.ttf'),
          'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        });
      }

    static navigationOptions = {
        title:'پیام',
        header: null,
    }; 
    render(){ 
        var {navigate}=this.props.navigation; 
        return(
            <Container style={ home_styles.body }>
               <Content>
                    <List
                        dataSource={this.ds.cloneWithRows(this.state.listViewData)}
                        renderRow={data =>
                        <ListItem>
                            <Text> {data} </Text>
                        </ListItem>}
                        renderLeftHiddenRow={data =>
                        <Button full onPress={() => alert(data)}>
                            <Icon active name="information-circle" />
                        </Button>}
                        renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                        <Button full danger onPress={_ => this.deleteRow(secId, rowId, rowMap)}>
                            <Icon active name="trash" />
                        </Button>}
                        leftOpenValue={75}
                        rightOpenValue={-75}
                    />
                </Content>
            <Footer 
                style={ footer_styles.footer_body }
            >
                <FooterTab>
                    <Button 
                        vertical
                        onPress={()=>this.props.navigation.navigate("files") }
                    >
                        <Icon active name="folder-open" style={footer_styles.footer_btn} />
                        <Text style={footer_styles.footer_btn}>پرونده</Text>
                    </Button>
                    <Button 
                        vertical
                        onPress={()=>this.props.navigation.navigate("message") }
                    >
                        <Icon active name="ios-chatbubbles" style={footer_styles.footer_btn} />
                        <Text style={footer_styles.footer_btn}>پیام</Text>
                    </Button>
                    <Button 
                        vertical
                        onPress={()=>this.props.navigation.navigate("Home") }
                    >
                        <Icon active name="md-home" style={footer_styles.footer_btn} />
                        <Text style={footer_styles.footer_btn}>خانه</Text>
                    </Button>
                </FooterTab>
            </Footer>
            </Container>
        );
    }

} 


