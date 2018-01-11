import React from 'react';
import TabNavigator from 'react-native-tab-navigator';
import { AsyncStorage, ActivityIndicator, Dimensions, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Provider } from 'react-redux'
import storeFactory from './src/store'
import { getJoke } from './src/actions'

import Joke from './src/Jokes.js'
import Fav from './src/Fav.js'

import defaultInitialState from './initialState.json'

let store = storeFactory(defaultInitialState)

const deviceW = Dimensions.get('window').width
const basePx = 375

function px2dp(px) {
  return px * deviceW / basePx
}

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedTab: 'jokes',
      initializeApp: true
    }
  }

  componentWillMount() {
    var self = this;
    AsyncStorage.getItem('joke-store').then((value) => {

      const initialState = (value !== null) ?
        JSON.parse(value) : defaultInitialState

      store = storeFactory(initialState)
      self.setState({
        initializeApp: false
      })

    })

  }

  render() {
    if (this.state.initializeApp) {
      return (
        <View style={styles.container}>
          <Text fontSize={36}>Hold your horses, while things get stable</Text><ActivityIndicator size="large" color="#00ff00" />
        </View>
      )
    }
    else {
      return (
        <Provider store={store}>
          <TabNavigator tabBarStyle={styles.tabBar}>
            <TabNavigator.Item
              titleStyle={styles.title}
              selectedTitleStyle={styles.selectedTitle}
              selected={this.state.selectedTab === 'jokes'}
              title="Jokes"
              renderIcon={() => <Ionicons name="ios-home-outline" size={px2dp(22)} color="#fffacd" />}
              renderSelectedIcon={() => <Ionicons name="ios-home" size={px2dp(22)} color="#1f3a93" />}
              onPress={() => this.setState({ selectedTab: 'jokes' })}>
              <Joke />
            </TabNavigator.Item>
            <TabNavigator.Item
              titleStyle={styles.title}
              selectedTitleStyle={styles.selectedTitle}
              selected={this.state.selectedTab === 'fav'}
              title="Favorites"
              renderIcon={() => <Ionicons name="ios-heart-outline" size={px2dp(22)} color="#fffacd" />}
              renderSelectedIcon={() => <Ionicons name="ios-heart" size={px2dp(22)} color="#1f3a93" />}
              onPress={() => {
                this.setState({ selectedTab: 'fav' })
              }}>
              <Fav />
            </TabNavigator.Item>
          </TabNavigator>
        </Provider>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabBar: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E90FF'
  },
  title: {
    color: '#fffacd'
  },
  selectedTitle: {
    color: '#1f3a93'
  }
});