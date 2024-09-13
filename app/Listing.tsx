import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Icon for the back button

const StaticListingDetails = ({ navigation }: any) => {
  const sampleListing = {
    title: 'Cozy Garden Land for Rent',
    location: 'Rural Area, Green Valley, United States',
    price: 150,
    description:
      'A peaceful and fertile land perfect for gardening and farming. Comes with access to water and great sunlight all year round.',
    amenities: ['Water supply', 'Fenced land', 'Easy road access', 'Sunny location'],
    images: [
      "https://a0.muscache.com/im/pictures/a0c990cc-24d4-4820-929d-9c9519771a3b.jpg?im_w=1200",
      "https://a0.muscache.com/im/pictures/833107e0-e6c1-4238-a7cc-3b583d16a7ed.jpg?im_w=1200",
      "https://a0.muscache.com/im/pictures/a0c990cc-24d4-4820-929d-9c9519771a3b.jpg?im_w=1200",
      "https://a0.muscache.com/im/pictures/833107e0-e6c1-4238-a7cc-3b583d16a7ed.jpg?im_w=1200",
    ],
    reviews: 4.8,
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / 350); // Adjust the width value to match image width
    setCurrentImageIndex(index);
  };

  const handleReserve = () => {
    console.log('Reservation logic here');
  };

  return (
    <View style={styles.container}>
      {/* Image Carousel */}
      <View style={styles.imageContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-circle" size={35} color="#fff" />
        </TouchableOpacity>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
        >
          {sampleListing.images.map((imageUrl, index) => (
            <Image key={index} source={{ uri: imageUrl }} style={styles.image} />
          ))}
        </ScrollView>
        <View style={styles.imageCountContainer}>
          <Text style={styles.imageCountText}>
            {currentImageIndex + 1} / {sampleListing.images.length}
          </Text>
        </View>
      </View>

      {/* Listing Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{sampleListing.title}</Text>
        <Text style={styles.location}>{sampleListing.location}</Text>
        <Text style={styles.price}>${sampleListing.price} / night</Text>
        <Text style={styles.description}>{sampleListing.description}</Text>

        {/* Reviews */}
        <Text style={styles.reviews}>Rating: {sampleListing.reviews} ★</Text>

        {/* What this place offers */}
        <Text style={styles.offersTitle}>What this place offers</Text>
        {sampleListing.amenities.map((amenity, index) => (
          <Text key={index} style={styles.amenity}>
            {amenity}
          </Text>
        ))}
      </View>

      {/* Reserve Button */}
      <View style={styles.reserveContainer}>
        <Text style={styles.reservePrice}>${sampleListing.price} / night</Text>
        <TouchableOpacity style={styles.reserveButton} onPress={handleReserve}>
          <Text style={styles.reserveButtonText}>Reserve</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    height: 250,
  },
  image: {
    width: 350, // Adjust for better image rendering
    height: '100%',
    resizeMode: 'cover',
  },
  imageCountContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#000',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  imageCountText: {
    color: '#fff',
    fontSize: 12,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  location: {
    fontSize: 16,
    color: '#555',
    marginVertical: 5,
  },
  price: {
    fontSize: 18,
    color: '#e74c3c',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  reviews: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  offersTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  amenity: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  reserveContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    width: '100%',
    padding: 20,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  reservePrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  reserveButton: {
    backgroundColor: '#e74c3c',
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 40,
  },
  reserveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default StaticListingDetails;




// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   Image,
//   ScrollView,
//   StyleSheet,
//   TouchableOpacity,
//   FlatList,
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons'; // Icon for the back button
// import { useNavigation, useRoute } from '@react-navigation/native'; // Navigation hooks

// const DynamicListingDetails = () => {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const { listingId } = route.params; // Assuming you pass the listing ID from the previous screen

//   const [listing, setListing] = useState<any>(null);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   useEffect(() => {
//     // Fetch listing data from the database or API
//     const fetchListing = async () => {
//       try {
//         // Replace with your data fetching logic
//         const response = await fetch(`https://example.com/api/listings/${listingId}`);
//         const data = await response.json();
//         setListing(data);
//       } catch (error) {
//         console.error('Error fetching listing data:', error);
//       }
//     };

//     fetchListing();
//   }, [listingId]);

//   const handleScroll = (event: any) => {
//     const contentOffsetX = event.nativeEvent.contentOffset.x;
//     const index = Math.round(contentOffsetX / 350); // Adjust the width value to match image width
//     setCurrentImageIndex(index);
//   };

//   const handleReserve = () => {
//     console.log('Reservation logic here');
//   };

//   const handleSeeAllAmenities = () => {
//     navigation.navigate('AmenitiesScreen', { amenities: listing.amenities });
//   };

//   if (!listing) {
//     return (
//       <View style={styles.container}>
//         <Text>Loading...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       {/* Image Carousel */}
//       <View style={styles.imageContainer}>
//         <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//           <Ionicons name="arrow-back-circle" size={35} color="#fff" />
//         </TouchableOpacity>
//         <ScrollView
//           horizontal
//           pagingEnabled
//           showsHorizontalScrollIndicator={false}
//           onScroll={handleScroll}
//         >
//           {listing.images.map((imageUrl: string, index: number) => (
//             <Image key={index} source={{ uri: imageUrl }} style={styles.image} />
//           ))}
//         </ScrollView>
//         <View style={styles.imageCountContainer}>
//           <Text style={styles.imageCountText}>
//             {currentImageIndex + 1} / {listing.images.length}
//           </Text>
//         </View>
//       </View>

//       {/* Listing Details */}
//       <View style={styles.detailsContainer}>
//         <Text style={styles.title}>{listing.title}</Text>
//         <Text style={styles.location}>{listing.location}</Text>
//         <Text style={styles.price}>${listing.price} / night</Text>
//         <Text style={styles.description}>{listing.description}</Text>

//         {/* Reviews */}
//         <Text style={styles.reviews}>Rating: {listing.reviews} ★</Text>

//         {/* What this place offers */}
//         <Text style={styles.offersTitle}>What this place offers</Text>
//         {listing.amenities.map((amenity: string, index: number) => (
//           <Text key={index} style={styles.amenity}>
//             {amenity}
//           </Text>
//         ))}

//         {/* See All Amenities Button */}
//         <TouchableOpacity style={styles.amenitiesButton} onPress={handleSeeAllAmenities}>
//           <Text style={styles.amenitiesButtonText}>See All Amenities</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Reserve Button */}
//       <View style={styles.reserveContainer}>
//         <Text style={styles.reservePrice}>${listing.price} / night</Text>
//         <TouchableOpacity style={styles.reserveButton} onPress={handleReserve}>
//           <Text style={styles.reserveButtonText}>Reserve</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   imageContainer: {
//     height: 250,
//   },
//   image: {
//     width: 350, // Adjust for better image rendering
//     height: '100%',
//     resizeMode: 'cover',
//   },
//   imageCountContainer: {
//     position: 'absolute',
//     bottom: 10,
//     right: 10,
//     backgroundColor: '#000',
//     borderRadius: 10,
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//   },
//   imageCountText: {
//     color: '#fff',
//     fontSize: 12,
//   },
//   backButton: {
//     position: 'absolute',
//     top: 10,
//     left: 10,
//     zIndex: 1,
//   },
//   detailsContainer: {
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   location: {
//     fontSize: 16,
//     color: '#555',
//     marginVertical: 5,
//   },
//   price: {
//     fontSize: 18,
//     color: '#e74c3c',
//     marginBottom: 10,
//   },
//   description: {
//     fontSize: 16,
//     color: '#666',
//     marginBottom: 20,
//   },
//   reviews: {
//     fontSize: 16,
//     color: '#555',
//     marginBottom: 10,
//   },
//   offersTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   amenity: {
//     fontSize: 16,
//     color: '#666',
//     marginBottom: 5,
//   },
//   amenitiesButton: {
//     marginTop: 10,
//     paddingVertical: 10,
//     backgroundColor: '#3498db',
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   amenitiesButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   reserveContainer: {
//     position: 'absolute',
//     bottom: 0,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     backgroundColor: '#fff',
//     width: '100%',
//     padding: 20,
//     borderTopWidth: 1,
//     borderColor: '#ccc',
//   },
//   reservePrice: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   reserveButton: {
//     backgroundColor: '#e74c3c',
//     borderRadius: 20,
//     paddingVertical: 15,
//     paddingHorizontal: 40,
//   },
//   reserveButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default DynamicListingDetails;
