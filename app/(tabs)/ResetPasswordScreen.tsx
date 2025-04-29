import React, { useState, useEffect } from 'react';
import { Alert, View, TextInput, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function ResetPasswordScreen() {
  const [passcode, setPasscode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [getEmail, setgetEmail] = useState('');
  const navigation = useNavigation();


  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem('getEmail');
        if (storedEmail) {
          setgetEmail(storedEmail);
        }
      } catch (error) {
        console.error('Error fetching email from AsyncStorage', error);
      }
    };
    fetchEmail();
  }, []);

  const handleUpdatePassword = async () => {
    const trimmedPasscode = passcode.trim();
    const trimmedNewPassword = newPassword.trim();
    const trimmedConfirmPassword = confirmPassword.trim();
  
    if (!trimmedPasscode || !trimmedNewPassword || !trimmedConfirmPassword) {
      Alert.alert('Error', 'All fields are required');
      return;
    }
    if (trimmedNewPassword !== trimmedConfirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    try {
      const response = await fetch('https://emrmarketingapi.vercel.app/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ getEmail, passcode: trimmedPasscode, newPassword: trimmedNewPassword }),
      });
  
      const data = await response.json();
      if (response.ok) {
        Alert.alert('Success', data.message || 'Password updated successfully');
        navigation.navigate('index');
      } else {
        Alert.alert('Error', data.message || 'Failed to update password');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };
  

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}
          // onPress={() => navigation.goBack()}
          onPress={() => navigation.navigate('index')}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      <Image
        source={require('@/assets/images/emr-cover.jpg')}
        style={styles.logo}
      />
      <Text style={styles.forContent}>Reset Password</Text>

      <Text style={{marginBottom:3}}>Passcode</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Passcode"
        value={passcode}
        onChangeText={setPasscode}
      />
      <Text style={{marginBottom:3}}>New Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter New Password"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <Text style={{marginBottom:3}}>Confirm Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Confirm New Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleUpdatePassword}>
        <Text style={styles.buttonText}>Update Password</Text>
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
