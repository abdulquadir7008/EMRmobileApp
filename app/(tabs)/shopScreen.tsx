import React, { useState, useEffect } from 'react';
import { Image, View, TextInput, TouchableOpacity, TouchableHighlight, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Import Picker for dropdowns
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Ensure you have installed @expo/vector-icons
import styles from './CSS/shopScreenStyles';
import BannerSlider from './include/BannerSlider';
import Footer from './include/footer';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function shopScreen() {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [userAuth, setAuthData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await AsyncStorage.getItem('profile');
        if (userData) {
          setUserData(JSON.parse(userData));
        }
        const authData = await AsyncStorage.getItem('authortoken');
        if (authData) {
          setAuthData(JSON.parse(authData));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  /*Dumy Code Start*/
  const [searchText, setSearchText] = useState('');
  const handleClearSearch = () => {
    setSearchText(''); // Clears the input field
  };
  const onPressHandler = () => {
    Alert.alert('Button Pressed!');
  };
  const products = [
    { id: '1', name: 'Casual Shirt', slogan: 'Slim fit casual shirt', price: '$30', image: require('@/assets/images/products/1.jpeg') },
    { id: '2', name: 'Striped T-Shirt', slogan: 'Slim fit casual shirt', price: '$25', image: require('@/assets/images/products/2.jpeg') },
    { id: '3', name: 'Jeans', slogan: 'Slim fit casual shirt', price: '$40', image: require('@/assets/images/products/3.jpeg') },
    { id: '4', name: 'Jeans', slogan: 'Slim fit casual shirt', price: '$40', image: require('@/assets/images/products/1.jpeg') },
  ];



  /*Dumy Code End*/

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.title}>Home</Text>
        <View style={styles.logoContainer}>
          <Image
            source={require('@/assets/images/emr-cover.jpg')}
            style={styles.logo}
          />
        </View>
      </View>


      <ScrollView contentContainerStyle={styles.formContainer}>
        <View style={styles.userInfo}>
          <View style={styles.profilePic}>
            {/* <Image source={require('@/assets/images/AbdulQuadir Photo.jpeg')} style={styles.profilePhoto} /> */}
            <View>
              <Text style={styles.helloSay}>Good Morning!</Text>
              <Text style={styles.fullName}>{userData?.fname && userData?.lname ? `${userData.fname} ${userData.lname}` : 'Guest User'}</Text>
            </View>
          </View>
          <View style={styles.notification}>
            <Ionicons name="notifications-outline" size={25} color="#fff" style={styles.icon} />
            <Ionicons name="heart-outline" size={25} color="#fff" style={styles.icon} />
          </View>
        </View>
        <View>
          <View style={styles.categgoryButton}>
            <TouchableOpacity style={styles.catButton}>
              <View style={{ marginTop: 0, marginRight: 4 }}>
                <Image source={require('@/assets/images/men.png')} style={{ width: 15, height: 25 }} />
              </View>
              <Text style={styles.catText}>Men</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.catButton}>
              <View style={{ marginTop: 1, marginRight: 2 }}>
                <Image source={require('@/assets/images/women.png')} style={{ width: 15, height: 25 }} />
              </View>
              <Text style={styles.catText}>Women</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.catButton}>
              <View style={{ marginTop: 1, marginRight: 2 }}>
                <Image source={require('@/assets/images/kids.png')} style={{ width: 15, height: 25 }} />
              </View>
              <Text style={styles.catText}>Kids</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.searchContainer}>
            <Ionicons name="search-outline" size={20} color="#000" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search here..."
              value={searchText}
              onChangeText={(text) => setSearchText(text)}
            />
            {searchText ? (
              <TouchableOpacity onPress={handleClearSearch}>
                <Ionicons name="close-outline" size={20} color="#000" style={styles.clearIcon} />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>

        <View>
          <BannerSlider />
        </View>

        <View style={styles.touchContainer}>
          <Text style={styles.popularCatgory}>Most Popular Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {['All', 'Check Shirt', 'Casual Shirts', 'Shorts', 'Casual plain Shirt', 'Casual Strip Shirts', 'T-Shirts', 'High Neck'].map((category) => (
              <TouchableHighlight key={category} onPress={onPressHandler} underlayColor="#DDDDDD" style={styles.categoryButton}>
                <Text style={styles.buttonText}>{category}</Text>
              </TouchableHighlight>
            ))}
          </ScrollView>
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 20 }}>
          {products.map((item) => (
            <TouchableHighlight
              key={item.id}
              onPress={() => navigation.navigate('productDetails')}
              underlayColor="#DDDDDD"
              style={styles.productCard}
            >
              <View style={styles.productContainer}>
                <Image source={item.image} style={styles.productImage} />
                <TouchableOpacity style={styles.wishlistIcon} onPress={() => Alert.alert('Added to Wishlist')}>
                  <Ionicons name="heart-outline" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.slogan}>{item.slogan}</Text>
                <Text style={styles.productPrice}>{item.price}</Text>
              </View>
            </TouchableHighlight>
          ))}
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
}
