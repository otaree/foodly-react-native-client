import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CartItem from '../components/CartItem';
import { toRupee } from '../services/conversion';

class Cart extends Component {
    static navigationOptions = {
        // header: null
        title: 'My Cart'
    }

    static propTypes = {
        navigation: PropTypes.object.isRequired,
        items: PropTypes.array
    }


    _totalPrice = () => {
        return this.props.items.reduce((acc, curr) => acc + (Number(curr.product.price) * curr.qty ), 0)
    }
   

    _renderFooter = () => {
        return (
            <View style={styles.footerContainer}>
                <Text style={styles.totalPriceText}>Total: {'\u20B9'}{ toRupee(this._totalPrice()) }</Text>
                <TouchableOpacity 
                    style={styles.btn}
                    onPress={() => this.props.navigation.navigate("Order")}
                >
                    <Text style={styles.btnText}>place order</Text>
                </TouchableOpacity>
            </View>
        );
    }

    _renderItem = ({ item }) => {
        return (
            <CartItem 
                item={item}
            />
        );
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    this.props.items.length === 0 ? 
                    <Text style={styles.noItem}>No Item added to cart</Text>
                    :
                    <FlatList 
                        data={this.props.items}
                        keyExtractor={(item, index) => item.product._id}
                        ListFooterComponent={this._renderFooter}
                        renderItem={this._renderItem}
                    />
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    footerContainer: {
        alignItems: 'flex-end',
        marginVertical: 15
    },
    totalPriceText: {
        fontWeight: 'bold',
        marginVertical: 10
    },
    btn: {
        backgroundColor: '#8c67ef',
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    btnText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white',
        paddingLeft: 5
    },
    noItem: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingVertical: 10,
        textAlign: 'center',
        color: '#8c67ef'
    }
});

const mapStateToProps = state => {
    return {
        items: state.cart.items
    }
}

export default connect(mapStateToProps)(Cart);