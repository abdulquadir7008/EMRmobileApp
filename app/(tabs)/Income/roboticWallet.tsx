import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ActivityIndicator, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { FlatList } from 'react-native';
import Footer from '../include/footer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as DocumentPicker from 'expo-document-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import axios from 'axios';


const RoboticWallet = () => {
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
    const [fileResponse, setFileResponse] = useState(null);
    const [amount, setAmount] = useState('');
    const [txnId, setTxnId] = useState('');

    const compressImage = async (uri) => {
        try {
            const result = await ImageManipulator.manipulateAsync(
                uri,
                [{ resize: { width: 800 } }], // Resize width to 800px (height auto-adjusts)
                { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG }
            );
            return result.uri;
        } catch (error) {
            console.error('Image compression error:', error);
            return uri;
        }
    };

    const pickDocument = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({});
            if (result.canceled) return;
    
            const compressedUri = await compressImage(result.assets[0].uri);
            setFileResponse({ ...result.assets[0], uri: compressedUri });
        } catch (error) {
            console.error("Error picking document:", error);
        }
    };

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
            const response = await axios.get(`https://emrwalletbackend.vercel.app/transactions/${userId}?page=${page}`, {
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

    const tableHead = ['Sr No', 'UserId','TransactionID', 'Photo', 'Amount', 'Date', 'Status'];

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

    const statusColors = {
        Approved: 'green',
        Pending: 'yellow',
        Rejected: 'red',
    };
    const renderItem = ({ item }) => {
        const isUrl = item.txn_sc.startsWith('http://') || item.txn_sc.startsWith('https://');
        const imageUrl = isUrl ? item.txn_sc : `https://www.emrmarketing.in/uploads/${item.txn_sc}`;
        const statusColor = statusColors[item.status] || 'black';
    
        return (
            <View key={item.uniqueKey} style={item.id % 2 === 0 ? styles.tableRow : styles.oddRow}>
                <Text style={styles.tableCell}>{item.id}</Text>
                <Text style={[styles.tableCell, { fontWeight: 'bold' }]}>{item.userid}</Text>
                <Text style={styles.tableCell}>{item.txn_id}</Text>
                <Image source={{ uri: imageUrl }} style={styles.image} />
                <Text style={styles.tableCell}>{item.amount}</Text>
                <Text style={styles.tableCell}>{formatDate(item.sdat)}</Text>
                <Text style={[styles.tableCell, { color: statusColor }]}>{item.status}</Text>
            </View>
        );
    };



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

    const submitData = async () => {
        if (!fileResponse) {
            alert("Please upload an image.");
            return;
        }
    
        const formData = new FormData();
        formData.append('amount', amount);
        formData.append('txn_id', txnId);
        formData.append('image', {
            uri: fileResponse.uri,
            name: fileResponse.name || 'transaction.jpg',
            type: fileResponse.mimeType || 'image/jpeg',
        });
    
        try {
            const response = await axios.post(
                `https://emrwalletbackend.vercel.app/robo_add/${userId}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${userAuth}`,
                    },
                    timeout: 20000,
                }
            );
            // console.log('Upload successful:', response.data);
            alert('Data submitted successfully!');
            setAmount('');
        setTxnId('');
        setFileResponse(null);
        } catch (error) {
            console.error('Error submitting data:', error);
            alert(`Error: ${error.response?.status || error.message}`);
        }
    };
    

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('profile')}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>

                <Text style={styles.title}>Robotic Wallet</Text>

                <View style={styles.logoContainer}>
                    <Image source={require('@/assets/images/emr-cover.jpg')} style={styles.logo} />
                </View>
            </View>
            <View style={{
                flexDirection: 'row', alignItems: 'center', width: '95%',
                padding: '10', margin: 10, marginTop: 0, marginBottom: '1', borderRadius: 4, borderColor: '#6a11cb', borderWidth: 1
            }}>
                <View>
                    <Image source={require('@/assets/images/phonePeScan.jpeg')} style={styles.scanPhoto} />
                </View>
                <View style={{ marginLeft: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontWeight: 'bold', }}> EMR MARKETING LLP</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontWeight: 'bold', }}> AC No :</Text>
                        <Text style={{}}> 001212100040740</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{}}> BHARAT CO-OPERATIVE BANK</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontWeight: 'bold' }}> IFSC Code :</Text>
                        <Text style={{}}> BCBM0000013</Text>
                    </View>
                </View>
            </View>

            <View style={styles.amountView}>
                <View style={{ flexDirection: 'row' }}>
                    <TextInput
                        style={styles.input2}
                        placeholder="Amount"
                        keyboardType="numeric"
                        value={amount}
                        onChangeText={setAmount}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Transaction ID"
                        value={txnId}
                        onChangeText={setTxnId}
                    />
                </View>

                <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                    <View>

                        <TouchableOpacity style={styles.fileUpload} onPress={pickDocument}>
                            <Text style={styles.fileUploadText}>Upload Transaction Photo</Text>
                        </TouchableOpacity>
                        {fileResponse && (
                            <Text>File Name: {fileResponse.name}</Text>
                        )}
                    </View>
                    <View>
                        <TouchableOpacity style={styles.button} onPress={submitData}>
                            <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
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
        backgroundColor: '#333',
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
        flex: 1,
        paddingHorizontal: 5,
        textAlign: 'center',
    },
    boldText: {
        fontWeight: 'bold',
    },
    emptyListContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
    emptyListText: {
        fontSize: 16,
        color: 'gray',
    },
    scanPhoto: {
        width: '75',
        height: '75'
    },
    input: {
        width: '72%',
        padding: 10,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#333',
        borderRadius: 8,
    },
    input2: {
        width: '25%',
        padding: 10,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#333',
        borderRadius: 8,
        marginRight: 10
    },
    button: {
        backgroundColor: '#333',
        borderRadius: 8,
        width: 100,
        height: 35,
        justifyContent: 'center'
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'SpaceMonobold',
        alignSelf: 'center'
    },
    amountView: {
        margin: 10,
        padding: 10,
        borderRadius: 4,
        backgroundColor: '#ddd'
    },
    fileUpload: {
        width: 200,
        height: 35,
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: 'center',
        borderColor: '#333'
    },
    fileUploadText: {
        alignSelf: 'center',
        fontWeight: 'bold'
    },
    image: {
        width: 50, // Adjust width as needed
        height: 50, // Adjust height as needed
        resizeMode: 'contain', // Or 'cover', 'stretch', etc.
    },

});

export default RoboticWallet;