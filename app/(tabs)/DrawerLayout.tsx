import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useColorScheme } from '@/hooks/useColorScheme';
import LoginScreen from './index';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import shopScreen from './shopScreen';
import productDetails from './productDetails';
import addToCart from './addToCart';
import checkOut from './checkOut';
import paymentSucess from './paymentSucess';
import orderList from './orderList';
import wallet from './wallet';
import profile from './profile';

const Drawer = createDrawerNavigator();

export default function DrawerLayout() {
  const colorScheme = useColorScheme();

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: "blue",
        },
      }}
    >
      <Drawer.Screen
        name="Index"
        component={LoginScreen}
        options={{ title: 'Login' }}
      />
      <Drawer.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
        options={{ title: 'Forgot Password' }}
      />
      <Drawer.Screen
        name="shopScreen"
        component={shopScreen}
        options={{ title: 'Home' }}
      />
      <Drawer.Screen
        name="productDetails"
        component={productDetails}
        options={{ title: 'Products' }}
      />

      <Drawer.Screen
        name="addToCart"
        component={addToCart}
        options={{ title: 'addToCart' }}
      />
      <Drawer.Screen
        name="checkOut"
        component={checkOut}
        options={{ title: 'addToCart' }}
      />
      <Drawer.Screen
        name="paymentSucess"
        component={paymentSucess}
        options={{ title: 'Success' }}
      />
      <Drawer.Screen
        name="orderList"
        component={orderList}
        options={{ title: 'Order' }}
      />
      <Drawer.Screen
        name="wallet"
        component={wallet}
        options={{ title: 'Wallet' }}
      />
      <Drawer.Screen
        name="profile"
        component={profile}
        options={{ title: 'Profile' }}
      />


    </Drawer.Navigator>

  );
}
