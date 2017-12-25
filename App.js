import React from 'react';
import TabNavigator from 'react-native-tab-navigator';
import { AsyncStorage, Dimensions, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Joke from './src/Jokes.js'
import Fav from './src/Fav.js'

const deviceW = Dimensions.get('window').width

const basePx = 375

function px2dp(px) {
  return px * deviceW / basePx
}

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedTab: 'jokes'
    }
  }

  render() {
    return (
      <TabNavigator tabBarStyle={styles.tabBar}>
        <TabNavigator.Item
          titleStyle={styles.title}
          selected={this.state.selectedTab === 'jokes'}
          title="Jokes"
          renderIcon={() => <Ionicons name="ios-home-outline" size={px2dp(22)} color="#FFF" />}
          renderSelectedIcon={() => <Ionicons name="ios-home" size={px2dp(22)} color="#3496f0" />}
          onPress={() => this.setState({ selectedTab: 'jokes' })}>
          <Joke updated={this.forceUpdateOnFav.bind(this)} />
        </TabNavigator.Item>
        <TabNavigator.Item
          titleStyle={styles.title}
          selected={this.state.selectedTab === 'fav'}
          title="Favorites"
          renderIcon={() => <Ionicons name="ios-heart-outline" size={px2dp(22)} color="#FFF" />}
          renderSelectedIcon={() => <Ionicons name="ios-heart" size={px2dp(22)} color="#3496f0" />}
          onPress={() => {
            this.setState({ selectedTab: 'fav' })
          }}>
          <Fav />
        </TabNavigator.Item>
      </TabNavigator>
    );
  }
}

const styles = StyleSheet.create({
  tabBar: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7BBEE8'
  },
  title: {
    color: 'white'
  }
});