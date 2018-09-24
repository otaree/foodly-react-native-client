import React, { Component } from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import Api from '../config/Api';
import ProductListItem from '../components/ProductListItem';

class ProductList extends Component {
    static propTypes = {
        address: PropTypes.string.isRequired,
    };

    state = {
        products: [],
        next: false,
        isLoading: true,
        page: 0
    }

    componentDidMount () {
        this._fetchProducts();
    }

    _fetchProducts = async (limit=15) => {
        try {
            this.setState({ isLoading: true })
            const response = await Api(`/${this.props.address}?limit=${limit}&page=${this.state.page}`)
            this.setState(prevState => {
                return {
                   products: [...prevState.products, ...response.data.products],
                   next: response.data.next,
                   isLoading: false,
                   page: prevState.page + 1
                };
            });
       } catch (error) {
            console.log(error.response.data)
       }
    }

    _loadProducts = () => {
        if (!this.state.next) return;
        this._fetchProducts(); 
    }

 

    _renderItem = ({ item }) => (
        <ProductListItem 
            product={item}
            routeName={this.props.routeName}
        />
    )

    _renderFooter = () => {
        if (!this.state.next) return null;
        
        if (this.state.isLoading) {
            return (
                <ActivityIndicator size="large" color="#8c67ef" />
            );
        }
        return (
           <View style={styles.footer}>
                <TouchableOpacity
                    onPress={this._loadProducts}
                    style={styles.btn}
                >
                    <Text style={styles.btnText}>load</Text>
                </TouchableOpacity>
           </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList 
                    data={this.state.products}
                    keyExtractor={(item, index) => item._id}
                    ListFooterComponent={this._renderFooter}
                    renderItem={this._renderItem}
                    numColumns={3}
                    refreshing={this.state.isLoading}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white'
    },
    footer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        backgroundColor: '#8c67ef',
        width: '40%',
        marginVertical: 10,
        borderRadius: 50
    },
    btnText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white'
    }
})

export default ProductList;