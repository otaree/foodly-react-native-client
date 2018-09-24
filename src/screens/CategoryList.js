import React, { Component } from 'react';
import { ScrollView, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

class CategoryList extends Component {
    static propTypes = {
        navigation: PropTypes.object.isRequired,
    }

    static navigationOptions = {
        title: 'Categories'
    };

    render() {
        return (
            <ScrollView style={styles.container}>
                <TouchableOpacity style={styles.touchable} onPress={() => this.props.navigation.navigate('Category', { title: 'North Indian' })}>
                    <ImageBackground 
                        source={require('../assets/images/north_indian.png')}
                        style={styles.image}
                    >
                        <Text style={styles.text}>North Indian</Text>
                    </ImageBackground>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.touchable} onPress={() => this.props.navigation.navigate('Category', { title: 'South Indian' })}>
                    <ImageBackground 
                        source={require('../assets/images/south_indian.png')}
                        style={styles.image}
                    >
                        <Text style={styles.text}>South Indian</Text>
                    </ImageBackground>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.touchable} onPress={() => this.props.navigation.navigate('Category', { title: 'Dessert' })}>
                    <ImageBackground 
                        source={require('../assets/images/dessert.png')}
                        style={styles.image}
                    >
                        <Text style={styles.text}>Dessert</Text>
                    </ImageBackground>
                </TouchableOpacity>
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    touchable: {
    },
    image: {
        width: '100%',
        height: 100,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginVertical: 5,
        backgroundColor: '#999',
        borderRadius: 5,
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 22
    }
});

export default CategoryList;