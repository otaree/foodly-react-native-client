import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

class User extends Component {
    static propTypes = {
        navigation: PropTypes.object.isRequired,
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>User</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default User