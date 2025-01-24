import React, { useState } from 'react';
import { Alert, Image, View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ForgotPasswordScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }
    try {
      // Axios POST request
      const response = await axios.post('https://emrmarketingapi.vercel.app/forget-password',
        { email }, // Axios automatically handles JSON stringification
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 5000, // Optional: timeout after 5 seconds
        }
      );
  
      // Axios response object
  
      if (response.status === 200) {
        Alert.alert('Success', response.data.message || 'Passcode sent to your email');
        navigation.navigate('ResetPasswordScreen'); // Navigate to ResetPassword screen
        await AsyncStorage.setItem('getEmail', email);
      } else {
        Alert.alert('Error', response.data.message || 'Failed to send passcode');
      }
    } catch (error) {
      // Error handling in Axios
      if (error.response) {
        // Server responded with a status code other than 2xx
        Alert.alert('Error', error.response.data.message || 'Failed to send passcode');
      } else if (error.request) {
        // Request was made but no response received
        Alert.alert('Error', 'Network error. Please check your connection and try again.');
      } else {
        // Something went wrong in setting up the request
        Alert.alert('Error', 'An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}
          // onPress={() => navigation.goBack()}
          onPress={() => navigation.navigate('index')}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Image
        source={require('@/assets/images/emr-cover.jpg')}
        style={styles.logo}
      />
      <Text style={styles.forContent}>Reset Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',

    padding: 16,
    backgroundColor: 'white'
  },
  backButton: {
    position: 'absolute',
    top: 40, // Adjust as needed
    left: 16, // Adjust as needed
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
    fontSize: 17,
    fontFamily:'SpaceMonobold',
  },
  logo: {
    width: 200,
    height: 100,
    marginBottom: 32,
    alignSelf:'center'
  },
  forContent:{
    fontFamily:'SpaceMonobold',
    marginBottom:20,
    alignContent:'flex-start',
    fontSize:20
  }
});
