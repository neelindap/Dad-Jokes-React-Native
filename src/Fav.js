import React from 'react';
import Swiper from 'react-native-deck-swiper';
import { AsyncStorage, ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default class Fav extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            cards: null
        }
    }

    componentWillMount() {
        // console.log('mounted')
        this.loadFav()
    }

    forceUpdateHandler() {
        // console.log('forceupdate - fav')
        this.forceUpdate();
    };

    async loadFav() {
        try {
            var local_jokes = await AsyncStorage.getItem('Jokes')
            if (local_jokes !== null) {
                local_jokes = JSON.parse(local_jokes)
                this.setState({
                    cards: local_jokes
                })
            }
        } catch (error) {
            // Error retrieving data
            console.log('err ' + error)
        }
    }

    render() {
        if (this.state.cards == null) {
            return (
                <View style={styles.container}>
                    <Text fontSize={24}>Looks like you haven't liked any jokes yet</Text>
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
                        infinite={true}
                        cardIndex={0}
                        backgroundColor={'#FFF'}
                        animateOverlayLabelsOpacity
                        animateCardOpacity>
                    </Swiper>
                </View>
            )
        }
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
