import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { AspectRatio, Center, Image, ScrollView, View } from "native-base";
import {getBanners} from '../../api/BannersAPI'
import { screenWidth } from "../../styles/constants";

export default function BannersList() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBanners(setBanners, setLoading);
  }, []);

  return (
    <View>
      {loading ? (
        <AspectRatio ratio={3 / 1} width={screenWidth - 30}>
          <Center>
            <ActivityIndicator size='small' color='purple.400' />
          </Center>
        </AspectRatio>
      ) : (
        <ScrollView horizontal height='max' style={{ flex: 0 }}>
          {banners?.map((item, index) => (
            <AspectRatio key={index} ratio={3 / 1} width={screenWidth - 50} marginRight={3}>
              <Image resizeMode="contain" rounded='xl' source={{ uri: item.imageURL }} alt={item.imageTitle}/>
            </AspectRatio>
          ))}
        </ScrollView>
      )}
    </View>
  );
}
