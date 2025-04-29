import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Footer from './include/footer';


export default function paymentSucess() {
  const navigation = useNavigation();


  return (
    <View style={styles.container}>
      <View style={styles.header}>


        {/* Title */}
        <Text style={styles.title}>Success</Text>

        {/* Company Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require('@/assets/images/emr-cover.jpg')}
            style={styles.logo}
          />
        </View>
      </View>
      <ScrollView>
        <View style={styles.formContainer}>
          <View>
            <View style={{backgroundColor:'#F5F5F5',borderRadius:20, padding:20, alignItems:'center'}}>
              <View style={{backgroundColor:'#000', width:80, height:80,borderRadius:100,alignItems:'center',paddingVertical:10}}>
                <Ionicons name="cart-outline" size={50} color="white" /></View>
              <Text style={{fontSize:20,fontFamily:'SpaceMonobold', marginTop:5, margin:2}}>Order Successful!</Text>
              <Text style={{fontSize:16,fontFamily:'SpaceMono', margin:2}}>You have Succesfully made Order</Text>
              <TouchableOpacity style={styles.checkoutButton}>
                <Text style={styles.checkoutButtonText}>View Order</Text>
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
    marginVertical:'30%'
  },
  checkoutButton: {
    backgroundColor: '#000', // Green background for the button
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginVertical: 0,
    padding: 20,
    marginTop: 5,
    marginBottom:10,
    flexDirection:'row'
  },
  checkoutButtonText: {
    color: '#fff', // White text
    fontSize: 15,
    fontWeight: 'bold',
  }

});
