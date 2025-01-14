import React, { useState, useEffect } from 'react';
import { Image, View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

export default function SignupScreen() {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const [cities, setCities] = useState([]);
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [district, setDistrict] = useState(null);
  const [stateId, setStateId] = useState(null);

  const [pincode, setPincode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [addressError, setAddressError] = useState('');
  // const [districtError, setDistrictError] = useState('');
  const [pincodeError, setPincodeError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get('https://emrmarketingapi.vercel.app/cities', {
          headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjI3LCJpYXQiOjE3MzU4MTQxNDIsImV4cCI6MTczNTgyMTM0Mn0.zd5FobT47ouwlSsHaX8PG6jwLnpVpLtbRc09sYkY4k4' // Replace with your actual JWT token
          }
        });
        setCities(response.data);

        // Map the city data to the required format
        const cityItems = response.data.map(city => ({
          label: city.city,
          value: city.id
        }));
        setItems([{ label: 'Select District', value: null }, ...cityItems]);

      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    fetchCities();
  }, []);

  // Validation functions
  const validateEmail = () => {
    // Basic email validation regex
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Email is required');
    } else if (!regex.test(email)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  };

  const validatePhone = () => {
    // Basic phone number validation regex (10 digits)
    const regex = /^[0-9]{10}$/;
    if (!phone) {
      setPhoneError('Phone number is required');
    } else if (!regex.test(phone)) {
      setPhoneError('Invalid phone number');
    } else {
      setPhoneError('');
    }
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordError('Password is required');
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
    } else {
      setPasswordError('');
    }
  };

  const validateConfirmPassword = () => {
    if (!confirmPassword) {
      setConfirmPasswordError('Confirm Password is required');
    } else if (confirmPassword !== password) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
    }
  };

  // Function to handle form submission
  const handleSubmit = () => {
    // Validate all fields before submitting
    validateEmail();
    validatePhone();
    validatePassword();
    validateConfirmPassword();

    // Check if any validation errors exist
    if (
      firstNameError ||
      lastNameError ||
      emailError ||
      phoneError ||
      passwordError ||
      confirmPasswordError
    ) {
      Alert.alert('Validation Error', 'Please fix all validation errors before submitting.');
      return;
    }

    // Form is valid, proceed with submission (you can handle form submission logic here)
    // Example: Send data to server, navigate to next screen, etc.
    Alert.alert('Form Submitted', 'Congratulations! Form submitted successfully.');
  };

  const formFields = [
    
    { label: 'First Name', value: firstName, error: firstNameError, onChange: setFirstName, onBlur: () => setFirstNameError(firstName ? '' : 'First Name is required') },
    { label: 'Last Name', value: lastName, error: lastNameError, onChange: setLastName, onBlur: () => setLastNameError(lastName ? '' : 'Last Name is required') },
    { label: 'Email Address', value: email, error: emailError, onChange: setEmail, onBlur: validateEmail, keyboardType: 'email-address' },
    { label: 'Phone Number', value: phone, error: phoneError, onChange: setPhone, onBlur: validatePhone, keyboardType: 'phone-pad' },
    { label: 'Address', value: address, error: addressError, onChange: setAddress, onBlur: () => setAddressError(address ? '' : 'Address is required'), multiline: true },
    { label: 'Pincode', value: pincode, error: pincodeError, onChange: setPincode, onBlur: () => setPincodeError(pincode ? '' : 'Pincode is required'), keyboardType: 'numeric' },
    { label: 'Password', value: password, error: passwordError, onChange: setPassword, onBlur: validatePassword, secureTextEntry: true },
    { label: 'Confirm Password', value: confirmPassword, error: confirmPasswordError, onChange: setConfirmPassword, onBlur: validateConfirmPassword, secureTextEntry: true }
  ];

  return (
    <View style={styles.container} >
      {/* Header Section */}
      < View style={styles.header} >
        {/* Back Button */}
        < TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()
        }>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity >

        {/* Title */}
        < Text style={styles.title} > Sign Up</Text >

        {/* Company Logo */}
        < View style={styles.logoContainer} >
          <Image
            source={require('@/assets/images/emr-cover.jpg')}
            style={styles.logo}
          />
        </View >
      </View >

      {/* Form Section */}
      < KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
        <FlatList
          data={formFields}
          keyExtractor={(item) => item.label}
          renderItem={({ item }) => (
            <View>
              <TextInput
                style={[styles.input, item.multiline && { height: 80 }]}
                placeholder={item.label}
                value={item.value}
                onChangeText={item.onChange}
                onBlur={item.onBlur}
                keyboardType={item.keyboardType}
                secureTextEntry={item.secureTextEntry}
                multiline={item.multiline}
              />
              {item.error ? <Text style={styles.errorText}>{item.error}</Text> : null}
            </View>
          )}
          ListHeaderComponent={
            <>
              <Text style={styles.emrText}>EMR Provding lot of payout feature. If signup and purchase our product, then your automatic id is active for pool income.</Text>
              <View style={styles.pickContainer} >
                <DropDownPicker
                  open={open}
                  value={district}
                  items={items}
                  setOpen={setOpen}
                  setValue={setDistrict}
                  setItems={setItems}
                  placeholder="Select District"
                  searchable={true}
                  searchPlaceholder="Search District"
                  style={styles.dropdown}
                  dropDownContainerStyle={styles.dropdownContainer}
                  nestedScrollEnabled={true}
                  listMode="MODAL"
                />
              </View>
            </>
          }
         
          keyboardShouldPersistTaps="handled"
          nestedScrollEnabled={true}
        />
      </KeyboardAvoidingView >
      <View style={styles.footer}>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    paddingBottom:50,
    backgroundColor:'#ddd'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 24,
    paddingHorizontal: 10,
    backgroundColor: '#fff', // Example background color
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginTop: 0,
    paddingBottom: 5
  },
  backButton: {
    padding: 5,
    paddingTop: 15
  },
  title: {
    fontSize: 20,
    fontFamily: 'SpaceMonobold',
    paddingTop: 5,
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
  formContainer: {
    width: '100%',
    alignItems: 'center',
    padding: 16,

  },
  input: {
    padding: 10,
    margin: 10,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor:'#fff'
  },
  button: {
    backgroundColor: '#0057ff',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    margin: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17, fontFamily: 'SpaceMonobold',
  },
  errorText: {
    color: 'red',
    marginLeft: 10,
  },
  emrText: {
    margin: 10,
    marginBottom: 20,
    textAlign: 'justify', fontFamily: 'SpaceMono',
  },
  pickContainer: {
    flex: 1,
    justifyContent: 'center',
    margin: 10,
    marginBottom: 5,
    zIndex: 10
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#ccc',

  },
  inptPadd: {
    padding: 10
  },
  parentContainer: {
    flex: 1,
    zIndex: 1, // Default value for other elements
    overflow: 'visible',
  },
  dropdownWrapper: {
    zIndex: 100, // Higher priority for dropdown
    position: 'relative',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff', // Optional, to match the design
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  }
});
