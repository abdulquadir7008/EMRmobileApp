import { Tabs } from 'expo-router';
import React from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Provider } from 'react-redux';
import { store } from './store';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Provider store={store}>
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
        <Tabs.Screen
          name="Income/leftBinaryTeam"
          options={{
            title: 'LeftBinaryTeam', tabBarStyle: { display: 'none' },

          }}
        />

        <Tabs.Screen
          name="Income/rightBinaryTeam"
          options={{
            title: 'RightBinaryTeam', tabBarStyle: { display: 'none' },

          }}
        />

        <Tabs.Screen
          name="Income/binaryHistory"
          options={{
            title: 'binaryHistory', tabBarStyle: { display: 'none' },

          }}
        />

        <Tabs.Screen
          name="Income/roboticIncome"
          options={{
            title: 'roboticIncome', tabBarStyle: { display: 'none' },

          }}
        />

        <Tabs.Screen
          name="Income/roboticWallet"
          options={{
            title: 'roboticWallet', tabBarStyle: { display: 'none' },

          }}
        />

        <Tabs.Screen
          name="Income/poolTeam"
          options={{
            title: 'Pool Team', tabBarStyle: { display: 'none' },

          }}
        />
        <Tabs.Screen
          name="pooltwo/pooltwoTeam"
          options={{
            title: 'Pool 2 Team', tabBarStyle: { display: 'none' },

          }}
        />

        <Tabs.Screen
          name="pooltwo/selfPoolHistory"
          options={{
            title: 'Self Pool History', tabBarStyle: { display: 'none' },

          }}
        />
        <Tabs.Screen
          name="pooltwo/pooLvelHistory"
          options={{
            title: 'Pool Level History', tabBarStyle: { display: 'none' },

          }}
        />
        <Tabs.Screen
          name="pooltwo/globalPool"
          options={{
            title: 'Global Pool', tabBarStyle: { display: 'none' },

          }}
        />
        <Tabs.Screen
          name="booster/boosterOneHistory"
          options={{
            title: 'Booster 1 History', tabBarStyle: { display: 'none' },

          }}
        />
        <Tabs.Screen
          name="booster/boosterTwoHistory"
          options={{
            title: 'Booster 2 History', tabBarStyle: { display: 'none' },

          }}
        />
        <Tabs.Screen
          name="booster/boosterThreeHistory"
          options={{
            title: 'Booster 3 History', tabBarStyle: { display: 'none' },

          }}
        />
        <Tabs.Screen
          name="booster/boosterFourHistory"
          options={{
            title: 'Booster 4 History', tabBarStyle: { display: 'none' },

          }}
        />
        <Tabs.Screen
          name="booster/boosterFiveHistory"
          options={{
            title: 'Booster 5 History', tabBarStyle: { display: 'none' },

          }}
        />
        <Tabs.Screen
          name="booster/boosterSixHistory"
          options={{
            title: 'Booster 6 History', tabBarStyle: { display: 'none' },

          }}
        />
        <Tabs.Screen
          name="booster/boosterbTwoHistory"
          options={{
            title: 'Booster 2 Team History', tabBarStyle: { display: 'none' },

          }}
        />
        <Tabs.Screen
          name="booster/boosterbThreeHistory"
          options={{
            title: 'Booster 3 Team History', tabBarStyle: { display: 'none' },

          }}
        />
        <Tabs.Screen
          name="booster/boosterOneIncome"
          options={{
            title: 'Booster One Income', tabBarStyle: { display: 'none' },

          }}
        />
        <Tabs.Screen
          name="booster/boosterOneLevelIncome"
          options={{
            title: 'Booster One Income', tabBarStyle: { display: 'none' },

          }}
        />
        <Tabs.Screen
          name="booster/boostertwoIncome"
          options={{
            title: 'Booster One Income', tabBarStyle: { display: 'none' },

          }}
        />
        <Tabs.Screen
          name="booster/boosterThreeIncome"
          options={{
            title: 'Booster One Income', tabBarStyle: { display: 'none' },

          }}
        />
        <Tabs.Screen
          name="otherIncome/sponserIncome"
          options={{
            title: 'Sponser Income', tabBarStyle: { display: 'none' },

          }}
        />
        <Tabs.Screen
          name="otherIncome/repurchaseIncome"
          options={{
            title: 'Repurchase Income', tabBarStyle: { display: 'none' },

          }}
        />
        <Tabs.Screen
          name="rankclub/rankClubIncome"
          options={{
            title: 'Rank Club Income', tabBarStyle: { display: 'none' },

          }}
        />
        <Tabs.Screen
          name="rankclub/rankClubRoyal"
          options={{
            title: 'Rank Club Royal', tabBarStyle: { display: 'none' },

          }}
        />
        <Tabs.Screen
          name="otherIncome/adViewIncome"
          options={{
            title: 'Ad view Income', tabBarStyle: { display: 'none' },

          }}
        />
        <Tabs.Screen
          name="codeIncome/enterCode"
          options={{
            title: 'Code Income', tabBarStyle: { display: 'none' },

          }}
        />
        <Tabs.Screen
          name="codeIncome/codeIncomeHistory"
          options={{
            title: 'Code Income History', tabBarStyle: { display: 'none' },

          }}
        />
        <Tabs.Screen
          name="wallet/poolTwoWallet"
          options={{
            title: 'Pool Two Wallet', tabBarStyle: { display: 'none' },

          }}
        />


      </Tabs>
    </Provider>

  );
}
