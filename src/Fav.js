import React from 'react'
import Swiper from 'react-native-deck-swiper'
import { AsyncStorage, StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'

import { getFavJokes } from './actions'

class Fav extends React.Component {

    constructor(props) {
        super(props)
    }

    componentWillMount() {
        this.props.dispatch(getFavJokes())
    }

    render() {
        if (this.props.cards == null) {
            return (
                <View style={styles.container}>
                    <Text fontSize={36}>Looks like you didn't like any of jokes.</Text>
                </View>
            );
        }
        else {
            return (
                <View style={styles.container}>
                    <Swiper
                        cards={this.props.cards}
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
    const { favorites } = state
  
    return favorites
  }
  
  export default connect(mapStateToProps)(Fav)