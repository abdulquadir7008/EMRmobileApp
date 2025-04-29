import React, { useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Provider, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from './store';
import { setCart } from './store/cartSlice';
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
import editProfile from './editProfile';
import LeftBinaryTeam from './Income/leftBinaryTeam';
import RightBinaryTeam from './Income/rightBinaryTeam';
import BinaryHistory from './Income/binaryHistory';
import RoboticIncome from './Income/roboticIncome';
import RoboticWallet from './Income/roboticWallet';
import PoolTeam from './Income/poolTeam';
import PooltwoTeam from './pooltwo/pooltwoTeam';
import SelfPoolHistory from './pooltwo/selfPoolHistory';
import PooLevelHistory from './pooltwo/pooLvelHistory';
import GlobalPool from './pooltwo/globalPool';
import BoosterOneHistory from './booster/boosterOneHistory';
import BoosterTwoHistory from './booster/boosterTwoHistory';
import BoosterThreeHistory from './booster/boosterThreeHistory';
import BoosterFourHistory from './booster/boosterFourHistory';
import BoosterFiveHistory from './booster/boosterFiveHistory';
import BoosterSixHistory from './booster/boosterSixHistory';
import BoosterbTwoHistory from './booster/boosterbTwoHistory';
import BoosterbThreeHistory from './booster/boosterbThreeHistory';
import BoosterOneIncome from './booster/boosterOneIncome';
import BoosterOneLevelIncome from './booster/boosterOneLevelIncome';
import BoosterTwoIncome from './booster/boostertwoIncome';
import BoosterThreeIncome from './booster/boosterThreeIncome';
import SponserIconcome from './otherIncome/sponserIncome';
import RepurchaseIncome from './otherIncome/repurchaseIncome';
import RankClubIncome from './rankclub/rankClubIncome';
import RankClubRoyal from './rankclub/rankClubRoyal';
import adViewIncome from './otherIncome/adViewIncome';
import enterCode from './codeIncome/enterCode';
import codeIncomeHistory from './codeIncome/codeIncomeHistory';
import poolTwoWallet from './wallet/poolTwoWallet';

const Drawer = createDrawerNavigator();

const loadCartFromStorage = async (dispatch) => {
  try {
    const jsonValue = await AsyncStorage.getItem('cart');
    const cartItems = jsonValue != null ? JSON.parse(jsonValue) : [];
    dispatch(setCart(cartItems));
  } catch (e) {
    console.error('Failed to load cart from storage', e);
  }
};

function DrawerLayout() {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();

  useEffect(() => {
    loadCartFromStorage(dispatch);
  }, [dispatch]);

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
      <Drawer.Screen
        name="editProfile"
        component={editProfile}
        options={{ title: 'Edit Profile' }}
      />
      <Drawer.Screen
        name="LeftBinaryTeam"
        component={LeftBinaryTeam}
        options={{ title: 'Left Binary Team' }}
      />
      <Drawer.Screen
        name="RightBinaryTeam"
        component={RightBinaryTeam}
        options={{ title: 'Right Binary Team' }}
      />
      <Drawer.Screen
        name="BinaryHistory"
        component={BinaryHistory}
        options={{ title: 'Binary History' }}
      />
      <Drawer.Screen
        name="RoboticIncome"
        component={RoboticIncome}
        options={{ title: 'Robotic Income' }}
      />
      <Drawer.Screen
        name="RoboticWallet"
        component={RoboticWallet}
        options={{ title: 'Robotic Wallet' }}
      />
      <Drawer.Screen
        name="PoolTeam"
        component={PoolTeam}
        options={{ title: 'Pool Team' }}
      />
      <Drawer.Screen
        name="Pool2Team"
        component={PooltwoTeam}
        options={{ title: 'Pool 2 Team' }}
      />
      <Drawer.Screen
        name="SelfPoolHistory"
        component={SelfPoolHistory}
        options={{ title: 'Self Pool History' }}
      />

      <Drawer.Screen
        name="PooLevelHistory"
        component={PooLevelHistory}
        options={{ title: 'Pool Level History' }}
      />
      <Drawer.Screen
        name="GlobalPool"
        component={GlobalPool}
        options={{ title: 'Global Pool' }}
      />
      <Drawer.Screen
        name="BoosterOneHistory"
        component={BoosterOneHistory}
        options={{ title: 'Booster One History' }}
      />
      <Drawer.Screen
        name="BoosterTwoHistory"
        component={BoosterTwoHistory}
        options={{ title: 'Booster Two History' }}
      />
      <Drawer.Screen
        name="BoosterThreeHistory"
        component={BoosterThreeHistory}
        options={{ title: 'Booster Three History' }}
      />
      <Drawer.Screen
        name="BoosterFourHistory"
        component={BoosterFourHistory}
        options={{ title: 'Booster Four History' }}
      />
      <Drawer.Screen
        name="BoosterFiveHistory"
        component={BoosterFiveHistory}
        options={{ title: 'Booster Five History' }}
      />
      <Drawer.Screen
        name="BoosterSixHistory"
        component={BoosterSixHistory}
        options={{ title: 'Booster Six History' }}
      />
      <Drawer.Screen
        name="BoosterbTwoHistory"
        component={BoosterbTwoHistory}
        options={{ title: 'Booster 2 Team History' }}
      />
      <Drawer.Screen
        name="BoosterbThreeHistory"
        component={BoosterbThreeHistory}
        options={{ title: 'Booster 3 Team History' }}
      />
      <Drawer.Screen
        name="BoosterOneIncome"
        component={BoosterOneIncome}
        options={{ title: 'Booster One Income' }}
      />
      <Drawer.Screen
        name="BoosterOneLevelIncome"
        component={BoosterOneLevelIncome}
        options={{ title: 'Booster One Level Income' }}
      />
      <Drawer.Screen
        name="BoosterTwoIncome"
        component={BoosterTwoIncome}
        options={{ title: 'Booster Two Income' }}
      />
      <Drawer.Screen
        name="BoosterThreeIncome"
        component={BoosterThreeIncome}
        options={{ title: 'Booster Three Income' }}
      />
      <Drawer.Screen
        name="SponserIconcome"
        component={SponserIconcome}
        options={{ title: 'Sponser Iconcome' }}
      />
      <Drawer.Screen
        name="RepurchaseIncome"
        component={RepurchaseIncome}
        options={{ title: 'Repurchase Iconcome' }}
      />
      <Drawer.Screen
        name="RankClubIncome"
        component={RankClubIncome}
        options={{ title: 'Rank Club Iconcome' }}
      />
      <Drawer.Screen
        name="RankClubRoyal"
        component={RankClubRoyal}
        options={{ title: 'Rank Club Royal' }}
      />
      <Drawer.Screen
        name="adViewIncome"
        component={adViewIncome}
        options={{ title: 'Add View Income' }}
      />
      <Drawer.Screen
        name="enterCode"
        component={enterCode}
        options={{ title: 'Enter Code' }}
      />
      <Drawer.Screen
        name="codeIncomeHistory"
        component={codeIncomeHistory}
        options={{ title: 'codeIncomeHistory' }}
      />
      <Drawer.Screen
        name="poolTwoWallet"
        component={poolTwoWallet}
        options={{ title: 'poolTwoWallet' }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <DrawerLayout />
    </Provider>
  );
}
