// BannerSlider.js
import React from 'react';
import { View, Image, StyleSheet,Text } from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';

const banners = [
    { id: 1, imageUrl: require('../../../assets/images/banner/4.jpeg') },
    { id: 2, imageUrl: require('../../../assets/images/banner/3.jpeg') },
    { id: 3, imageUrl: require('../../../assets/images/banner/2.jpeg') },
    { id: 4, imageUrl: require('../../../assets/images/banner/1.jpeg') },
];

const BannerSlider = () => {
    return (
        <View style={styles.container}>
            <SwiperFlatList
                autoplay={true}
                autoplayDelay={3}
                autoplayLoop={true}
                showsPagination={true}
                paginationStyleItem={styles.dot}
                paginationStyleItemActive={styles.activeDot}
            >
                {banners.map((banner) => (
                    <View key={banner.id} style={styles.bannerContainer}>
                        <Image
                            source={banner.imageUrl}
                            style={styles.bannerImage}
                            resizeMode="cover"
                        />
                    </View>
                ))}
            </SwiperFlatList>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 160,
        width: '100%',
        marginTop: 20,
    },
    bannerContainer: {
        // flex: 1,
        alignItems: 'center',
    },
    bannerImage: {
        width: 400,
        height: 160,
        borderRadius: 10,
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
        width: 10,
        height: 10,
        borderRadius: 5,
        margin: 3,
    },
});

export default BannerSlider;