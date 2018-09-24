import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import ProductList from '../components/ProductList';

class AllProducts extends Component {

    static navigationOptions = {
        title: 'foodly',
        headerTintColor: '#8c67ef',
              headerTitleStyle: {
                fontWeight: 'bold',
                fontStyle: 'italic'
              },
    }

    render() {
        return (
            <View style={styles.container}>
                <ProductList address="products" routeName="Product" />
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

export default AllProducts;