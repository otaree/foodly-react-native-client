import React, { Component } from 'react';
import { View, Image, Text, SectionList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

import Api from '../config/Api';
import { toRupee } from '../services/conversion';

class OrderHistory extends Component {

    static navigationOptions = {
        title: "Order's History"
    }

    static propTypes = {
        token: PropTypes.string.isRequired
    }
    
    state = {
        orders: [],
        isLoading: true,
        page: 0,
        next: false
    }

    componentDidMount() {
        this._fetchOrders();
    }


    _fetchOrders = async (limit=2) => {
        try {
            this.setState({ isLoading: true });
            const response = await Api({ url: `/orders?limit=${limit}&page=${this.state.page}`, method: 'GET', headers: { 'Authorization': `bearer ${this.props.token}` } });
            const orders = response.data.orders.map((order) => {
                return {
                    title: order.created,
                    data: order.products
                }
            });
            this.setState(prevState => {
                return {
                    orders: [...prevState.orders, ...orders],
                    isLoading: false,
                    page: prevState.page + 1,
                    next: response.data.next
                };
            })
        } catch (error) {
            console.log("ERROR", error.response.data);
        }
    }

    _loadOrders = () => {
        if (!this.state.next) return;
        this._fetchOrders();
    }


    _renderItem = ({item, index, section}) => {
        return (
            <View key={item._id} style={styles.item}>
                <Image 
                    source={{ uri: item.product.img }}
                    style={styles.image}
                />
                <Text style={styles.title}>{ item.product.title }</Text>
                <View>
                    <Text style={styles.right}>{'\u20B9'}{ toRupee(item.product.price) }</Text>
                    <Text style={styles.right}>x{ item.qty }</Text>
                </View>
                <Text style={styles.title}>{'\u20B9'}{ toRupee(item.product.price * item.qty) }</Text>
            </View>
        );
    }

    _renderHeader = ({section: {title}}) => {
        return (
            <Text style={styles.headerTitle}>Order on {moment(title).format('dddd, MMMM Do YYYY, h:mm:ss a')}</Text>
          )
    }

    render() {
        if (this.state.isLoading && this.state.orders.length === 0) {
            return (
                <View style={styles.container}>
                    <Text style={styles.headerTitle}>No Order</Text>
                </View>
            );
        }
        return (
            <View style={styles.page}>
               <SectionList
                        renderSectionHeader={this._renderHeader}
                        renderItem={this._renderItem}
                        sections={this.state.orders}
                        keyExtractor={(item, index) => index}
                        onEndReachedThreshold={0.5}
                        onEndReached={this._loadOrders}
                />
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    item: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginVertical: 5,
        paddingHorizontal: 5
    },
    image: {
        height: 50,
        width: 50
    },
    title: {
        fontWeight: 'bold'
    },
    right: {
        textAlign: 'right'
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#8c67ef',
        paddingVertical: 10
    }
});

const mapStateToProps = state => {
    return {
        token: state.user.token
    };
}

export default connect(mapStateToProps)(OrderHistory);
