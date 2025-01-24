import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook

const VerificationScreen = () => {
  const [code, setCode] = useState('');
  const [sessionId, setSessionId] = useState('');
  const navigation = useNavigation(); // Use the useNavigation hook

  useEffect(() => {
    const fetchSessionId = async () => {
      try {
        const id = await AsyncStorage.getItem('session_id');
        if (id) {
          setSessionId(id);
        } else {
          Alert.alert('Error', 'Session ID not found. Please sign up again.');
          navigation.navigate('Signup');
        }
      } catch (error) {
        console.error('Error retrieving session ID:', error);
        Alert.alert('Error', 'Unable to retrieve session ID.');
      }
    };
    fetchSessionId();
  }, [navigation]);

  const handleVerify = async () => {
    if (code.length === 6) {
      try {
        // console.log('Starting Axios request...');
        const response = await axios.post('https://emrmarketingapi.vercel.app/verify', {
          sessionId: sessionId,
          passcode: code,
        }, {
          timeout: 5000, // 5 seconds timeout
        });
        const result = response.data;
        if (response.status === 200) {
          Alert.alert('Success', 'Verification successful!');
          navigation.navigate('index');
        } else {
          Alert.alert('Error', result.result || 'Verification failed.');
        }
      } catch (error) {
        // console.error('Error verifying code:', error);
        if (error.response) {
          Alert.alert('Error', error.response.data.result || 'Verification failed.');
        } else if (error.request) {
          Alert.alert('Error', 'Network error. Please check your connection and try again.');
        } else {
          Alert.alert('Error', 'An unexpected error occurred. Please try again.');
        }
      }
    } else {
      Alert.alert('Error', 'Please enter a valid 6-digit code.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Verification Code</Text>
      <Text style={styles.subtitle}>We've sent a 6-digit code to your email.</Text>
      <TextInput
        style={styles.codeInput}
        keyboardType="numeric"
        maxLength={6}
        value={code}
        onChangeText={setCode}
        placeholder="123456"
        textAlign="center"
      />
      <TouchableOpacity style={styles.button} onPress={handleVerify}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
    textAlign: 'center',
  },
  codeInput: {
    width: '80%',
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default VerificationScreen;
