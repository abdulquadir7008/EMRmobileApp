import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

function BoosterSixDropdown({ onValueChange }) { // Add onValueChange prop
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);
    const [userAuth, setAuthData] = useState(null);
    const [userId, setUserId] = useState(null);
    const [tokenLoaded, setTokenLoaded] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const storedUserData = await AsyncStorage.getItem('profile');
                if (storedUserData) {
                    const parsedUserData = JSON.parse(storedUserData);
                    setUserId(parsedUserData.member_id);
                }

                const authData = await AsyncStorage.getItem('authortoken');
                if (authData) {
                    setAuthData(JSON.parse(authData));
                    setTokenLoaded(true); // Set tokenLoaded to true after token is fetched
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        if (tokenLoaded && userAuth) {
            axios
                .get(`https://emrwalletbackend.vercel.app/api/boosterteamsix/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${userAuth}`,
                    },
                    timeout: 20000,
                })
                .then((response) => {
                    const formattedItems = response.data.map((user) => ({
                        label: user.label,
                        value: user.value,
                    }));
                    setItems(formattedItems);
                })
                .catch((error) => {
                    console.error('Error fetching users:', error);
                });
        }
    }, [tokenLoaded, userAuth]);



    useEffect(() => {
        if (value && onValueChange) {
            onValueChange(value);
        }
    }, [value, onValueChange]);

    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <Picker
                    selectedValue={value}
                    onValueChange={(itemValue) => setValue(itemValue)}
                    style={{ backgroundColor: "#fff", color: "#333", width:'100%' }}
                >
                    {items.map((item) => (
                        <Picker.Item key={item.value} label={item.label} value={item.value} />
                    ))}
                </Picker>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
});

export default BoosterSixDropdown;