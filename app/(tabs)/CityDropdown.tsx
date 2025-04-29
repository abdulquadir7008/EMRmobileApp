import React, { useState, useEffect } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

export default function CityDropdown({ selectedCity, onCityChange }) {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch('https://emrmarketingapi.vercel.app/cities');
        const cityData = await response.json();
        const cityItems = cityData.map((city) => ({
          label: city.city,
          value: city.id,
          state_id: city.state_id,
        }));
    
        setItems([{ label: 'Select District', value: null }, ...cityItems]);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };
    
    fetchCities();
  }, []);
  
  
  

  return (
    <DropDownPicker
      open={open}
      value={selectedCity}
      onChangeValue={(selectedId) => onCityChange(selectedId)}
      items={items}
      setOpen={setOpen}
      setValue={onCityChange}
      setItems={setItems}
      placeholder="Select District"
      searchable={true}
      searchPlaceholder="Search District"
      style={{ borderColor: '#ccc', borderRadius: 5 }}
      dropDownContainerStyle={{ borderColor: '#ccc' }}
      listMode="MODAL"
    />
  );
}