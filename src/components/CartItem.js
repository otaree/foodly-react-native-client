import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

import { toRupee } from '../services/conversion';
import { incrementItem, decrementItem, deleteItem } from '../actions/cart';


class CartItem extends Component {

    static propTypes = {
        item : PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired
    }

    _handleIncrement = () => {
        this.props.dispatch(incrementItem(this.props.item.product._id))
    }

    _handleDecrement = () => {
        this.props.dispatch(decrementItem(this.props.item));
    }

    _handleDelete = () => {
        this.props.dispatch(deleteItem(this.props.item.product._id))
    }

    _calculateTotal = (rate, qty) => {
        return Number(rate) * qty;
    }

    render() {
        return (
            <View
                style={styles.container}
            >
                <Image
                    style={styles.image}
                    source={{ uri: this.props.item.product.img }}
                    resizeMode="contain"
                />
                <View style={styles.productDetail}>
                    <Text>{ this.props.item.product.title }</Text>
                    <View style={styles.qtyContainer}>
                        <Text style={styles.qtyText}>Qty: { this.props.item.qty }</Text>
                        <TouchableOpacity 
                            style={styles.actionsBtn}
                            onPress={this._handleIncrement}
                        >
                            <Ionicons 
                                name="ios-arrow-dropup-circle" 
                                size={20} 
                                color="black"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.actionsBtn}
                            onPress={this._handleDecrement}
                        >
                            <Ionicons 
                                name="ios-arrow-dropdown-circle" 
                                size={20} 
                                color="black"
                            />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={styles.removeBtn}
                        onPress={this._handleDelete}
                    >
                        <Text style={styles.removeBtnText}>Remove</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.priceContainer}>
                    <Text style={styles.priceQtyText}>{'\u20B9'}{ toRupee(this.props.item.product.price) }</Text>
                    <Text style={styles.priceQtyText}>x {this.props.item.qty}</Text>
                    <Text style={styles.hr}></Text>
                    <Text>{'\u20B9'}{ toRupee(this._calculateTotal(this.props.item.product.price, this.props.item.qty)) }</Text>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginVertical: 10
    },
    image: {
        width: '30%',
        height: 70
    },
    productDetail: {
        width: "50%",
    },
    qtyContainer: {
        flexDirection: 'row', 
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingVertical: 10
    },
    qtyText: {
        marginRight: 5
    }
    ,
    actionsBtn: {
        marginHorizontal: 7,
    },
    removeBtn: {
        backgroundColor: '#e05969',
        borderRadius: 5,
        width: '60%'
    },
    removeBtnText: {
        color: 'white',
        fontSize: 16,
        paddingVertical: 5,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    priceContainer: {},
    priceQtyText: {
        textAlign: 'right'
    },
    hr: {
        borderBottomWidth: 0.7
    }

})



export default connect()(CartItem);