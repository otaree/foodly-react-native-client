import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet  } from 'react-native';
import PropTypes from 'prop-types';

import Logo from './Logo';


class AuthForm extends Component {
    static propTypes = {
        isLogin: PropTypes.bool.isRequired,
        onSubmitPress: PropTypes.func.isRequired,
        onSwitchPress: PropTypes.func.isRequired
    };

    state = {
        email: 'test@test.com',
        password: 'password'
    }

    handleEmailChange = (text) => {
        this.setState({ email: text });
    }

    handlePasswordChange = (text) => {
        this.setState({ password: text });
    }

    handleSubmit = () => {
        if (this.state.email.trim().length < 1 || this.state.password.trim().length < 6) return;
        this.props.onSubmitPress({ email: this.state.email, password: this.state.password });
    }

    handleSwitch = () => {
        this.props.onSwitchPress()
    }

    render() {
        return (
            <View style={styles.container}>
                <Logo />
                <TextInput
                    style={styles.textInput}
                    placeholder="Email"
                    value={this.state.email}
                    multiline={false}
                    onChangeText={this.handleEmailChange}
                    underlineColorAndroid="transparent" 
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="password"
                    value={this.state.password}
                    onChangeText={this.handlePasswordChange}
                    secureTextEntry={true}
                    multiline={false}
                    underlineColorAndroid="transparent"
                />
                
                <TouchableOpacity
                    style={styles.btn}
                    onPress={this.handleSubmit}
                >
                    <Text style={styles.btnText}>{ this.props.isLogin ? 'Login' : 'Register' }</Text>
                </TouchableOpacity>
        
                <TouchableOpacity
                    style={[styles.btn, styles.btnSwitch]}
                    onPress={this.handleSwitch}
                >
                    <Text style={[styles.btnText, styles.btnSwitchText]}>{ this.props.isLogin ? 'Switch to Registration' : 'Switch to Login' }</Text>
                </TouchableOpacity>
            </View>
        ); 
        
    }
}

const styles = StyleSheet.create({
    container: {
        width: '80%',
        backgroundColor: 'white',
        alignItems: 'center',
        borderRadius: 7
    },
    textInput: {
        fontSize: 14,
        width: '85%' ,
        padding: 10,
        height: 40,
        fontWeight: '600',
        marginVertical: 15,
        borderWidth: 0.7,
        borderRadius: 3,
        borderColor: '#999'
    },
    btn: {
        width: '80%',
        marginTop: 15,
        borderWidth: 0.7,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#8c67ef',
        borderRadius: 3,

    },
    btnText: {
        fontWeight: '600',
        color: 'white',
    },
    btnSwitch: {
        marginBottom: 15,
        backgroundColor: 'white'

    },
    btnSwitchText: {
        color: '#8c67ef',
    }
});

export default AuthForm;

