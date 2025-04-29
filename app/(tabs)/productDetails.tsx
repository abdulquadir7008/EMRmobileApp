import React, { useState } from 'react';
import { Image, View, Button, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import Footer from './include/footer';
import { WebView } from 'react-native-webview';
import { useDispatch } from 'react-redux';
import { addToCart } from './store/cartSlice';

export default function productDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const { product } = route.params || {};
  const dispatch = useDispatch();

  const imageArray = product.image.split(',').filter(image => image);
  const banners = imageArray.map((imageUrl, index) => ({
    id: index + 1,
    imageUrl: { uri: `https://www.emrmarketing.in/uploads/product/${imageUrl}` },
  }));

  const sizeArray = product && product.Variant && product.Variant.vlist ? product.Variant.vlist.split(',').filter(vlist => vlist) : [];
const sizes = sizeArray.length > 0 ? sizeArray.map((sizeList) => ({
  sg: sizeList
})) : [];

const colorArray = product && product.color && product.color ? product.color.split(',').filter(color => color) : [];
const colors = colorArray.length > 0 ? colorArray.map((colorList) => ({
  cl: colorList
})) : [];

  const [selectedSize, setSelectedSize] = useState('M'); // Default size
  const [selectedColor, setSelectedColor] = useState('Red'); // Default color
  const [quantity, setQuantity] = useState(1);

  const pricePerItem = product.sprice ? product.sprice : product.price;
  const totalPrice = quantity * pricePerItem;


  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      name: product.title,
      price: pricePerItem,
      quantity,
      image: `https://www.emrmarketing.in/uploads/product/${product.image2}`,
      selectedColor,
      selectedSize,
    };
  
    dispatch(addToCart(cartItem));
    alert('Product added to cart!');
  };

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const renderDescription = () => {
    if (product && product.description) {
      const htmlContent = `
        <html>
        <head>
          <style>
            body {
              font-size: 35px;
            }
          </style>
        </head>
        <body>
          ${String(product.description)}
        </body>
        </html>
      `;
      return (
        <WebView
          originWhitelist={['*']}
          source={{ html: htmlContent }}
          style={{ height: 50 }}
        />
      );
    } else {
      return <Text>No description available.</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}
          // onPress={() => navigation.goBack()}
          onPress={() => navigation.navigate('shopScreen')}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.title}>Products</Text>

        {/* Company Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require('@/assets/images/emr-cover.jpg')}
            style={styles.logo}
          />
        </View>
      </View>

      {/* Form Section */}
      <ScrollView contentContainerStyle={styles.formContainer}>
        <View style={styles.ProductImages}>
          <SwiperFlatList
            autoplay={true}
            autoplayDelay={3}
            autoplayLoop={false}
            showsPagination={true}
            paginationStyleItem={styles.dot}
            paginationStyleItemActive={styles.activeDot}
          >
            <View key='0' style={styles.bannerContainer}>
              <Image
                source={{ uri: `https://www.emrmarketing.in/uploads/product/${product.image2}` }}
                style={styles.bannerImage}
                resizeMode="cover"
              />
            </View>
            {banners.map((banner) => (
              <View key={banner.id} style={styles.bannerContainer}>
                <Image
                  source={banner.imageUrl}
                  style={styles.bannerImage}
                  resizeMode="cover"
                />
              </View>
            ))}
          </SwiperFlatList>

        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 10 }}>
          <View style={{ alignItems: 'flex-start' }}>
            <Text style={{ fontFamily: 'SpaceMonobold', fontSize: 20 }}>{product.title}</Text>
          </View>
          <View style={{ alignContent: 'flex-end' }}>
            <Ionicons name="heart-outline" size={24} color="black" />
          </View>
        </View>
        <View style={{ width: '100%', marginTop: 10 }}>
          <Text style={{ fontFamily: 'SpaceMonobold', fontSize: 17, marginBottom: 5 }}>Description</Text>
          {renderDescription()}

        </View>

        <View style={styles.productIntru}>
          {/* Size Selection */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', }}>
            {sizes && sizes.length > 0 && (
              <View style={{ width: '50%' }}>
                <Text style={styles.label}>Size:</Text>
                <View style={styles.radioGroup}>
                  {sizes.map((size) => (
                    <TouchableOpacity
                      key={size.sg}
                      style={[
                        styles.radioButton,
                        selectedSize === size.sg && styles.radioSelected
                      ]}
                      onPress={() => setSelectedSize(size.sg)}
                    >
                      <Text style={styles.radioText}>{size.sg}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            <View style={{ width: '50%' }}>
              <Text style={styles.label}>Color:</Text>
              <View style={styles.radioGroup}>
                {colors.map((color) => (
                  <TouchableOpacity
                    key={color.cl}
                    style={[
                      styles.colorRadioButton,
                      { backgroundColor: color.cl },
                      selectedColor === color.cl && styles.radioSelected
                    ]}
                    onPress={() => setSelectedColor(color.cl)}
                  />
                ))}
              </View>
            </View>

            {/* Color Selection */}


          </View>
          {/* Quantity Input */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              <Text style={styles.label}>Quantity:</Text>
              <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={decreaseQuantity} style={styles.quantityButton}>
                  <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{quantity}</Text>
                <TouchableOpacity onPress={increaseQuantity} style={styles.quantityButton}>
                  <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <Text style={styles.label}>Total Price:</Text>

              <View style={styles.priceContainer}>
                {product.sprice && (
                  <Text style={[styles.totalPrice, styles.regularPrice]}>{product.price}</Text>
                )}
                <Text style={styles.specialPrice}>₹{parseFloat(totalPrice).toFixed(2)}</Text>
              </View>

            </View>
            <View>
            <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
  <Ionicons name="cart-outline" size={17} color="white" />
  <Text style={styles.addToCartText}> Add to Cart</Text>
</TouchableOpacity>
            </View>
          </View>


        </View>

      </ScrollView>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    padding: 0,
    backgroundColor: 'white'
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
  ProductImages: {
    height: 320,
    width: '100%',
    marginTop: 0
  },
  bannerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  bannerImage: {
    width: 364,
    height: 400,
    borderRadius: 5
  },
  dot: {
    backgroundColor: 'rgba(0,0,0,.2)',
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  activeDot: {
    backgroundColor: '#000',
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  productIntru: {
    paddingTop: 10,
  },
  label: {
    fontSize: 14,
    marginVertical: 10,
    fontFamily: 'SpaceMonobold',
  },
  radioGroup: {
    flexDirection: 'row',
    marginVertical: 0,
    flexWrap: 'wrap'
  },
  radioButton: {
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#000',
    padding: 5,
    borderRadius: 100,
    fontFamily: 'SpaceMono',
    width: 35,
    alignItems: 'center',
    marginBottom: 10,
    paddingTop: 8, paddingBottom: 8
  },
  radioSelected: {
    borderColor: '#000',
    borderWidth: 2,
    backgroundColor: '#ddd',
  },
  radioText: {
    fontSize: 10,
  },
  colorRadioButton: {
    width: 35,
    height: 35,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10
  },
  priceText: {
    fontSize: 17,
    color: '#ccc',
    fontFamily: 'SpaceMono',
  },
  totalPrice: {
    fontSize: 20, fontFamily: 'SpaceMonobold', marginTop: 5
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 0,
  },
  quantityButton: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'SpaceMono',
  },
  quantityText: {
    fontSize: 18,
  },
  addToCartButton: {
    backgroundColor: '#0057ff', // Green background for the button
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginVertical: 10,
    padding: 20,
    marginTop: 15,
    flexDirection: 'row'
  },
  addToCartText: {
    color: '#fff', // White text
    fontSize: 15,
    fontWeight: 'bold',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  regularPrice: {
    textDecorationLine: 'line-through',
    marginRight: 10,
    color: 'gray',
    fontSize: 15
  },
  specialPrice: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 20

  }

});
