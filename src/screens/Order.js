import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Order extends Component {
    
    render() {
        return (
            <View>
                <Text>Order</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({});

const mapStateToProps = state => {
    return {
        user: state.user.user
    };
};

export default connect(mapStateToProps)(Order);