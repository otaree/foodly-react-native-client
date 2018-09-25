import React, { Component } from 'react';
import { View, Text, ScrollView, StatusBar, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import Api from '../config/Api';
import { toRupee } from '../services/conversion';
import { addItem } from '../actions/cart';

class Product extends Component {
    state = {
        product: {},
        isLoading: true
    }

    componentDidMount() {
        const id = this.props.navigation.state.params.id;
        this._loadProduct(id);
    }

    _loadProduct = async (id) => {
        try {
            this.setState({ isLoading: true });
            const response = await Api.get(`/products/${id}`);
            this.setState(prevState => {
                return {
                    product: response.data,
                    isLoading: false
                };
            });
        } catch (error) {
            console.log(error);
        }
    }

    _productInCart = () => {
        return !!this.props.items.find(item => item.product._id === this.state.product._id)
    }

    _addToCart = () => {
        this.props.dispatch(addItem(this.state.product, this.props.token));
    }

    _renderButton = () => {
        if (this._productInCart()) {
            return (
                <View style={[styles.btn, styles.btnDisabled]}>
                    <Text style={styles.btnText}>Added to cart</Text>
                </View>
            );
        }

        return (
            <TouchableOpacity style={styles.btn} onPress={this._addToCart}>
                <Text style={styles.btnText}>Add to cart</Text>
            </TouchableOpacity>
        );
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator animating color="#8c67ef" size="large" />
                </View>
            );
        }

        const { product } = this.state;

        return (
            <View style={styles.page}>
                <ScrollView scrollEnabled={true} contentContainerStyle={styles.container}>
                    <Image 
                        source={{ uri: product.img }}
                        style={styles.image}
                    />
                    <Text style={styles.titleText}>{ product.title }</Text>
                    <View style={styles.discriptionContainer}>
                        <Text>{ product.description }</Text>
                    </View>
                    <Text style={styles.priceText}>{'\u20B9'}{ toRupee(product.price) }</Text>
                    { this._renderButton() }
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: 'white'
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: 250,
        width: '80%',
        marginTop: StatusBar.currentHeight
    },
    discriptionContainer: {
        padding: 10,
        paddingLeft: 20,
        borderWidth: 0.8,
        borderRadius: 5,
        marginHorizontal: 10,
        marginVertical: 5,
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 5
    },
    priceText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    btn: {
        backgroundColor: '#8c67ef',
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginTop: 5,
        marginBottom: 10,
        borderRadius: 5
    },
    btnDisabled: {
        backgroundColor: '#b29bef'
    },
    btnText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    }
});

const mapStateToProps = state => {
    return {
        items: state.cart.items,
        token: state.user.token
    };
}

export default connect(mapStateToProps)(Product);