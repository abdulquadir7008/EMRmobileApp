import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Footer from './include/footer';


export default function orderList() {
  const navigation = useNavigation();

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Werolla Cardigans',

      price: 20,
      quantity: 1,
      image: 'https://www.emrmarketing.in/uploads/product/32IMG-20231020-WA0057.jpg',
      selectedColor: 'red',
      selectedSize: 'M'
    },
    {
      id: 2,
      name: 'Sugar Lether Anifrim',
      price: 15, quantity: 3,
      image: 'https://www.emrmarketing.in/uploads/product/13Untitled-14.jpg',
      selectedColor: 'green',
      selectedSize: 'S'
    },
    {
      id: 3,
      name: 'Vini Crictk',
      price: 30,
      quantity: 1,
      image: 'https://www.emrmarketing.in/uploads/product/19Untitled-20.jpg',
      availableColors: ['red', 'blue', 'green'],
      availableSizes: ['S', 'M', 'L'],
      selectedColor: 'blue',
      selectedSize: 'L'
    },
    {
      id: 4,
      name: 'Werolla Cardigans',
      price: 20,
      quantity: 1,
      image: 'https://www.emrmarketing.in/uploads/product/32IMG-20231020-WA0057.jpg',
      selectedColor: 'red',
      selectedSize: 'M'
    },
    {
      id: 5,
      name: 'Sugar Lether Anifrim',
      price: 15, quantity: 3,
      image: 'https://www.emrmarketing.in/uploads/product/13Untitled-14.jpg',
      selectedColor: 'green',
      selectedSize: 'S'
    },
    {
      id: 6,
      name: 'Vini Crictk',
      price: 30,
      quantity: 1,
      image: 'https://www.emrmarketing.in/uploads/product/19Untitled-20.jpg',
      availableColors: ['red', 'blue', 'green'],
      availableSizes: ['S', 'M', 'L'],
      selectedColor: 'blue',
      selectedSize: 'L'
    },

  ]);


  // Function to calculate total price for a single item
  const getItemTotalPrice = (item) => item.price * item.quantity;

  // Function to calculate grand total price for all items in the cart
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + getItemTotalPrice(item), 0);
  };



  // Render each cart item
  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={{backgroundColor:'#E4E4E4', padding:5,fontFamily: 'SpaceMono',borderRadius:5, fontSize:10, paddingLeft:15, paddingRight:15}}>Completed</Text>

        </View>

        {/* Color Selection */}
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.colorContainer}>
            <Text style={styles.optionLabel}>Color:</Text>
            <TouchableOpacity style={[styles.colorOption, { backgroundColor: item.selectedColor },]} />
          </View>
          <View style={styles.sizeContainer}>
            <Text style={styles.optionLabel}>Size = </Text>
            <Text style={styles.sizeText}>{item.selectedSize}</Text>
          </View>
          <View style={styles.sizeContainer}>
            <Text style={styles.optionLabel}> Qty. </Text>
            <Text style={styles.sizeText}> {item.quantity}</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent:'space-between' }}>
          <View style={styles.colorContainer}>
            <Text style={styles.itemTotal}>${getItemTotalPrice(item)}</Text>
          </View>
          <View style={styles.sizeContainer}>
            <TouchableOpacity style={styles.checkoutButton} onPress={() => navigation.navigate('orderList')}>
              <Text style={styles.checkoutButtonText}>Track Order</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}
          // onPress={() => navigation.goBack()}
          onPress={() => navigation.navigate('addToCart')}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.title}>Order List</Text>

        {/* Company Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require('@/assets/images/emr-cover.jpg')}
            style={styles.logo}
          />
        </View>
      </View>

      {/* Form Section */}
      <View style={styles.container}>
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />



      </View>



      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    padding: 0,
    // backgroundColor: 'white'
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
    padding: 5,
    backgroundColor: '#f0f8ff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.7,
    shadowRadius: 2,
    elevation: 10
  },
  cartItem: {
    flexDirection: 'row',
    borderRadius: 5,
    padding: 5,
    marginVertical: 10,
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#F9FAFB',
    elevation:10
  },
  itemImage: {
    width: 40,
    height: 50,
    borderRadius: 10,
    marginRight: 20,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontFamily: 'SpaceMonobold',
  },
  itemPrice: {
    fontSize: 16,
    marginVertical: 5,
  },
  quantityContainer: {
    alignItems: 'center',
    marginVertical: 0,

  },
  quantityButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 14,
    width: 30,
    padding: 5,
    height: 30,
    textAlign: 'center'
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  grandTotal: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 5,
    fontFamily: 'SpaceMonobold',
    marginRight: 10
  },
  optionLabel: {
    fontSize: 13,
    fontFamily: 'SpaceMono',
  },
  colorContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  colorOption: {
    width: 15,
    height: 15,
    borderRadius: 15,
    fontFamily: 'SpaceMonobold',
    marginLeft: 5
  },
  sizeContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    marginLeft: 20
  },
  sizeOption: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  sizeText: {
    fontSize: 13,
    fontFamily: 'SpaceMono',
  },
  selectedOption: {
    borderColor: 'green',
    borderWidth: 2,
  },

  checkoutButton: {
    backgroundColor: '#0057ff', // Green background for the button
    borderRadius: 30,
    alignItems: 'center',
    padding: 7,
    paddingLeft:20, paddingRight:20  
  },
  checkoutButtonText: {
    color: '#fff', // White text
    fontSize: 12,
  },

});
