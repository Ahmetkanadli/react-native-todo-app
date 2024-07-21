import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const RegisterScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            const response = await fetch('http://10.0.0.236:8000/api/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                Alert.alert('Success', 'Registration successful', [
                    { text: 'OK', onPress: () => navigation.navigate('Login') },
                ]);
            } else {
                Alert.alert('Error', 'Registration failed');
            }
        } catch (error) {
            Alert.alert('Error', 'Something went wrong');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor='white'
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor='white'
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleRegister} style={styles.button}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.button}>
                    <Text style={styles.buttonText}>Go to Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#191919',
        margin: 10,
    },
    title: {
        fontSize: 24,
        color: 'white',
        marginBottom: 16,
        textAlign: 'center',
    },
    input: {
        backgroundColor: '#282424',
        padding: 8,
        marginBottom: 16,
        borderRadius: 4,
        color : 'white',
    },
    buttonContainer : {
        flexDirection: 'row',
        justifyContent : "center"
    },
    button: {
        backgroundColor: '#7274fd',
        padding: 10,
        marginBottom: 10,
        borderRadius: 4,
        alignItems: 'center',
        marginHorizontal : 10,
        marginVertical : 30
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default RegisterScreen;
