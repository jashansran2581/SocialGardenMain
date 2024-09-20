import { View } from "react-native";
import React, { useMemo, useState } from "react";
import ListingsBottomSheet from "@/components/ListingsBottomSheet";
import listingsData from "@/assets/data/airbnb-listings.json";
import ListingsMap from "@/components/ListingsMap";
import listingsDataGeo from "@/assets/data/airbnb-listings.geo.json";
import { Stack } from "expo-router";
import ExploreHeader from "@/components/ExploreHeader";
import Listings from "@/components/Listings";

const Page = () => {
  const items = useMemo(() => listingsData as any, []);
  const getoItems = useMemo(() => listingsDataGeo, []);  // **This is a new variable for geo data**
  const [category, setCategory] = useState<string>('Tiny homes');

  const onDataChanged = (category: string) => {
    setCategory(category);
  };

  return (
    <View style={{ flex: 1, marginTop: 60 }}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader/>,
        }}
      />
      <Listings listings={items} category={category} refresh={0} />  
      {/* **Listings component used instead of BottomSheet** */}
      {/* <ListingsMap listings={listingsDataGeo} /> */}
    </View>
  );
};

export default Page;
