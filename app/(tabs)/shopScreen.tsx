import React, { useState, useEffect } from 'react';
import { Image, View, TextInput, TouchableOpacity, TouchableHighlight, Text, StyleSheet, Alert, FlatList, ActivityIndicator, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './CSS/shopScreenStyles';
import BannerSlider from './include/BannerSlider';
import Footer from './include/footer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export default function shopScreen() {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [userAuth, setAuthData] = useState(null);
  const [product, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedMainCategory, setSelectedMainCategory] = useState('All');
  const [selectedSubCategory, setSelectedSubCategory] = useState('All');
  const [availableSubCategories, setAvailableSubCategories] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('profile');
        if (userData) setUserData(JSON.parse(userData));

        const authData = await AsyncStorage.getItem('authortoken');
        if (authData) setAuthData(JSON.parse(authData));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (userAuth) {
      fetchProducts();
    }
  }, [userAuth, page]);

  const fetchProducts = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await axios.get(`https://ecommerce-api-theta-pied.vercel.app/products?page=${page}&limit=10`, {
        headers: {
          Authorization: `Bearer ${userAuth}`,
        },
      });

      if (response.data.length > 0) {
        setProducts((prev) => [...prev, ...response.data]);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreProducts = () => {
    if (hasMore) setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (selectedMainCategory === 'All') {
      setAvailableSubCategories([]);
      setFilteredProducts(product);
      return;
    }

    // Get unique subcategories for the selected main category
    const subCategories = Array.from(
      new Set(
        product
          .filter((product) => product.maincat.toLowerCase() === selectedMainCategory.toLowerCase())
          .map((product) => product.Category.title)
      )
    );

    setAvailableSubCategories(subCategories);
  }, [selectedMainCategory, product]);

  useEffect(() => {
    filterProducts(selectedMainCategory, selectedSubCategory);
  }, [selectedMainCategory, selectedSubCategory, product]);

  const filterProducts = (mainCategory, subCategory) => {
    let filtered = product;

    if (mainCategory !== 'All') {
      filtered = filtered.filter(
        (item) => item.maincat.toLowerCase() === mainCategory.toLowerCase()
      );
    }

    if (subCategory !== 'All') {
      filtered = filtered.filter(
        (item) => item.Category.title.toLowerCase() === subCategory.toLowerCase()
      );
    }

    setFilteredProducts(filtered);
  };


  const handleClearSearch = () => {
    setSearchText('');
    setFilteredProducts(product); // Reset to initial product list
  };

  const handleSelectProduct = (selectedProductTitle) => {
    const selectedProduct = product.find(item => item.title === selectedProductTitle);
    setFilteredProducts([selectedProduct]);
  };
  const handleMainCategoryPress = (maincat) => {
    setSelectedMainCategory(maincat);
    setSelectedSubCategory('All'); 
    setFilteredProducts([]); // Close dropdown
    setSearchText(''); // Reset search text
};

const handleSubCategoryPress = (subcategory) => {
    setSelectedSubCategory(subcategory);
    setFilteredProducts([]); // Close dropdown
    setSearchText(''); // Reset search text
};


