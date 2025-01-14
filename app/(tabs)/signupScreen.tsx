import React, { useState, useEffect } from 'react';
import { Image, View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function SignupScreen() {
  const generateSessionId = () => {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}-${Math.random().toString(36).substring(2, 15)}`;
  };
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

  const [landmark, setLandmark] = useState('');
  const [gender, setGender] = useState('');

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [districtError, setDistrictError] = useState('');
  const [pincodeError, setPincodeError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [sessionId, setSessionId] = useState('');

  useEffect(() => {
    // Generate and store session ID
    const initSessionId = async () => {
      const id = generateSessionId();
      await AsyncStorage.setItem('session_id', id); // Save session ID to AsyncStorage
      setSessionId(id);
    };
    initSessionId();
  }, []);

  const genders = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
  ];


  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get('https://emrmarketingapi.vercel.app/cities'); // No Authorization header
        setCities(response.data);

        // Map the city data to the required format
        const cityItems = response.data.map(city => ({
          label: city.city,
          value: city.id,
          state_id: city.state_id
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
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Email is required');
      return false;
    } else if (!regex.test(email)) {
      setEmailError('Invalid email format');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };
  
  const validatePhone = () => {
    const regex = /^[0-9]{10}$/;
    if (!phone) {
      setPhoneError('Phone number is required');
      return false;
    } else if (!regex.test(phone)) {
      setPhoneError('Invalid phone number');
      return false;
    } else {
      setPhoneError('');
      return true;
    }
  };
  
  const validatePassword = () => {
    if (!password) {
      setPasswordError('Password is required');
      return false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  };
  
  const validateConfirmPassword = () => {
    if (!confirmPassword) {
      setConfirmPasswordError('Confirm Password is required');
      return false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError('Passwords do not match');
      return false;
    } else {
      setConfirmPasswordError('');
      return true;
    }
  };
  

  // Function to handle form submission
  const handleSubmit = async () => {
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();
  
    if (!isEmailValid || !isPhoneValid || !isPasswordValid || !isConfirmPasswordValid) {
      return;
    }
  
    if (!district || !stateId) {
      Alert.alert('Error', 'Please select a valid district and state.');
      return;
    }
  
    const formData = {
      fname: firstName,
      lname: lastName,
      phone,
      password,
      email,
      country: 'India',
      stree_address: address,
      city: district,
      state: stateId,
      gender,
      postalcode: pincode,
      landmark,
      status:'1',
      sess: sessionId,
    };
  
    try {
      const config = {
        method: 'post', // HTTP method
        url: 'https://emrmarketingapi.vercel.app/register', // API endpoint
        headers: {
          'Content-Type': 'application/json', // Content type
        },
        data: formData, // Data to send in the body
      };
    
      // Make the Axios request
      const response = await axios(config);
      if (response.status === 200 || response.status === 201) {
        Alert.alert('Success', 'Registration successful');
        navigation.navigate('VerificationScreen');
      } else {
        Alert.alert('Error', 'Registration failed');
      }
    } catch (error) {
      console.error('Registration Error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };
  
  

  const formFields = [

    { label: 'First Name', value: firstName, error: firstNameError, onChange: setFirstName, onBlur: () => setFirstNameError(firstName ? '' : 'First Name is required') },
    { label: 'Last Name', value: lastName, error: lastNameError, onChange: setLastName, onBlur: () => setLastNameError(lastName ? '' : 'Last Name is required') },
    { label: 'Email Address', value: email, error: emailError, onChange: setEmail, onBlur: validateEmail, keyboardType: 'email-address' },
    { label: 'Phone Number', value: phone, error: phoneError, onChange: setPhone, onBlur: validatePhone, keyboardType: 'phone-pad' },
    { label: 'Address', value: address, error: addressError, onChange: setAddress, onBlur: () => setAddressError(address ? '' : 'Address is required'), multiline: true },
    { label: 'Pincode', value: pincode, error: pincodeError, onChange: setPincode, onBlur: () => setPincodeError(pincode ? '' : 'Pincode is required'), keyboardType: 'numeric' },
    { label: 'Landmark', value: landmark, onChange: setLandmark },
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
              {/* <Text style={styles.emrText}>EMR Provding lot of payout feature. If signup and purchase our product, then your automatic id is active for pool income.</Text> */}
              <View style={styles.pickContainer} >
                <DropDownPicker
                  open={open}
                  value={district}
                  items={items}
                  setOpen={setOpen}
                  setValue={setDistrict}
                  setItems={setItems}
                  onChangeValue={(value) => {
                    setDistrict(value); // Set selected city
                    const selectedCity = cities.find((city) => city.id === value);
                    if (selectedCity) {
                      setStateId(selectedCity.state_id); // Auto-set state ID
                    }
                  }}
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

      <View style={styles.genderContainer}>
          <View style={styles.radioGroup}>
            {genders.map((item) => (
              <TouchableOpacity
                key={item.value}
                style={[
                  styles.radioButton,
                  gender === item.value && styles.radioButtonSelected
                ]}
                onPress={() => setGender(item.value)}
              >
                <View
                  style={[
                    styles.radioCircle,
                    gender === item.value && styles.radioCircleSelected
                  ]}
                />
                <Text style={styles.radioLabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

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
    paddingBottom: 0,
    backgroundColor: '#ddd'
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
    backgroundColor: '#fff'
  },
  button: {
    backgroundColor: '#0057ff',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    margin: 10,
    width:170,
    height:45
  },
  buttonText: {
    color: '#fff',
    fontSize: 17, fontFamily: 'SpaceMonobold',
  },
  errorText: {
    color: 'red',
    marginLeft: 10,
    position:'absolute',
    textAlign:'right',
    width:'90%',
    top:20,
    fontSize:12
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
    // position: 'absolute',
    bottom: 0,
    width: '100%',
    // backgroundColor: '#fff', // Optional, to match the design
    padding: 5,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    flexDirection: 'row'
  },
  genderContainer: {
    marginVertical: 10,
    padding:10
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  radioGroup: {
    flexDirection: 'row'
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#777',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  radioCircleSelected: {
    backgroundColor: '#007BFF',
    borderColor: '#007BFF',
  },
  radioLabel: {
    fontSize: 14,
    color: '#333',
  }
});
