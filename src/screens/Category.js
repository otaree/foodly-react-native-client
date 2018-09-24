import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import ProductList from '../components/ProductList';

class Category extends Component {
    static navigationOptions = ({ navigation, navigationOptions }) => {
        const { params } = navigation.state;
        return {
            title: params.title
        }
    }

    static propTypes = {
        navigation: PropTypes.object.isRequired,
    }

    render() {
        return (
            <View style={styles.container}>
                <ProductList 
                    address={`categories/title/${this.props.navigation.state.params.title}`}
                    routeName="CategoryProduct"  
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
});

export default Category;