console.log(userAuth)

  return (
    <View style={styles.container}>
      <View style={styles.header}>

        <View style={styles.logoContainer}>
          <Image
            source={require('@/assets/images/emr-cover.jpg')}
            style={styles.logo}
          />
        </View>
        <View style={styles.notification}>
          <Ionicons name="notifications-outline" size={25} color="#0172fe" style={styles.icon} />
          <Ionicons name="heart-outline" size={25} color="#0172fe" style={styles.icon} />
        </View>
      </View>

      <View style={styles.userInfo}>
        <View style={styles.profilePic}>
          {/* <Image source={require('@/assets/images/AbdulQuadir Photo.jpeg')} style={styles.profilePhoto} /> */}
          <View>
            <Text style={styles.helloSay}>Good Morning! {userData?.fname && userData?.lname ? `${userData.fname} ${userData.lname}` : 'Guest User'}</Text>
          </View>
        </View>

      </View>
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
          {['All', 'Men', 'Women', 'Kids'].map((maincat) => (
            <TouchableOpacity
              key={maincat}
              onPress={() => {
                handleMainCategoryPress(maincat);
                setSelectedSubCategory('All'); // Reset subcategory when main category changes
              }}
              style={{
                padding: 5,
                backgroundColor: selectedMainCategory === maincat ? '#0172fe' : '#fff',
                borderRadius: 20,
                paddingLeft: 25,
                paddingRight: 25,
                marginTop: 10,
                borderWidth: 1, borderColor: '#0172fe',
                marginRight: 5,
                marginLeft: 5

              }}
            >
              <Text style={{ color: selectedMainCategory === maincat ? '#fff' : '#0172fe', fontWeight: 'bold' }}>{maincat}</Text>
            </TouchableOpacity>
          ))}
        </View>


        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#000" style={styles.searchIcon} />
          <TextInput
  style={styles.searchInput}
  placeholder="Search here..."
  value={searchText}
  onChangeText={(text) => {
    setSearchText(text);
    if (text.length > 0) {
      const filtered = product.filter((item) =>
        item.title.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(product); // Show all products if search is empty
    }
  }}
/>
          {searchText ? (
            <TouchableOpacity onPress={handleClearSearch}>
              <Ionicons name="close-outline" size={20} color="#000" style={styles.clearIcon} />
            </TouchableOpacity>
          ) : null}
        </View>

        {searchText.length > 0 && filteredProducts.length > 0 && (
          <View style={styles.dropdownContainer}>
            <ScrollView>
              {filteredProducts.map((item, index) => (
                <TouchableOpacity
                key={`${item.id}-${index}`}
                style={styles.dropdownItem}
                onPress={() => {
                  setSearchText(item.title);
                  handleSelectProduct(item.title);
                }}
              >
                <Text>{item.title}</Text>
              </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>
      {
        selectedMainCategory === 'All' && <BannerSlider />
      }
      <View style={styles.touchContainer}>
        <Text style={styles.popularCatgory}>Most Popular Categories</Text>
        {availableSubCategories.length > 0 && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 20 }}>
            {['All', ...availableSubCategories].map((subcategory) => (
              <TouchableHighlight
                key={subcategory}
                onPress={() => handleSubCategoryPress(subcategory)}
                underlayColor="#DDDDDD"
                style={{
                  padding: 10,
                  marginHorizontal: 5,
                  backgroundColor: selectedSubCategory === subcategory ? '#0172fe' : 'lightgray',
                  borderRadius: 10,
                }}
              >
                <Text style={{ color: selectedSubCategory === subcategory ? '#fff' : '#333', fontWeight: 'bold' }}>{subcategory}</Text>
              </TouchableHighlight>
            ))}
          </ScrollView>
        )}
      </View>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        numColumns={2}
        renderItem={({ item }) => {
          // console.log('Rendering Item:', item); // Add this line to check each item being rendered
          return (
            <TouchableHighlight
            onPress={() => navigation.navigate('productDetails', { product: item })}
              underlayColor="#DDDDDD"
              style={{
                width: '48%',
                marginBottom: 10,
                backgroundColor: '#f9f9f9',
                borderRadius: 5,
                padding: 10,
              }}
            >
              <View style={styles.productContainer}>
                <Image source={{ uri: `https://www.emrmarketing.in/uploads/product/${item.image2}` }} style={styles.productImage} />
                <TouchableOpacity style={styles.wishlistIcon} onPress={() => Alert.alert('Added to Wishlist')}>
                  <Ionicons name="heart-outline" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.productName}>{item.Category.title}</Text>
                <Text style={styles.slogan}>{item.title}</Text>
                <Text style={styles.productPrice}>Rs. {parseFloat(item.price).toFixed(2)}</Text>
              </View>
            </TouchableHighlight>
          );
        }}
        onEndReached={loadMoreProducts}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading && <ActivityIndicator size="large" color="#0172fe" />}
      />

      <Footer />
    </View>
  );
}