import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from './include/footer';
import { Ionicons } from '@expo/vector-icons';
import CityDropdown from './CityDropdown';
import { useNavigation } from '@react-navigation/native';
// import axios from 'axios';

export default function EditProfile() {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [stateId, setStateId] = useState(null);
  const [cities, setCities] = useState([]); // Store cities data

  // Form States
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [landmark, setLandmark] = useState('');


  const handleCityChange = (newCityId) => {
    setSelectedCity(newCityId);
    if (cities && cities.length > 0) {
      const cityData = cities.find((city) => city.id === Number(newCityId));
      if (cityData) {
        setStateId(cityData.state_id);
      } else {
        setStateId(null);
      }
    } else {
      console.error('Cities data is not available.');
    }
  };


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch profile data from AsyncStorage
        const data = await AsyncStorage.getItem('profile');
        if (data) {
          const parsedData = JSON.parse(data);
          setUserData(parsedData);

          // Set initial form values
          setFirstName(parsedData.fname || '');
          setLastName(parsedData.lname || '');
          setEmail(parsedData.email || '');
          setPhone(parsedData.phone || '');
          setAddress(parsedData.stree_address || '');
          setPincode(parsedData.postalcode || '');
          setLandmark(parsedData.landmark || '');

          // Fetch cities data
          const response = await fetch('https://emrmarketingapi.vercel.app/cities');
          const cityData = await response.json();
          setCities(cityData); // Store cities data in state
          const matchedCity = cityData.find((city) => city.id === parseInt(parsedData.city?.toString()));
          if (matchedCity) {
            setSelectedCity(matchedCity.id);
            setStateId(matchedCity.state_id);
          } else {
            setSelectedCity(null); // Show "Select District" if city not found
          }
        }
      } catch (error) {
        console.error('Error fetching user data or cities:', error);
      }
    };

    fetchUserData();
  }, []);

  
  const handleSave = async () => {
    if (!firstName || !lastName || !email || !phone || !address || !pincode || !stateId) {
      Alert.alert('Validation Error', 'Please fill all required fields.');
      return;
    }
  
    const updatedProfile = {
      fname: firstName,
      lname: lastName,
      email,
      phone,
      stree_address: address,
      pincode,
      landmark,
      city: selectedCity,
      state: stateId
    };
  
    try {
      const response = await fetch(`https://emrmarketingapi.vercel.app/profile/${userData.member_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProfile),
      });
  
      const result = await response.json();
      if (response.ok) {
        Alert.alert('Success', 'Profile updated successfully!');
        navigation.navigate('profile');
      } else {
        console.error(result.message);
        Alert.alert('Error', result.message);
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      Alert.alert('Error', 'Could not save profile. Please try again.');
    }
  };
  


  const formFields = [
    { label: 'First Name', value: firstName, onChange: setFirstName },
    { label: 'Last Name', value: lastName, onChange: setLastName },
    { label: 'Email Address', value: email, onChange: setEmail, keyboardType: 'email-address' },
    { label: 'Phone Number', value: phone, onChange: setPhone, keyboardType: 'phone-pad' },
    { label: 'Address', value: address, onChange: setAddress, multiline: true },
    { label: 'Pincode', value: pincode, onChange: setPincode, keyboardType: 'numeric' },
    { label: 'Landmark', value: landmark, onChange: setLandmark },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('profile')}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.title}>Edit Profile {userData ? userData.userid : ''}</Text>

        {/* Company Logo */}
        <View style={styles.logoContainer}>
          <Image source={require('@/assets/images/emr-cover.jpg')} style={styles.logo} />
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.formContainer}>
        {formFields.map((field, index) => (
          <View key={index} style={styles.inputContainer}>
            <Text style={styles.label}>{field.label}</Text>
            <TextInput
              style={styles.input}
              value={field.value}
              onChangeText={field.onChange}
              keyboardType={field.keyboardType || 'default'}
              multiline={field.multiline || false}
            />
          </View>
        ))}
        <Text style={{ marginBottom: 5 }}>City</Text>
        <CityDropdown selectedCity={selectedCity} onCityChange={handleCityChange} />
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 14,
    paddingHorizontal: 10,
    backgroundColor: '#fff', // Example background color
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginTop: 20,
    paddingBottom: 5
  },
  backButton: {
    padding: 5,
    paddingTop: 15
  },
  title: {
    fontSize: 20,
    fontFamily: 'SpaceMonobold',
    paddingTop: 5
  },

  formContainer: {
    padding: 20,
  },
  logoContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  logo: {
    width: 70,
    height: 30,
    marginTop: 10
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
