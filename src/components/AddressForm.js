import React, { Component } from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

class AddressForm extends Component {
    static propTypes = {
        address: PropTypes.object,
        onSubmit: PropTypes.func.isRequired
    }

    state = {
        address: {
            addressLine1: "",
            addressLine2: "",
            city: "",
            phone: "",
            pincode: "",
            state: ""
        },
        addressEmpty: true
    }

    componentDidMount() {
        if (Object.keys(this.props.address).length > 0) {
            this.setState({
                address: this.props.address,
                addressEmpty: false
            })
        }
    }

    _handleChangeText = (type, text) => {
        this.setState(prevState => {
            return {
                address: {
                    ...prevState.address,
                    [type]: text
                }
            };
        })
    }

    _checkError = () => {
        let isError = false;
    }

    _handleSubmit = () => {
        this.props.onSubmit(this.state.address);      
    }

    render() {
        return (
            <View style={styles.page}>
                <ScrollView contentContainerStyle={styles.container}>
                    <Text style={styles.text}>My Address</Text>
                    <TextInput
                        onChangeText={(text) => this._handleChangeText('phone', text)}
                        underlineColorAndroid="transparent"
                        style={styles.textInput} 
                        placeholder="mobile no." 
                        keyboardType="numeric"
                        value={this.state.address.phone}
                    />
                    <TextInput
                        onChangeText={(text) => this._handleChangeText('addressLine1', text)}
                        underlineColorAndroid="transparent"
                        style={styles.textInput} 
                        placeholder="address line 1" 
                        value={this.state.address.addressLine1}
                    />
                    <TextInput
                        onChangeText={(text) => this._handleChangeText('addressLine2', text)}
                        underlineColorAndroid="transparent"
                        style={styles.textInput} 
                        placeholder="address line 2"
                        value={this.state.address.addressLine2}
                    />
                    <TextInput
                        onChangeText={(text) => this._handleChangeText('city', text)}
                        underlineColorAndroid="transparent"
                        style={styles.textInput} 
                        placeholder="city" 
                        value={this.state.address.city}
                    />
                    <TextInput
                        onChangeText={(text) => this._handleChangeText('pincode', text)}
                        underlineColorAndroid="transparent"
                        style={styles.textInput} 
                        placeholder="pincode"
                        keyboardType="numeric"
                        value={this.state.address.pincode}
                    />
                    <TextInput
                        onChangeText={(text) => this._handleChangeText('state', text)}
                        underlineColorAndroid="transparent"
                        style={styles.textInput}
                        placeholder="state"
                        value={this.state.address.state}
                    />

                    <TouchableOpacity style={styles.btn} onPress={this._handleSubmit}>
                        <Text style={styles.btnText}>{ this.state.addressEmpty ? "Submit Address" : "Submit Changes" }</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        width: "100%"
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: "90%",

    },
    textInput: {
        fontSize: 14,
        width: '90%',
        marginLeft: "5%",
        padding: 10,
        height: 40,
        fontWeight: '600',
        marginVertical: 10,
        borderWidth: 0.7,
        borderRadius: 3,
        borderColor: '#999'
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    btn: {
        width: '60%',
        marginTop: 15,
        borderWidth: 0.7,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#8c67ef',
        borderRadius: 3,
    },
    btnText: {
        color:  'white',
        fontSize: 18,
        fontWeight: 'bold'
    }
});

export default AddressForm;