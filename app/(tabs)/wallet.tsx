import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Footer from './include/footer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function wallet() {
    const navigation = useNavigation();
    const [userData, setUserData] = useState(null);
    const [userAuth, setAuthData] = useState(null);
    const [walletData, setWalletData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null); // Initialize userId state

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const storedUserData = await AsyncStorage.getItem('profile');
                if (storedUserData) {
                    const parsedUserData = JSON.parse(storedUserData);
                    setUserData(parsedUserData);
                    setUserId(parsedUserData.member_id); // Set userId here
                }

                const authData = await AsyncStorage.getItem('authortoken');
                if (authData) setAuthData(JSON.parse(authData));
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        const fetchWalletData = async () => {
            if (!userId || !userAuth) return; // Don't fetch if userId or auth is missing

            setLoading(true); // Set loading to true before fetching
            setError(null);    // Clear any previous errors

            try {
                const response = await axios.get(`https://emrwalletbackend.vercel.app/wallets/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${userAuth}`,
                    },
                });

                if (response.status !== 200) { // Check status
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                setWalletData(response.data); // Access data correctly
            } catch (err) {
                setError(err.message); // Store error message
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchWalletData();
    }, [userId, userAuth]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}
          // onPress={() => navigation.goBack()}
          onPress={() => navigation.navigate('profile')}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.title}>Wallet</Text>

        {/* Company Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require('@/assets/images/emr-cover.jpg')}
            style={styles.logo}
          />
        </View>
      </View>
      <ScrollView>
        <View>
          <View style={{ position: 'relative' }}>
            <View style={{ position: 'absolute', top: 50, left: 40, zIndex: 10 }}>
              <Text style={{ color: '#ffff', fontSize: 17, fontFamily: 'SpaceMonobold', }}>Maine Wallet</Text>
              <Text style={{ color: '#ffff', fontSize: 35, fontFamily: 'SpaceMonobold', }}>{walletData?.mainWallet || 0}</Text>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity>
                  <Text style={{ backgroundColor: '#fff', marginTop: 5, padding: 5, paddingLeft: 10, paddingRight: 10, marginRight: 10, borderRadius: 5 }}>Withdraw</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={{ backgroundColor: '#fff', marginTop: 5, padding: 5, paddingLeft: 10, paddingRight: 10, marginRight: 10, borderRadius: 5 }}>View</Text>
                </TouchableOpacity>
              </View>
            </View>

            <Image
              source={require('@/assets/images/banner/wallet.jpeg')}
              style={styles.HeadingImg}
            />
          </View>
          <View style={{ width: '95%', alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap', marginTop: 20 }}>

            <View style={styles.productCard}>
              <Text style={{ fontFamily: 'SpaceMonobold', fontSize: 17 }}>Daily Wallet</Text>
              <Text style={{ fontFamily: 'SpaceMonobold', fontSize: 14, marginTop: 20 }}>{walletData?.dailyWallet || 0}</Text>

            </View>
            <View style={styles.productCard}>
              <Text style={{ fontFamily: 'SpaceMonobold', fontSize: 17 }}>Pool 2 Wallet</Text>
              <Text style={{ fontFamily: 'SpaceMonobold', fontSize: 14, marginTop: 5, marginBottom:5 }}>{walletData?.selfPoolWallet || 0}</Text>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity>
                  <Text style={{ backgroundColor: '#0172fe', color: '#fff', fontSize: 12, marginTop: 5, padding: 8, marginLeft: 5, borderRadius: 5 }}>Enter Now</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={{ backgroundColor: '#0172fe', color: '#fff', fontSize: 12, marginTop: 5, padding: 8, marginLeft: 10, borderRadius: 5 }}>View</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.productCard}>
              <Text style={{ fontFamily: 'SpaceMonobold', fontSize: 17 }}>Booster 1 Wallet</Text>
              <Text style={{ fontFamily: 'SpaceMonobold', fontSize: 14, marginTop: 5, marginBottom:5}}>{walletData?.booster1Wallet || 0}</Text>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity>
                  <Text style={{ backgroundColor: '#0172fe', color: '#fff', fontSize: 12, marginTop: 5, padding: 8, marginLeft: 5, borderRadius: 5 }}>Enter Now</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={{ backgroundColor: '#0172fe', color: '#fff', fontSize: 12, marginTop: 5, padding: 8, marginLeft: 10, borderRadius: 5 }}>View</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.productCard}>
              <Text style={{ fontFamily: 'SpaceMonobold', fontSize: 17 }}>Booster 2 Wallet</Text>
              <Text style={{ fontFamily: 'SpaceMonobold', fontSize: 14, marginTop: 5, marginBottom:5 }}>{walletData?.goldWallet || 0}</Text>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity>
                  <Text style={{ backgroundColor: '#0172fe', color: '#fff', fontSize: 12, marginTop: 5, padding: 8, marginLeft: 5, borderRadius: 5 }}>Enter Now</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={{ backgroundColor: '#0172fe', color: '#fff', fontSize: 12, marginTop: 5, padding: 8, marginLeft: 10, borderRadius: 5 }}>View</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.productCard}>
              <Text style={{ fontFamily: 'SpaceMonobold', fontSize: 17 }}>Booster 3 Wallet</Text>
              <Text style={{ fontFamily: 'SpaceMonobold', fontSize: 14, marginTop: 5, marginBottom:5 }}>{walletData?.diamondWallet || 0}</Text>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity>
                  <Text style={{ backgroundColor: '#0172fe', color: '#fff', fontSize: 12, marginTop: 5, padding: 8, marginLeft: 5, borderRadius: 5 }}>Enter Now</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={{ backgroundColor: '#0172fe', color: '#fff', fontSize: 12, marginTop: 5, padding: 8, marginLeft: 10, borderRadius: 5 }}>View</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.productCard}>
              <Text style={{ fontFamily: 'SpaceMonobold', fontSize: 17 }}>Robotic Wallet</Text>
              <Text style={{ fontFamily: 'SpaceMonobold', fontSize: 14, marginTop: 5, marginBottom:5 }}>{walletData?.roboticWallet || 0}</Text>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity>
                  <Text style={{ backgroundColor: '#0172fe', color: '#fff', fontSize: 12, marginTop: 5, padding: 8, marginLeft: 5, borderRadius: 5 }}>Deposite</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.productCard}>
              <Text style={{ fontFamily: 'SpaceMonobold', fontSize: 17 }}>Binary Income</Text>
              <Text style={{ fontFamily: 'SpaceMonobold', fontSize: 14, marginTop: 20 }}>{walletData?.binaryIncome || 0}</Text>
              <View style={{ flexDirection: 'row' }}>
              </View>
            </View>
            <View style={styles.productCard}>
              <Text style={{ fontFamily: 'SpaceMonobold', fontSize: 17 }}>Sponsor Income</Text>
              <Text style={{ fontFamily: 'SpaceMonobold', fontSize: 14, marginTop: 20 }}>{walletData?.sponsorIncome || 0}</Text>
              <View style={{ flexDirection: 'row' }}>
              </View>
            </View>
            <View style={styles.productCard}>
              <Text style={{ fontFamily: 'SpaceMonobold', fontSize: 17 }}>Pool 2 Income</Text>
              <Text style={{ fontFamily: 'SpaceMonobold', fontSize: 14, marginTop: 20 }}>{walletData?.selfPoolIncome || 0}</Text>
              <View style={{ flexDirection: 'row' }}>
              </View>
            </View>
            <View style={styles.productCard}>
              <Text style={{ fontFamily: 'SpaceMonobold', fontSize: 17 }}>Pool 2 Level Income</Text>
              <Text style={{ fontFamily: 'SpaceMonobold', fontSize: 14, marginTop: 20 }}>{walletData?.autoPoolIncome || 0}</Text>
              <View style={{ flexDirection: 'row' }}>
              </View>
            </View>
            <View style={styles.productCard}>
              <Text style={{ fontFamily: 'SpaceMonobold', fontSize: 17 }}>Booster 1 Income</Text>
              <Text style={{ fontFamily: 'SpaceMonobold', fontSize: 14, marginTop: 20 }}>{walletData?.boost1Income || 0}</Text>
              <View style={{ flexDirection: 'row' }}>
              </View>
            </View>
            <View style={styles.productCard}>
              <Text style={{ fontFamily: 'SpaceMonobold', fontSize: 17 }}>Booster 1 Level Income</Text>
              <Text style={{ fontFamily: 'SpaceMonobold', fontSize: 14, marginTop: 20 }}>{walletData?.boost1LevelIncome || 0}</Text>
              <View style={{ flexDirection: 'row' }}>
              </View>
            </View>
            <View style={styles.productCard}>
              <Text style={{ fontFamily: 'SpaceMonobold', fontSize: 17 }}>Booster 2 Income</Text>
              <Text style={{ fontFamily: 'SpaceMonobold', fontSize: 14, marginTop: 20 }}>{walletData?.goldBoostIncome || 0}</Text>
              <View style={{ flexDirection: 'row' }}>
              </View>
            </View>
            <View style={styles.productCard}>
              <Text style={{ fontFamily: 'SpaceMonobold', fontSize: 17 }}>Booster 3 Income</Text>
              <Text style={{ fontFamily: 'SpaceMonobold', fontSize: 14, marginTop: 20 }}>{walletData?.diaBoostIncome || 0}</Text>
              <View style={{ flexDirection: 'row' }}>
              </View>
            </View>
            <View style={styles.productCard}>
              <Text style={{ fontFamily: 'SpaceMonobold', fontSize: 17 }}>Code Income</Text>
              <Text style={{ fontFamily: 'SpaceMonobold', fontSize: 14, marginTop: 20 }}>{walletData?.codeUserWallet || 0}</Text>
              <View style={{ flexDirection: 'row' }}>
              </View>
            </View>
            <View style={styles.productCard}>
              <Text style={{ fontFamily: 'SpaceMonobold', fontSize: 17 }}>Repurchase Income</Text>
              <Text style={{ fontFamily: 'SpaceMonobold', fontSize: 14, marginTop: 20 }}>{walletData?.repurchaseIncome || 0}</Text>
              <View style={{ flexDirection: 'row' }}>
              </View>
            </View>
            <View style={styles.productCard}>
              <Text style={{ fontFamily: 'SpaceMonobold', fontSize: 17 }}>Robotic Pool Income</Text>
              <Text style={{ fontFamily: 'SpaceMonobold', fontSize: 14, marginTop: 20 }}>{walletData?.roboticIncome || 0}</Text>
              <View style={{ flexDirection: 'row' }}>
              </View>
            </View>
            <View style={styles.productCard}>
              <Text style={{ fontFamily: 'SpaceMonobold', fontSize: 17 }}>Rank Club Income</Text>
              <Text style={{ fontFamily: 'SpaceMonobold', fontSize: 14, marginTop: 20 }}>{walletData?.rankIncome || 0}</Text>
              <View style={{ flexDirection: 'row' }}>
              </View>
            </View>
            <View style={styles.productCard}>
              <Text style={{ fontFamily: 'SpaceMonobold', fontSize: 17 }}>Rank Club Royalty Income</Text>
              <Text style={{ fontFamily: 'SpaceMonobold', fontSize: 14, marginTop: 20 }}>{walletData?.royaltyIncome || 0}</Text>
              <View style={{ flexDirection: 'row' }}>
              </View>
            </View>
            <View style={styles.productCard}>
              <Text style={{ fontFamily: 'SpaceMonobold', fontSize: 17 }}>Global Pool Carier Income</Text>
              <Text style={{ fontFamily: 'SpaceMonobold', fontSize: 14, marginTop: 20 }}>{walletData?.globalIncome || 0}</Text>
              <View style={{ flexDirection: 'row' }}>
              </View>
            </View>
            <View style={styles.productCard}>
              <Text style={{ fontFamily: 'SpaceMonobold', fontSize: 17 }}>Ad View Income</Text>
              <Text style={{ fontFamily: 'SpaceMonobold', fontSize: 14, marginTop: 20 }}>{walletData?.adViewWallet || 0}</Text>
              <View style={{ flexDirection: 'row' }}>
              </View>
            </View>



          </View>
        </View>
      </ScrollView>
      <Footer />
    </View >
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
  HeadingImg: {
    width: '90%',
    height: 150,
    alignSelf: 'center',
    borderRadius: 30,
    marginTop: 20
  },
  productCard: {
    width: '44%', // Each card takes 50% of the row
    flexDirection: 'column',
    elevation: 10,
    height: 120,
    marginLeft: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginVertical: 10,
    alignItems: 'center',
  },
});
