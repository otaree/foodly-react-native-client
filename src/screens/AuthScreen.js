import React, { Component } from 'react';
import { View, Alert,  StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import AuthForm from '../components/AuthForm';
import { signUp, login } from '../actions/user';

class AuthScreen extends Component {
    state = {
        isLogin: true
    }

    handleSubmit = ({ email, password }) => {
        if (this.state.isLogin) {
            this._login({ email, password });
        } else {
            this._signUp({ email, password });
        }
    }

    handleSwitch = () => {
        this.setState(prevState => ({
            isLogin: !prevState.isLogin
        }))
    }

    _signUp = async ({ email, password }) => {
        try {
            const res = await this.props.dispatch(signUp({ email, password }))
            Alert.alert('Registration successful');
        } catch (error) {
            Alert.alert('Registration unsuccessful');
        }
    }

    _login = async ({ email, password }) => {
        try {
            console.log('adfadfa');
            const res = await this.props.dispatch(login({ email, password }));
            this.props.navigation.navigate('App');
        } catch (error) {
            console.log("ERROR", error);
            // Alert.alert(error.error.message);
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <AuthForm
                    isLogin={this.state.isLogin}
                    onSubmitPress={this.handleSubmit}
                    onSwitchPress={this.handleSwitch}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#8c67ef'
    }
});

export default connect()(AuthScreen);