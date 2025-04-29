import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { FlatList } from 'react-native';
import Footer from '../include/footer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const GlobalPool = () => {
    const navigation = useNavigation();
    const [userData, setUserData] = useState(null);
    const [userAuth, setAuthData] = useState(null);
    const [userId, setUserId] = useState(null);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [loadedItems, setLoadedItems] = useState(new Set());
    const [noData, setNoData] = useState(false);

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
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const fetchData = async () => {
        if (!userId || !userAuth || !hasMore || loading) return;
        setLoading(true);
        setNoData(false);

        try {
            const response = await axios.get(`https://emrwalletbackend.vercel.app/global/${userId}?page=${page}`, {
                headers: {
                    Authorization: `Bearer ${userAuth}`,
                },
                timeout: 20000,
            });

            const usersData = response.data.items;
            if (!Array.isArray(usersData)) {
                throw new TypeError('Users data is not an array');
            }

            const newData = [];
            for (const item of usersData) {
                const itemId = item.id;
                const uniqueKey = `${page}-${itemId}`;

                if (!loadedItems.has(uniqueKey)) {
                    newData.push({ ...item, uniqueKey });
                    loadedItems.add(uniqueKey);
                }
            }

            if (newData.length === 0 && page === 1) { 
                setNoData(true); 
                setHasMore(false); 
            } else if (newData.length === 0) {
                setHasMore(false); 
            }

            const { totalPages, currentPage } = response.data;
            setHasMore(currentPage < totalPages);

            setData(prevData => [...prevData, ...newData]);
            setLoading(false);
            setPage(prevPage => prevPage + 1);

        } catch (error) {
            console.error('Error fetching data:', error.message);
            setLoading(false);
            if (axios.isCancel(error)) {
                console.log('Request cancelled', error.message);
            } else {
                if (error.response) {
                    console.error("Response data:", error.response.data);
                    console.error("Response status:", error.response.status);
                    console.error("Response headers:", error.response.headers);
                } else if (error.request) {
                    console.error("Request:", error.request);
                } else {
                    console.error("Error message:", error.message);
                }
            }
        }
    };


    useEffect(() => {
        if (userId && userAuth) {
            fetchData();
        }
    }, [userId, userAuth]);

    const handleLoadMore = () => {
        if (hasMore) {
            fetchData();
        }
    };

    const tableHead = ['Sr No', 'UserID', 'FullName', 'Amount', 'Date'];

    const renderHeader = () => (
        <View style={styles.tableHead}>
            {tableHead.map((headerItem, index) => (
                <Text key={index} style={[styles.tableHeaderCell, styles.boldText]}>
                    {headerItem}
                </Text>
            ))}
        </View>
    );

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: '2-digit' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', options);
    };

    const renderItem = ({ item }) => (
        <View key={item.uniqueKey} style={item.id % 2 === 0 ? styles.tableRow : styles.oddRow}>
            <Text style={styles.tableCell}>{item.id}</Text>
            <Text style={[styles.tableCell, { fontWeight: 'bold' }]}>{item.userid}</Text>
            <Text style={styles.tableCell}>{item.fname}</Text>
            <Text style={styles.tableCell}>{item.amount}</Text>
            <Text style={styles.tableCell}>{formatDate(item.st)}</Text>
        </View>
    );



    const renderFooter = () => {
        if (loading) {
            return <ActivityIndicator style={{ margin: 10 }} />;
        }
        return null;
    };

    const renderEmptyList = () => {
        if (noData) { 
            return (
                <View style={styles.emptyListContainer}>
                    <Text style={styles.emptyListText}>No records found.</Text>
                </View>
            );
        } 
        return null; 
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('profile')}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>

                <Text style={styles.title}>Global Pool</Text>

                <View style={styles.logoContainer}>
                    <Image source={require('@/assets/images/emr-cover.jpg')} style={styles.logo} />
                </View>
            </View>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.uniqueKey}
                ListHeaderComponent={renderHeader}
                stickyHeaderIndices={[0]}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={renderFooter}
                ListEmptyComponent={renderEmptyList}
            />
            <Footer />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 0 },
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
    tableHead: {
        flexDirection: 'row',
        backgroundColor: '#007BFF',
        paddingVertical: 8,
        color: '#fff'
    },
    tableRow: {
        flexDirection: 'row',
        paddingVertical: 8,
    },
    oddRow: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        paddingVertical: 8,
    },
    tableHeaderCell: {
        flex: 1,
        paddingHorizontal: 5,
        textAlign: 'center',
        color: '#fff'
    },
    tableCell: {
        flex: 1, // Equal width for each column
        paddingHorizontal: 5,
        textAlign: 'center', // Center the text within the cell
    },
    boldText: {
        fontWeight: 'bold',
    },
    emptyListContainer: { // Style for the container
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20, // Add some padding
    },
    emptyListText: { // Style for the text
        fontSize: 16,
        color: 'gray',
    }
});

export default GlobalPool;