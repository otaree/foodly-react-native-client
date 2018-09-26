import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import RazorpayCheckout from 'react-native-razorpay';

import AddressForm from '../components/AddressForm';
import { toRupee } from '../services/conversion';
import { setAddress } from '../actions/user';

class Order extends Component {
    static navigationOptions = {
        title:  "Order"
    }

    static propTypes = {
        user: PropTypes.object,
        isAddressEmpty: PropTypes.bool,
        navigation: PropTypes.object,
        items: PropTypes.array.isRequired,
        token: PropTypes.string.isRequired,
        dispatch: PropTypes.func.isRequired
    }

    state = {
        editAddress: false
    }

    componentDidMount() {
        if (this.props.isAddressEmpty) {
            this.setState({ editAddress: true })
        }
    }

    _handlePress = () => {
        this.setState({ editAddress: true })
    }

    _setAddress = async (address) => {
        try {
            await this.props.dispatch(setAddress(address, this.props.token));
            this.setState({ editAddress: false })
        } catch (error) {
            console.log("ERROR")
        }
    }

    _handleOrderPress = () => {
        // var options = {
        //     description: 'Credits towards consultation',
        //     image: 'https://i.imgur.com/3g7nmJC.png',
        //     currency: 'INR',
        //     key: 'rzp_test_1DP5mmOlF5G5ag',
        //     amount: '5000',
        //     name: 'foo',
        //     prefill: {
        //       email: 'void@razorpay.com',
        //       contact: '9191919191',
        //       name: 'Razorpay Software'
        //     },
        //     theme: {color: '#F37254'}
        //   }
        //   RazorpayCheckout.open(options).then((data) => {
        //     // handle success
        //     Alert.alert(`Success: ${data.razorpay_payment_id}`);
        //   }).catch((error) => {
        //     // handle failure
        //     Alert.alert(`Error: ${error.code} | ${error.description}`);
        //   });
    }

    _calculateTotal = () => {
        return this.props.items.reduce((acc, curr) => acc + (curr.product.price * curr.qty), 0)
    }
    
    render() {
        const { address } = this.props.user;
        return (
            <View style={styles.container}>
                {
                    this.state.editAddress
                    ?
                    (
                        <AddressForm 
                            address={ this.props.isAddressEmpty ? {} : this.props.user.address }
                            onSubmit={this._setAddress}
                        />
                    )
                    :
                    (
                        <View style={styles.address}>
                            <View style={styles.addressContainer}>
                                <Text style={styles.title}>My Address</Text>
                                <Text style={styles.text}>Phone: {address.phone}</Text>
                                <Text style={styles.text}>Address line 1: {address.addressLine1}</Text>
                                <Text style={styles.text}>Address line 2: {address.addressLine2}</Text>
                                <Text style={styles.text}>City: {address.city}</Text>
                                <Text style={styles.text}>Pincode: {address.pincode}</Text>
                                <Text style={styles.text}>State: {address.state}</Text>
                                <TouchableOpacity style={styles.btn} onPress={this._handlePress}>
                                    <Text style={styles.btnText}>Edit</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.totalPrice}>Total price: {'\u20B9'}{ toRupee(this._calculateTotal()) }</Text>
                            <TouchableOpacity style={styles.orderBtn} onSubmit={this._handleOrderPress}>
                                <Text style={styles.orderBtnText}>continue</Text>
                            </TouchableOpacity>
                        </View>
                    )

                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 5
    },
    address: {
        flex: 1,
        width: "100%",
        alignItems: 'center'
    },
    addressContainer: {
        width: "80%",
        paddingVertical: 10,
        borderWidth: 0.8,
        borderRadius: 5,
        marginTop: 10
    },
    btn: {
        width: '100%',
        borderTopWidth: 0.8,
        paddingVertical: 5
    },
    btnText: {
        color: '#8c67ef',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center'
    },
    text: {
        paddingLeft: "5%",
    },
    totalPrice: {
        textAlign: 'right',
        fontWeight: 'bold',
        marginVertical: 10
    },
    orderBtn: {
        borderTopWidth: 0.8,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: '#8c67ef'
    },
    orderBtnText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center'
    }
});

const mapStateToProps = state => {
    return {
        user: state.user.user,
        isAddressEmpty: state.user.user.address ? Object.keys(state.user.user.address).length === 0 : true,
        items: state.cart.items,
        token: state.user.token
    };
};

export default connect(mapStateToProps)(Order);