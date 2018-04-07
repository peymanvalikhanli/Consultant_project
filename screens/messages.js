import React from 'react';
import {StyleSheet, ListView} from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, List, ListItem, Thumbnail, Body, Left, Right } from 'native-base';

//import footer style
import footer_styles from './style/footer';

import home_styles from './style/home';

import server_url from './config/server_url.json';

import axios from 'axios';

const datas = [];

export default class message_page extends React.Component{
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
          basic: true,
          listViewData: datas,
          data:null
        };
        this.get_data();
      }
      deleteRow(secId, rowId, rowMap) {
        rowMap[`${secId}${rowId}`].props.closeRow();
        const newData = [...this.state.listViewData];
        newData.splice(rowId, 1);
        this.setState({ listViewData: newData });
        axios.post(server_url.messages, {
            act: 'messages_delete',
            ID: this.state.data[rowId].ID,
          })
          .then(response=> {
            if(response.data.msg != undefined || response.data.msg != null){
                this.get_data();
            }
          
        })
        .catch(function (error) {
            console.log(error);
          });
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

    get_data(){
        axios.post(server_url.messages, {
            act: 'messages_get_by_user_id',
            user_id: '58',
          })
          .then(response=> {
            
            if(response.data.msg != undefined || response.data.msg != null){
                alert(response.data.msg);
            }
            if(response.data[0]!= undefined || response.data[0] != null ){
                //  if(response.data.data == 1){
                //      this.setState({is_change_page:true});
                //     this.change_page();
                //  }else{
                //     alert(lang.error);
                //  }
                response.data.length   
                this.setState({data:response.data});
                data_res  = {};
                for(index= 0 ; index<response.data.length ; index++){
                    data_res[index]=response.data[index].title;
                }
                this.setState({listViewData:data_res});                
            }
        })
        .catch(function (error) {
            console.log(error);
          });
    }
        

    render(){ 
       // this.get_data();
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


