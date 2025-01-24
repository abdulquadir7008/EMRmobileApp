import React, { useState } from 'react';
import { Image, StyleSheet, TextInput, View, TouchableOpacity, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch('https://emrmarketingapi.vercel.app/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const user = data.user;
        const author = data.auth;
        Alert.alert('Success', 'Login successful!');
        navigation.navigate('shopScreen');
        
        await AsyncStorage.setItem('profile', JSON.stringify(user));
        await AsyncStorage.setItem('authortoken', JSON.stringify(author));
        
      } else {
        Alert.alert('Error', data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred. Please try again.');
      console.error('Login error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/emr-cover.jpg')}
        style={styles.logo}
      />
      <TextInput
        style={styles.input}
        placeholder="Username or Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <View style={styles.linksContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')}>
        <Text style={styles.link}>Forgot Password?</Text>
      </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('signupScreen')}>
          <Text style={styles.link}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  logo: {
    width: 200,
    height: 100,
    marginBottom: 32,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#0057ff',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily:'SpaceMonobold',
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    width: '100%',
  },
  link: {
    color: '#007BFF',
    fontSize: 14,
    fontFamily:'SpaceMonobold',
  },
});
