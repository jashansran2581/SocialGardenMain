import Constants from 'expo-constants';
import * as Location from 'expo-location';
import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Chip } from 'react-native-paper';

// Initialize Firebase
const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.firebaseApiKey,
  authDomain: Constants.expoConfig?.extra?.firebaseAuthDomain,
  projectId: Constants.expoConfig?.extra?.firebaseProjectId,
  storageBucket: Constants.expoConfig?.extra?.firebaseStorageBucket,
  messagingSenderId: Constants.expoConfig?.extra?.firebaseMessagingSenderId,
  appId: Constants.expoConfig?.extra?.firebaseAppId,
};

const GOOGLE_MAPS_API_KEY = Constants.expoConfig?.extra?.googleMapsApiKey;
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

interface Address {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  tags: string[];
}

interface Location {
  latitude: number;
  longitude: number;
}

const tags: string[] = ['Water Access', 'Fenced', 'Mulch', 'Road Access'];

const MapSearchComponent: React.FC = () => {
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [nearbyAddresses, setNearbyAddresses] = useState<Address[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const mapRef = useRef<MapView | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  const fetchAddresses = async () => {
    if (!userLocation) return;

    try {
      const addressesRef = collection(db, 'addresses');
      let q = query(addressesRef);

      // Apply tag filters if any are selected
      if (selectedTags.length > 0) {
        q = query(addressesRef, where('tags', 'array-contains-any', selectedTags));
      }

      const querySnapshot = await getDocs(q);
      const addresses: Address[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as Omit<Address, 'id'>;
        addresses.push({ id: doc.id, ...data });
      });

      setNearbyAddresses(addresses);
    } catch (error) {
      console.error("Error fetching addresses: ", error);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, [userLocation, selectedTags]);

  const searchAddress = async () => {
    if (!searchQuery.trim()) {
      Alert.alert("Error", "Please enter an address to search");
      return;
    }

    try {
      const encodedAddress = encodeURIComponent(searchQuery);
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();

      if (data.status === 'OK' && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        const newLocation: Location = { latitude: lat, longitude: lng };

        // Update user location
        setUserLocation(newLocation);

        // Move map to the new location
        mapRef.current?.animateToRegion({
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }, 1000); // 1000ms animation duration

        // Fetch addresses near the new location
        await fetchAddresses();
      } else {
        Alert.alert("Error", "Could not find the specified address");
      }
    } catch (error) {
      console.error("Error in geocoding:", error);
      Alert.alert("Error", "An error occurred while searching for the address");
    }
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prevTags =>
      prevTags.includes(tag)
        ? prevTags.filter(t => t !== tag)
        : [...prevTags, tag]
    );
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={userLocation ? {
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        } : undefined}
      >
        {userLocation && (
          <Marker
            coordinate={userLocation}
            title="You are here"
            pinColor='blue'
          />
        )}
        {nearbyAddresses.map((address) => (
          <Marker
            key={address.id}
            coordinate={{ latitude: address.latitude, longitude: address.longitude }}
            title={address.name}
            pinColor='red'
          />
        ))}
      </MapView>
      
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for an address"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={searchAddress}
        />
      </View>
      
      <View style={styles.tagContainer}>
        {tags.map(tag => (
          <Chip
            key={tag}
            selected={selectedTags.includes(tag)}
            onPress={() => toggleTag(tag)}
            style={[styles.chip, selectedTags.includes(tag) && styles.selectedChip]}
            textStyle={selectedTags.includes(tag) ? styles.selectedChipText : null}
          >
            {tag}
          </Chip>
        ))}
      </View>
      
      <FlatList
        data={nearbyAddresses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>{item.name}</Text>
            <Text>{item.tags.join(', ')}</Text>
          </View>
        )}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  map: {
    height: 350,
    width: '100%',
    marginBottom: 10,
  },
  searchContainer: {
    padding: 10,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 10,
  },
  chip: {
    margin: 5,
  },
  selectedChip: {
    backgroundColor: 'green',
  },
  selectedChipText: {
    color: 'white',
  },
  list: {
    maxHeight: 200,
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default MapSearchComponent;