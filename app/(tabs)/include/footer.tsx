import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Footer() {
  const navigation = useNavigation();
    return (
    <View>
      {/* Main Content Area */}
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Main Content Area</Text>
      </View>

      {/* Footer Menu */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('shopScreen')}>
        <Ionicons name="home-outline" size={20} color="#ECECEC" />
          <Text style={styles.footerText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('addToCart')}>
        <Ionicons name="cart-outline" size={20} color="#ECECEC" />
          <Text style={styles.footerText}>Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('orderList')}>
        <Ionicons name="cube-outline" size={20} color="#ECECEC" />
          <Text style={styles.footerText}>Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('wallet')}>
        <Ionicons name="wallet-outline" size={20} color="#ECECEC" />
          <Text style={styles.footerText}>Wallet</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('profile')}>
        <Ionicons name="person-circle-outline" size={20} color="#ECECEC" />
          <Text style={styles.footerText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
    );
}

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#333745',
        paddingVertical: 5,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    footerButton: {
        alignItems: 'center',
    },
    footerText: {
        fontSize: 12,
        color: '#fff',
        fontFamily:'SpaceMono',
    },
});
