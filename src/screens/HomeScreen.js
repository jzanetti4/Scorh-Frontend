import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet
} from 'react-native';

export default class HomeScreen extends React.Component {
  //也可在这里定义每个页面的导航属性，这里的定义会覆盖掉别处的定义
  // static navigationOptions = {
  //     title: 'Page1',
  // };

  render() {
    const {navigation} = this.props;
    return <View style={{flex: 1, backgroundColor: "gray",marginTop: 30}}>
      <Text style={styles.text}>欢迎来到Page1</Text>
      <Button
          title="Go Back"
          onPress={() => {
            navigation.goBack();
          }}
      />
      <Button
          title="改变主题色"
          onPress={() => {
            navigation.setParams({theme:{
                tintColor:'orange',
                updateTime:new Date().getTime()
              }})
          }}
      />
    </View>
  }
}
const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: 'white'
  }
});
