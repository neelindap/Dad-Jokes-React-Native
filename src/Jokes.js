import React from 'react';
import Swiper from 'react-native-deck-swiper';
import { AsyncStorage, ActivityIndicator, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import { connect } from 'react-redux'

import { getJokesFromApi, incrementPage, getFavJokes, setFavJoke  } from './actions'

class Jokes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      swipedAllCards: false,
      swipeDirection: '',
      isSwipingBack: false,
      cardIndex: 0
    }
  }

  componentWillMount() {
    this.props.dispatch(getJokesFromApi(this.props.jokes.page))
  }

  // Fetch more jokes
  swipedAll() {
    this.setState({cardIndex: 0})
    this.props.dispatch(incrementPage(this.props.page))
  }

  // Add to favorites
  async swipedRight(cardIndex) {
    this.setState({cardIndex})
    try {
      const joke_liked = this.props.jokes.cards[cardIndex]
      var fav_jokes = this.props.favorites

      if (fav_jokes.cards === null) {
        fav_jokes = new Array()
      } else {
        fav_jokes = fav_jokes.cards
        exists = this.checkjoke(fav_jokes, joke_liked.id)
        if (exists) {
          ToastAndroid.show('Joke already present in favorites', ToastAndroid.SHORT);
          return
        }
      }
      fav_jokes.push(joke_liked)
      this.props.dispatch(setFavJoke(fav_jokes))

      await AsyncStorage.setItem('joke-store', JSON.stringify(this.props))
      ToastAndroid.show('Joke (d)added to your favorites', ToastAndroid.SHORT);
    } catch (error) {
      console.log('err ' + error)
    }
  }

  swipedLeft(cardIndex){
    this.setState({cardIndex})
  }

  checkjoke(local_joke, jokeid) {
    for (i = 0; i < local_joke.length; i++) {
      var element = local_joke[i]
      if (element.id === jokeid) {
        return true
      }
    }
    return false
  }

  render() {
    if (this.props.jokes.fetched == false) {
      return (
        <View style={styles.container}>
          <Text fontSize={36}>Hold your horses, while things get stable</Text><ActivityIndicator size="large" color="#00ff00" />
        </View>
      );
    }
    else {
      return (
        <View style={styles.container}>
          <Swiper
            cards={this.props.jokes.cards}
            renderCard={(card) => {
              return (
                <View style={styles.card} key={card.id}>
                  <Text style={styles.text}>{card.joke}</Text>
                </View>
              )
            }}
            onSwipedRight={(cardIndex) => { this.swipedRight(cardIndex) }}
            onSwipedLeft={(cardIndex) => { this.swipedLeft(cardIndex) }}
            onSwipedAll={this.swipedAll.bind(this)}
            cardIndex={0}
            backgroundColor={'#FFF'}
            overlayLabels={{
              left: {
                title: 'BAD',
                style: {
                  label: {
                    backgroundColor: 'red',
                    borderColor: 'red',
                    color: 'white',
                    borderWidth: 1
                  },
                  wrapper: {
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-start',
                    marginTop: 30,
                    marginLeft: -30
                  }
                }
              },
              right: {
                title: 'DAD',
                style: {
                  label: {
                    backgroundColor: 'green',
                    borderColor: 'green',
                    color: 'white',
                    borderWidth: 1
                  },
                  wrapper: {
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    marginTop: 30,
                    marginLeft: 30
                  }
                }
              }
            }}
            animateOverlayLabelsOpacity
            animateCardOpacity>
          </Swiper>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  text: {
    textAlign: 'center',
    fontSize: 24,
    backgroundColor: 'transparent'
  }
});

function mapStateToProps(state) {
  const { jokes, favorites } = state

  return {
    jokes,
    favorites
  }
}

export default connect(mapStateToProps)(Jokes)