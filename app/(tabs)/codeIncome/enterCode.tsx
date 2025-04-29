import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ActivityIndicator, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { FlatList } from 'react-native';
import Footer from '../include/footer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const enterCode = () => {
    const navigation = useNavigation();
    const [userData, setUserData] = useState(null);
    const [userAuth, setAuthData] = useState(null);
    const [userId, setUserId] = useState(null);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [noData, setNoData] = useState(false);

    const [code, setCode] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');
    const [isError, setIsError] = useState(false);


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
        if (!userId || !userAuth || loading) return;
        setLoading(true);
        setNoData(false);

        try {
            const response = await axios.get(
                `https://emrwalletbackend.vercel.app/code-income-list/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${userAuth}`,
                    },
                    timeout: 20000,
                }
            );

            if (!response.data.success) {
                throw new Error(response.data.message || 'Failed to fetch data');
            }

            const apiData = response.data.data;
            if (!Array.isArray(apiData)) {
                throw new TypeError('API data is not an array');
            }

            // Transform API data to match your table structure
            const transformedData = apiData.map((item, index) => ({
                uniqueKey: `item-${index}-${item.userid}`,
                srNo: index + 1,
                level: item.userid, // Adjust according to your data
                count: item.name,    // Adjust according to your data
                amount: item.code,   // Adjust according to your data
                status: item.status,
                date: item.date      // Added date if needed
            }));

            if (transformedData.length === 0) {
                setNoData(true);
            }

            setData(transformedData);
        } catch (error) {
            console.error('Error fetching data:', error.message);
            setNoData(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userId && userAuth) {
            fetchData();
        }
    }, [userId, userAuth]);


    const handleSubmit = async () => {
        if (!code.trim()) {
            setSubmitMessage('Please enter a code');
            setIsError(true);
            return;
        }

        setIsSubmitting(true);
        setIsError(false);
        setSubmitMessage('');
        if (!userId || !userAuth) return;
        try {
            const response = await axios.post(
                `https://emrwalletbackend.vercel.app/add-code/${userId}`, // Using the userId from state
                { code },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${userAuth}`,
                    },
                }
            );

            if (response.data.success) {
                setSubmitMessage(response.data.message);
                setCode(''); // Clear the input after successful submission
            } else {
                setSubmitMessage(response.data.message);
                setIsError(true);
            }
        } catch (error) {
            let errorMessage = 'Failed to submit code';

            if (error.response) {
                errorMessage = error.response.data.message || errorMessage;
            }

            setSubmitMessage(errorMessage);
            setIsError(true);
        } finally {
            setIsSubmitting(false);
        }
    };


    const tableHead = ['Sr No', 'UserId', 'Code', 'Date', 'Status'];

    const renderHeader = () => (
        <View style={styles.tableHead}>
            {tableHead.map((headerItem, index) => (
                <Text key={index} style={[styles.tableHeaderCell, styles.boldText]}>
                    {headerItem}
                </Text>
            ))}
        </View>
    );

    const statusColors = {
        'Approved': 'green',
        'Pending': 'orange',
        'Rejected': 'red'
    };
    const renderItem = ({ item }) => {
        const statusColor = statusColors[item.status] || 'gray';

        return (
            <View key={item.uniqueKey} style={item.srNo % 2 === 0 ? styles.tableRow : styles.oddRow}>
                <Text style={styles.tableCell}>{item.srNo}</Text>
                <Text style={styles.tableCell}>{item.level}</Text>
                <Text style={styles.tableCell}>{item.count}</Text>
                <Text style={styles.tableCell}>{item.date}</Text>
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

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('profile')}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>

                <Text style={styles.title}>Enter code for Income</Text>

                <View style={styles.logoContainer}>
                    <Image source={require('@/assets/images/emr-cover.jpg')} style={styles.logo} />
                </View>
            </View>


            {/* code Income Form Start */}

            <View style={{ margin: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                    <TextInput
                        style={styles.codeInput}
                        placeholder="Enter Code"
                        value={code}
                        onChangeText={setCode}
                        editable={!isSubmitting}
                    />
                    <TouchableOpacity
                        style={[styles.button, isSubmitting && styles.disabledButton]}
                        onPress={handleSubmit}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <ActivityIndicator color="white" />
                        ) : (
                            <Text style={styles.buttonText}>Submit</Text>
                        )}
                    </TouchableOpacity>
                </View>

                {submitMessage ? (
                    <Text style={[
                        styles.messageText,
                        isError ? styles.errorText : styles.successText
                    ]}>
                        {submitMessage}
                    </Text>
                ) : null}
            </View>

            {/* code Income Form End */}

            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.uniqueKey}
                ListHeaderComponent={renderHeader}
                stickyHeaderIndices={[0]}
                ListFooterComponent={renderFooter}
                ListEmptyComponent={renderEmptyList}
                refreshing={loading}
                onRefresh={fetchData}
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

    codeInput: {
        width: '70%',
        padding: 5,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: '#fff',
        height: 40,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        paddingLeft: 10
    },
    button: {
        backgroundColor: '#0057ff',
        padding: 5,
        borderRadius: 8,
        alignItems: 'center',
        width: '30%',
        height: 40,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'SpaceMonobold',
        lineHeight: 27
    },
    disabledButton: {
        backgroundColor: '#6c757d',
    },
    messageText: {
        marginTop: 8,
        textAlign: 'center',
    },
    errorText: {
        color: 'red',
    },
    successText: {
        color: 'green',
    }

});

export default enterCode;