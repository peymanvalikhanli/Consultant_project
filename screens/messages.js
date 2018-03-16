import React from 'react';
import {StyleSheet, ListView} from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, List, ListItem, Thumbnail, Body, Left, Right } from 'native-base';

//import footer style
import footer_styles from './style/footer';

import home_styles from './style/home';

const datas = [
'نامه درخواست بیمه عمر',  
'خسارت ماشین',
'تبریک سال نو',  
'اتمام مدت یبمه آتش سوزی',  
'پیگری شخص ثالث',  
];

export default class message_page extends React.Component{
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
          basic: true,
          listViewData: datas,
        };
      }
      deleteRow(secId, rowId, rowMap) {
        rowMap[`${secId}${rowId}`].props.closeRow();
        const newData = [...this.state.listViewData];
        newData.splice(rowId, 1);
        this.setState({ listViewData: newData });
      }

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
        var {navigate}=this.props.navigation; 
        return(
            <Container>
                <Header style={footer_styles.header}>
                <Right>
                        <Button transparent
                        onPress={()=>this.props.navigation.replace("new_message") }
                        > 
                            <Text style={footer_styles.header_btn}>
                            جدید
                            </Text>
                        </Button>
                    </Right>
                </Header>
               <Content>
                    <List
                        dataSource={this.ds.cloneWithRows(this.state.listViewData)}
                        renderRow={data =>
                        <ListItem icon >
                            <Left style={{paddingLeft:10}}>
                              
                            </Left>
                            <Body>
                                <Text>{data}</Text>
                            </Body>
                            <Right>
                            <Icon name="mail"/>
                            </Right>
                        </ListItem>}
                        renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                        <Button full danger onPress={_ => this.deleteRow(secId, rowId, rowMap)}>
                            <Icon active name="trash" />
                        </Button>}
                         rightOpenValue={-75}
                    />
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
                        <Text style={footer_styles.footer_btn}>پرونده</Text>
                    </Button>
                    <Button 
                        vertical
                    >
                        <Icon active name="ios-chatbubbles" style={footer_styles.footer_btn_active} />
                        <Text style={footer_styles.footer_btn_active}>پیام</Text>
                    </Button>
                    <Button 
                        vertical
                        onPress={()=>this.props.navigation.replace("Home") }
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


