import React, { PureComponent } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';

import { Container, Header, Content, Footer, Button, Icon, Text, Body, Left, Right ,Form, Item, Input, Label } from 'native-base';


import SwiperFlatList from 'react-native-swiper-flatlist';

//import footer style
import footer_styles from './style/footer';
 
export default class App extends PureComponent {
    static navigationOptions = {
        title:'',
        header: null,
    }; 
    render() {
    return (
       <Container>
            <Header style={footer_styles.header}/>
            <Content>
                <View style={styles.container}>
                    <SwiperFlatList
                    showPagination
                    >
                        <View style={styles.child}>
                            <Image
                                source={require('./img/introduction.gif')}
                            />
                        </View>
                        <View style={styles.child}>
                            
                        </View>
                        <View style={styles.child}>
                        <Form>
                                <Item fixedLabel>
                                <Label>Username</Label>
                                <Input />
                                </Item>
                                <Item fixedLabel last>
                                <Label>Password</Label>
                                <Input />
                                </Item>
                            </Form>
                        </View>
                    </SwiperFlatList>
                </View>  
            </Content>    
        </Container>
    );
  }
}
 
export const { width, height } = Dimensions.get('window');
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  child: {
    height: height*0.905,
    width,
    justifyContent: 'center',
    backgroundColor: '#eeeeee',
  },
  text: {
    fontSize: width * 0.5,
    textAlign: 'center'
  }
});