import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';

import { toRupee } from '../services/conversion'; 

const ProductListItem = ({ product, navigation, routeName }) => (
    <TouchableOpacity onPress={() => navigation.push(routeName, { id: product._id }) } style={styles.container}>
        <Image 
            style={styles.image}
            source={{ uri: product.img }}
        />
        <Text style={styles.title}>{ product.title }</Text>
        <Text style={styles.price}>{'\u20B9'}{ toRupee(product.price) }</Text>
    </TouchableOpacity>
);

ProductListItem.propType = {
    product: PropTypes.object.isRequired,
    navigation: PropTypes.object,
    routeName: PropTypes.string.isRequired,
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        marginVertical: 5,
        width: '30%',
        marginHorizontal: '1.5%',
    },
    image: {
        width: '100%',
        height: 100
    },
    price: {
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    }
});

export default withNavigation(ProductListItem);