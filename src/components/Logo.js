import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        height: 80,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: '#8c67ef',
        fontSize: 26,
        fontStyle: 'italic',
        fontWeight: 'bold'
    }
});


export default () => (
    <View style={styles.container}>
        <Text style={styles.text}>foodly</Text>
    </View>
);
