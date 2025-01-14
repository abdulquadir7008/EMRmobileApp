import React from 'react';
import { Image, View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Ensure you have installed @expo/vector-icons

export default function ForgotPasswordScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Image
        source={require('@/assets/images/emr-cover.jpg')}
        style={styles.logo}
      />
      <Text style={styles.forContent}>Forget Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        keyboardType="email-address"
      />
      <TouchableOpacity style={styles.button} onPress={() => { /* Handle password reset */ }}>
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
