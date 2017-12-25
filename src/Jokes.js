import React from 'react';
import Swiper from 'react-native-deck-swiper';
import { AsyncStorage, ActivityIndicator, StyleSheet, Text, ToastAndroid, View } from 'react-native';

export default class Jokes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cards: null,
      swipedAllCards: false,
      swipeDirection: '',
      isSwipingBack: false,
      cardIndex: 0,
      page: 1
    }
  }

  componentWillMount() {
    console.log(this.state.card)
    if (this.state.cards == null) {
      this.getJokesFromApi()
        .then((data) => {
          this.setState({
            cards: data.results
          })
        });
    }
  }

  async getJokesFromApi() {
    var page = this.state.page
    var headers = {
      Accept: 'application/json'
    }
    var url = `https://icanhazdadjoke.com/search?page=${page}`

    const res = await fetch(url, {
      method: "GET",
      headers: headers
    });

    return await res.json();
  }

  // Fetch more jokes
  async swipedAll() {
    var page = this.state.page
    this.setState({
      page: page + 1,
      cards: null
    });
    this.getJokesFromApi()
      .then((data) => {
        this.setState({
          cards: data.results
        })
      })
  }

  // Add to favorites
  async swipedRight(cardIndex) {
    try {
      const joke_liked = this.state.cards[cardIndex]
      var local_jokes = await AsyncStorage.getItem('Jokes')
      if (local_jokes === null) {
        local_jokes = new Array()
      } else {
        local_jokes = JSON.parse(local_jokes)
        exists = this.checkjoke(local_jokes, joke_liked.id)
        if (exists) {
          ToastAndroid.show('Joke already present in favorites', ToastAndroid.SHORT);
          return
        }
      }
      local_jokes.push(joke_liked)

      await AsyncStorage.setItem('Jokes', JSON.stringify(local_jokes));

    } catch (error) {
      // Error retrieving data
      console.log('err ' + error)
    }
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
    if (this.state.cards == null) {
      return (
        <View style={styles.container}>
          <Text fontSize={24}>Hold your horses, while things get stable</Text><ActivityIndicator size="large" color="#00ff00" />
        </View>
      );
    }
    else {
      return (
        <View style={styles.container}>
          <Swiper
            cards={this.state.cards}
            renderCard={(card) => {
              return (
                <View style={styles.card} key={card.id}>
                  <Text style={styles.text}>{card.joke}</Text>
                </View>
              )
            }}
            onSwipedRight={(cardIndex) => { this.swipedRight(cardIndex) }}
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
