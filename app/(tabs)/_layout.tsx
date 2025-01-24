import { Tabs } from 'expo-router';
import React from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{

        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home', tabBarStyle: { display: 'none' },
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),

        }}
      />

      <Tabs.Screen
        name="ForgotPasswordScreen"
        options={{
          title: 'Forget Password', tabBarStyle: { display: 'none' },

        }}
      />
      <Tabs.Screen
        name="ResetPasswordScreen"
        options={{
          title: 'Resset Password', tabBarStyle: { display: 'none' },

        }}
      />

      <Tabs.Screen
        name="signupScreen"
        options={{
          title: 'Sign Up', tabBarStyle: { display: 'none' },

        }}
      />

      <Tabs.Screen
        name="shopScreen"
        options={{
          title: 'Home', tabBarStyle: { display: 'none' },

        }}
      />

      <Tabs.Screen
        name="productDetails"
        options={{
          title: 'Products', tabBarStyle: { display: 'none' },

        }}
      />
      <Tabs.Screen
        name="addToCart"
        options={{
          title: 'addToCart', tabBarStyle: { display: 'none' },

        }}
      />
      <Tabs.Screen
        name="checkOut"
        options={{
          title: 'checkOut', tabBarStyle: { display: 'none' },

        }}
      />

      <Tabs.Screen
        name="paymentSucess"
        options={{
          title: 'paymentSucess', tabBarStyle: { display: 'none' },

        }}
      />
      <Tabs.Screen
        name="orderList"
        options={{
          title: 'orderList', tabBarStyle: { display: 'none' },

        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: 'wallet', tabBarStyle: { display: 'none' },

        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'profile', tabBarStyle: { display: 'none' },

        }}
      />
      <Tabs.Screen
        name="editProfile"
        options={{
          title: 'editProfile', tabBarStyle: { display: 'none' },

        }}
      />
      <Tabs.Screen
        name="VerificationScreen"
        options={{
          title: 'VerificationScreen', tabBarStyle: { display: 'none' },

        }}
      />

    </Tabs>


  );
}
