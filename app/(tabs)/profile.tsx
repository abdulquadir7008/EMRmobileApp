import React, { useState,useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, LayoutAnimation, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Footer from './include/footer';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function profile() {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await AsyncStorage.getItem('profile'); // Replace 'userData' with your key
        if (data) {
          setUserData(JSON.parse(data)); // Parse the stringified data
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('profile'); // Clear user data
      Alert.alert('Logout', 'You have been logged out.');
      navigation.navigate('index'); // Navigate to login screen
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const AccordionItem = ({ title, screens, navigation }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    // Toggle Accordion
    const toggleAccordion = () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setIsExpanded(!isExpanded);
    };



    return (
      <View style={styles.accordionItem}>
        <TouchableOpacity onPress={toggleAccordion} style={styles.accordionHeader}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.headerText}>{title}</Text>
            <Ionicons name={isExpanded ? 'remove-circle-outline' : 'add-circle-outline'} size={20} color="#333" />
          </View>

        </TouchableOpacity>
        {isExpanded && (
          <View style={styles.accordionContent}>

            {screens.map((screen, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate(screen.route)}
                style={[
                  styles.linkButton, 
                  index === screens.length - 1 && styles.lastLinkButton // Apply specific style to last row
                ]}
              >
                <Text style={styles.linkText}>{screen.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  };



  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <TouchableOpacity style={styles.backButton}
          // onPress={() => navigation.goBack()}
          onPress={() => navigation.navigate('addToCart')}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity> */}

        {/* Title */}
        <Text style={styles.title}>Profile</Text>

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
          {<Image
            source={require('@/assets/images/AbdulQuadir Photo.jpeg')}
            style={styles.HeadingImg}
          /> }
          <Text style={styles.profText}>{userData?.fname && userData?.lname ? `${userData.fname} ${userData.lname}` : 'Guest User'}</Text>
          <Text style={styles.profText2}>UserID: {userData?.userid ? ` ${userData.userid}` : 'Guest User'}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('editProfile')}><Text>Edit</Text></TouchableOpacity>
        </View>
        <View style={styles.AcoordContainer}>
          <AccordionItem
            title="Binary"
            screens={[
              { text: 'Tree', route: 'addToCart' },
              { text: 'Left Binary Team', route: 'Income/leftBinaryTeam' },
              { text: 'Right Binary Team', route: 'Income/rightBinaryTeam' },
              { text: 'Binary Income', route: 'Income/binaryHistory' }
            ]}
            navigation={navigation}
          />

          <AccordionItem
            title="Robotic"
            screens={[
              { text: 'Robotic Income', route: 'Income/roboticIncome' },
              { text: 'Robotic Wallet', route: 'Income/roboticWallet' },
              { text: 'Robotic Team', route: 'Income/poolTeam' }
            ]}
            navigation={navigation}
          />

          <AccordionItem
            title="Pool 2"
            screens={[
              { text: 'Pool Team', route: 'pooltwo/pooltwoTeam' },
              { text: 'Pool Income', route: 'pooltwo/selfPoolHistory' },
              { text: 'Pool Level Income', route: 'pooltwo/pooLvelHistory' },
              { text: 'Global Pool Carier Income', route: 'pooltwo/globalPool' }
            ]}
            navigation={navigation}
          />

          <AccordionItem
            title="Booster 1"
            screens={[
              { text: 'Booster 1 (B1) Team', route: 'booster/boosterOneHistory' },
              { text: 'Booster 1 (B2) Team', route: 'booster/boosterTwoHistory' },
              { text: 'Booster 1 (B3) Team', route: 'booster/boosterThreeHistory' },
              { text: 'Booster 1 (B4) Team', route: 'booster/boosterFourHistory' },
              { text: 'Booster 1 (B5) Team', route: 'booster/boosterFiveHistory' },
              { text: 'Booster 1 (B6) Team', route: 'booster/boosterSixHistory' },
              { text: 'Booster 1 Income', route: 'booster/boosterOneIncome' },
              { text: 'Booster 1 Level Income', route: 'booster/boosterOneLevelIncome' }
            ]}
            navigation={navigation}
          />

          <AccordionItem
            title="Booster 2"
            screens={[
              { text: 'Booster 2 Team', route: 'booster/boosterbTwoHistory' },
              { text: 'Booster 2 Income', route: 'booster/boostertwoIncome' }

            ]}
            navigation={navigation}
          />
          <AccordionItem
            title="Booster 3"
            screens={[
              { text: 'Booster 3 Team', route: 'booster/boosterbThreeHistory' },
              { text: 'Booster 3 Income', route: 'booster/boosterThreeIncome' }

            ]}
            navigation={navigation}
          />

          <AccordionItem
            title="Other Income"
            screens={[
              { text: 'Sponsor Income', route: 'otherIncome/sponserIncome' },
              { text: 'Repurchase Income', route: 'otherIncome/repurchaseIncome' },
              { text: 'Ad View Income', route: 'otherIncome/adViewIncome' }
            ]}
            navigation={navigation}
          />

          <AccordionItem
            title="Rank Income"
            screens={[
              { text: 'Rank Club Income', route: 'rankclub/rankClubIncome' },
              { text: 'Rank Club Royalty Income', route: 'rankclub/rankClubRoyal' }
            ]}
            navigation={navigation}
          />

          <AccordionItem
            title="Code Team"
            screens={[
              { text: 'Enter Code', route: 'codeIncome/enterCode' },
              { text: 'Code Income', route: 'codeIncome/codeIncomeHistory' }
            ]}
            navigation={navigation}
          />

          <AccordionItem
            title="Wallet"
            screens={[
              { text: 'Pool 2 Wallet', route: 'wallet/poolTwoWallet' },
              { text: 'Booster 1 Wallet', route: 'order' },
              { text: 'Booster 2 Wallet', route: 'order' },
              { text: 'Booster 3 Wallet', route: 'order' }
            ]}
            navigation={navigation}
          />

          <AccordionItem
            title="Account"
            screens={[
              { text: 'Address Book', route: 'addToCart' },
              { text: 'Account Information', route: 'order' },
              { text: 'My Order', route: 'order' },
              { text: 'Wishlist', route: 'order' },
              { text: 'KYC', route: 'order' },
              { text: 'Withdraw History', route: 'order' },
              { text: 'Rewards', route: 'order' }
            ]}
            navigation={navigation}
          />

        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.7,
    shadowRadius: 2,
    elevation: 10
  },
  HeadingImg: {
    borderRadius: 100,
    width: 100,
    height: 100,
    marginTop: 30
  },
  profText: {
    fontSize: 17,
    fontFamily: 'SpaceMonobold',
    marginTop: 5,
  },
  profText2: {
    fontSize: 14,
    fontFamily: 'SpaceMono',
  },
  AcoordContainer:{
    marginBottom:40
  },
  accordionItem: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    width: '93%',
    alignSelf: 'center'
  },
  accordionHeader: {
    padding: 15,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  accordionContent: {
    padding: 15,
    backgroundColor: '#fff',
  
  },
  linkButton: {
    borderBottomWidth:1,
    borderColor:'#ECECEC',
    padding:10,
  },
  lastLinkButton: {
    borderBottomWidth: 0, // No bottom border for the last item
  },
  linkText: {
    color: '#000',
  },
  logoutButton: {
    backgroundColor: '#f00',
    padding: 10,
    margin: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
