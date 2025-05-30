import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Footer from './include/footer';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store';
import { increaseQuantity, decreaseQuantity, removeFromCart } from './store/cartSlice';

export default function AddToCart() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleIncreaseQuantity = (itemId) => {
    dispatch(increaseQuantity(itemId));
  };

  const handleDecreaseQuantity = (itemId) => {
    dispatch(decreaseQuantity(itemId));
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const getItemTotalPrice = (item) => item.price * item.quantity;

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + getItemTotalPrice(item), 0);
  };

  const handleCheckout = () => {
    alert('Proceeding to Checkout!');
  };

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.itemName}>{item.name}</Text>
          <TouchableOpacity onPress={() => handleRemoveItem(item.id)}>
            <Ionicons name="trash-outline" size={20} color="red" />
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <View style={styles.colorContainer}>
            <Text style={styles.optionLabel}>Color:</Text>
            <TouchableOpacity style={[styles.colorOption, { backgroundColor: item.selectedColor }]} />
          </View>

          <View style={styles.sizeContainer}>
            <Text style={styles.optionLabel}>Size:</Text>
            <Text style={styles.sizeText}>{item.selectedSize}</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Text style={styles.itemTotal}>₹{getItemTotalPrice(item)}</Text>
          </View>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={() => handleDecreaseQuantity(item.id)}
              style={styles.quantityButton}
            >
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{item.quantity}</Text>
            <TouchableOpacity
              onPress={() => handleIncreaseQuantity(item.id)}
              style={styles.quantityButton}
            >
              <Text style={styles.buttonText}>+</Text>
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
          onPress={() => navigation.navigate('shopScreen')}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <Text style={styles.title}>Cart</Text>

        <View style={styles.logoContainer}>
          <Image
            source={require('@/assets/images/emr-cover.jpg')}
            style={styles.logo}
          />
        </View>
      </View>

      <View style={styles.container}>
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.id + item.selectedColor + item.selectedSize + index}
        />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Text style={{
              fontSize: 16,
              color: '#333',
              fontFamily: 'SpaceMono', marginLeft: 10, marginTop: 5
            }}>Total Price</Text>
            <Text style={styles.grandTotal}>Rs. {parseFloat(getTotalPrice()).toFixed(2)}</Text>
          </View>
          <View>
            <TouchableOpacity onPress={() => navigation.navigate('checkOut')} style={styles.checkoutButton}>
              <Text style={styles.checkoutButtonText}>Pay </Text>
              <Ionicons name="chevron-forward-circle-outline" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
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
    padding: 16
  },
  cartItem: {
    flexDirection: 'row',
    borderRadius: 5,
    padding: 5,
    marginVertical: 10,
    alignItems: 'center',
    width: '95%',
    alignSelf: 'center',
    backgroundColor: '#F9FAFB'
  },
  itemImage: {
    width: 100,
    height: 100,
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
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 0,
  },
  quantityButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 18,
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  grandTotal: {
    fontSize: 20,
    textAlign: 'center',
    margin: 0,
    fontFamily: 'SpaceMonobold',
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
  checkoutButtonContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  checkoutButton: {
    backgroundColor: '#0057ff', // Green background for the button
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginVertical: 10,
    padding: 20,
    marginTop: 15,
    marginRight:10,
    flexDirection:'row',
    paddingLeft:20,
    paddingRight:20
  },
  checkoutButtonText: {
    color: '#fff', // White text
    fontSize: 15,
    fontWeight: 'bold',
    paddingRight:20
  },

});
