// BannerSlider.js
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';

const banners = [
    { id: 1, imageUrl: require('../../../assets/images/banner/4.jpeg') },
    { id: 2, imageUrl: require('../../../assets/images/banner/3.jpeg') },
    { id: 3, imageUrl: require('../../../assets/images/banner/2.jpeg') },
    { id: 4, imageUrl: require('../../../assets/images/banner/1.jpeg') },
];

const BannerSlider = () => {
    return (
    <View style={styles.container}>
      <Swiper
        autoplay
        loop
        showsPagination
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
      >
        {banners.map((banner) => (
          <View key={banner.id} style={styles.bannerContainer}>
            <Image source={banner.imageUrl } style={styles.bannerImage} />
          </View>
        ))}
      </Swiper>
    </View>
    
    );
};

const styles = StyleSheet.create({
    container: {
        height: 160,
        width: '100%',
        marginTop: 20
    },
    bannerContainer: {
        flex: 1,
        alignItems: 'center',
    },
    bannerImage: {
        width: '100%',
        height: 140,
        borderRadius: 30
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
    
});

export default BannerSlider;
