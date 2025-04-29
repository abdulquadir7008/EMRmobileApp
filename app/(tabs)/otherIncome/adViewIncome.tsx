import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, TouchableHighlight, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WebView } from 'react-native-webview';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import Footer from '../include/footer';

const screenHeight = Dimensions.get('window').height;
const scrollHeightPercentage = 45;

const Loader = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('@/assets/images/load.gif')} style={{ height: 60, width: 60 }} />
        </View>
    );
};

const ScrollLoader = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('@/assets/images/load.gif')} style={{ height: 60, width: 60 }} />
        </View>
    );
};

const adViewIncome = () => {
    const [videos, setVideos] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMorePages, setHasMorePages] = useState(true);
    const [firstVideo, setFirstVideo] = useState(null);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [userData, setUserData] = useState(null);
    const [userAuth, setAuthData] = useState(null);
    const [userId, setUserId] = useState(null);
    const [userDataLoaded, setUserDataLoaded] = useState(false);
    const webViewRef = useRef(null);
    const videoStartTime = useRef(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const storedUserData = await AsyncStorage.getItem('profile');
                if (storedUserData) {
                    const parsedUserData = JSON.parse(storedUserData);
                    setUserData(parsedUserData);
                    setUserId(parsedUserData.member_id);
                }

                const authData = await AsyncStorage.getItem('authortoken');
                if (authData) setAuthData(JSON.parse(authData));

                setUserDataLoaded(true);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        if (userDataLoaded && userId && userAuth) {
            fetchData(currentPage);
        }
    }, [userDataLoaded, userId, userAuth]);

    const fetchData = async (page) => {
        setIsFetching(true);
        try {
            const response = await axios.get(`https://emrwalletbackend.vercel.app/videos?page=${page}`, {
                headers: {
                    Authorization: `Bearer ${userAuth}`,
                },
                timeout: 20000,
            });

            const data = response.data.items;

            if (Array.isArray(data) && data.length > 0) {
                setHasMorePages(response.data.currentPage < response.data.totalPages);
                if (currentPage === 1) {
                    setFirstVideo(data[0]);
                }
                setVideos((prevVideos) => [...prevVideos, ...data]);
            } else {
                setHasMorePages(false);
            }
            setIsFetching(false);
        } catch (error) {
            console.error(error);
            setIsFetching(false);
        }
    };

    const handleScroll = (event) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const isEndReached = layoutMeasurement.height + contentOffset.y >= contentSize.height - 50;
        if (isEndReached && !isFetching && hasMorePages) {
            const nextPage = currentPage + 1;
            setCurrentPage(nextPage);
            fetchData(nextPage);
        }
    };

    const navigation = useNavigation();

    const handleVideoPress = (videoId) => {
        const selectedVideo = videos.find((video) => video.id === videoId);
        setFirstVideo(selectedVideo);
        setSelectedItemId(videoId);
        navigation.navigate('otherIncome/adViewIncome', { videoId });
    };

    const handleWebViewLoad = () => {
        videoStartTime.current = Date.now();
    };

    const handleWebViewMessage = (event) => {
        if (event.nativeEvent.data === 'videoPlayed30Sec') {
            processVideoView(firstVideo?.id);
        }
    };

    const processVideoView = async (videoId) => {
        try {
            const response = await axios.get(`https://emrwalletbackend.vercel.app/process-video-view/${userId}/${videoId}`, {
                headers: {
                    Authorization: `Bearer ${userAuth}`,
                },
            });
            console.log('Video view processed successfully:', response.data);
        } catch (error) {
            console.error('Error processing video view:', error.response?.data || error.message);
        }
    };

    if (isFetching && currentPage === 1) {
        return <Loader />;
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('profile')}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>

                <Text style={styles.title}>Ad View Income</Text>

                <View style={styles.logoContainer}>
                    <Image source={require('@/assets/images/emr-cover.jpg')} style={styles.logo} />
                </View>
            </View>
            {firstVideo && firstVideo.video && (
                <View style={styles.videoDetailContiner}>
                    <WebView
                        ref={webViewRef}
                        source={{ uri: firstVideo.video }}
                        style={styles.videoPlayer}
                        allowsInlineMediaPlayback={true}
                        mediaPlaybackRequiresUserAction={false}
                        allowsFullscreenVideo={true}
                        onLoad={handleWebViewLoad}
                        onMessage={handleWebViewMessage}
                        injectedJavaScript={`
                            (function() {
                                var video = document.querySelector('video');
                                var totalPlayTime = 0;
                                var playTimer;
                        
                                if (video) {
                                    // Track when video starts playing
                                    video.addEventListener('play', function() {
                                        if (!playTimer) {
                                            playTimer = setInterval(function() {
                                                totalPlayTime++;
                                                if (totalPlayTime >= 30) { // 30 seconds of playtime
                                                    clearInterval(playTimer);
                                                    playTimer = null;
                                                    window.ReactNativeWebView.postMessage('videoPlayed30Sec');
                                                }
                                            }, 1000); // Increment every second
                                        }
                                    });
                        
                                    // Pause the timer when the video is paused
                                    video.addEventListener('pause', function() {
                                        if (playTimer) {
                                            clearInterval(playTimer);
                                            playTimer = null;
                                        }
                                    });
                        
                                    // Reset playtime if the video is restarted
                                    video.addEventListener('ended', function() {
                                        if (playTimer) {
                                            clearInterval(playTimer);
                                            playTimer = null;
                                        }
                                        totalPlayTime = 0;
                                    });
                                }
                            })();
                        `}
                    />
                    <Text style={styles.videoDetailsTitle}>{firstVideo.title}</Text>
                </View>
            )}

            <ScrollView
                horizontal={false}
                scrollEventThrottle={400}
                onScroll={handleScroll}
                style={{ height: (screenHeight * scrollHeightPercentage) / 100 }}
            >
                <View style={styles.viewContent}>
                    {videos.map((video, index) => (
                        <TouchableHighlight
                            onPress={() => handleVideoPress(video.id)}
                            underlayColor="#DDD"
                            key={`${video.id}-${index}`}
                            accessibilityLabel={`Video: ${video.title}`}
                            style={[selectedItemId === video.id ? styles.selectedItem : null]}
                        >
                            <View style={styles.videoContiner}>
                                <View style={styles.youtubeImage}>
                                    <Image source={{ uri: video.image }} style={{ height: 60, width: '100%' }} />
                                </View>
                                <Text style={styles.videoTitle}>{video.title}</Text>
                            </View>
                        </TouchableHighlight>
                    ))}
                </View>
            </ScrollView>

            {isFetching && currentPage > 1 && (
                <View style={styles.loaderContainer}>
                    <ScrollLoader />
                </View>
            )}
            <Footer />
        </View>
    );
};

export default adViewIncome;
const styles = StyleSheet.create({
    videoPlayer: {
        height: 80,
        marginBottom: 10,
        width: '100%',
    },
    loaderContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    videoDetailContiner: {
        width: '100%',
        height: 300,
        marginBottom: 30,
    },
    videoTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        width: '70%',
        paddingLeft: 10,
    },
    videoContiner: {
        flexDirection: 'row',
        padding: 5,
        width: '100%',
        borderColor: '#eaebec',
        borderBottomWidth: 1,
        paddingTop: 15,
        paddingBottom: 15,
    },
    videoDetailsTitle: {
        fontWeight: 'bold',
        fontSize: 17,
        padding: 10,
        borderColor: '#cbcbcb',
        borderBottomWidth: 1,
        paddingTop: 5,
        marginTop:5
    },
    viewContent: {
        backgroundColor: '#fff',
        marginBottom: 20,
    },
    container: {
        backgroundColor: '#fff',
        height: '100%',
    },
    selectedItem: {
        backgroundColor: '#DDD',
    },
    youtubeImage: {
        width: '30%',
        height: 60,
        padding: 2,
        backgroundColor: '#dedfe1',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
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
        marginTop: 0,
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
});