import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, LayoutAnimation, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Footer from './include/footer';


export default function profile() {
  const navigation = useNavigation();

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
        <TouchableOpacity style={styles.backButton}
          // onPress={() => navigation.goBack()}
          onPress={() => navigation.navigate('addToCart')}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

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
          <Image
            source={require('@/assets/images/AbdulQuadir Photo.jpeg')}
            style={styles.HeadingImg}
          />
          <Text style={styles.profText}>Abdul Quadir</Text>
          <Text style={styles.profText2}>UserID: emr00308</Text>
        </View>
        <View style={styles.AcoordContainer}>
          <AccordionItem
            title="Binary"
            screens={[
              { text: 'Tree', route: 'addToCart' },
              { text: 'Left Binary Team', route: 'order' },
              { text: 'Right Binary Team', route: 'checkout' },
              { text: 'Binary Income', route: 'checkout' }
            ]}
            navigation={navigation}
          />

          <AccordionItem
            title="Robotic"
            screens={[
              { text: 'Robotic Income', route: 'addToCart' },
              { text: 'Robotic Wallet', route: 'order' },
              { text: 'Robotic Team', route: 'checkout' }
            ]}
            navigation={navigation}
          />

          <AccordionItem
            title="Pool 2"
            screens={[
              { text: 'Pool Team', route: 'addToCart' },
              { text: 'Pool Income', route: 'order' },
              { text: 'Pool Level Income', route: 'checkout' },
              { text: 'Global Pool Carier Income', route: 'checkout' }
            ]}
            navigation={navigation}
          />

          <AccordionItem
            title="Booster"
            screens={[
              { text: 'Booster 1 (B1) Team', route: 'addToCart' },
              { text: 'Booster 1 (B2) Team', route: 'order' },
              { text: 'Booster 1 (B3) Team', route: 'checkout' },
              { text: 'Booster 1 (B4) Team', route: 'checkout' },
              { text: 'Booster 1 (B5) Team', route: 'checkout' },
              { text: 'Booster 1 (B6) Team', route: 'checkout' },
              { text: 'Booster 1 Income', route: 'checkout' },
              { text: 'Booster 1 Level Income', route: 'checkout' }
            ]}
            navigation={navigation}
          />

          <AccordionItem
            title="Booster"
            screens={[
              { text: 'Booster 1 (B1) Team', route: 'addToCart' },
              { text: 'Booster 1 (B2) Team', route: 'order' },
              { text: 'Booster 1 (B3) Team', route: 'checkout' },
              { text: 'Booster 1 (B4) Team', route: 'checkout' },
              { text: 'Booster 1 (B5) Team', route: 'checkout' },
              { text: 'Booster 1 (B6) Team', route: 'checkout' },
              { text: 'Booster 1 Income', route: 'checkout' },
              { text: 'Booster 2 Team', route: 'checkout' },
              { text: 'Booster 2 Income', route: 'checkout' },
              { text: 'Booster 3 Team', route: 'checkout' },
              { text: 'Booster 2 Income', route: 'checkout' },
              { text: 'Booster 3 Income', route: 'checkout' },

            ]}
            navigation={navigation}
          />

          <AccordionItem
            title="Other Income"
            screens={[
              { text: 'Sponsor Income', route: 'addToCart' },
              { text: 'Repurchase Income', route: 'order' },
              { text: 'Ad View Income', route: 'checkout' }
            ]}
            navigation={navigation}
          />

          <AccordionItem
            title="Rank Income"
            screens={[
              { text: 'Rank Club Income', route: 'addToCart' },
              { text: 'Rank Club Royalty Income', route: 'order' }
            ]}
            navigation={navigation}
          />

          <AccordionItem
            title="Code Team"
            screens={[
              { text: 'Enter Code', route: 'addToCart' },
              { text: 'Code Income', route: 'order' }
            ]}
            navigation={navigation}
          />

          <AccordionItem
            title="Wallet"
            screens={[
              { text: 'Pool 2 Wallet', route: 'addToCart' },
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
});
