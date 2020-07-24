/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';

import api from '../../services/api';

import { ImageSlide, Banner } from './styles';

export default function BannerHome({ navigation }) {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    async function getData() {
      const bannersResponse = await api.get('/banners');

      const bannerData = bannersResponse.data.map(banner => ({
        id: banner.id,
        url: banner.image.url,
      }));

      setBanners(bannerData);
    }

    getData();
  }, []);

  return (
    <ImageSlide>
      {banners.map(banner => (
        <Banner
          key={banner.id}
          source={{
            uri: banner.url.replace('localhost', '10.0.0.106'),
          }}
        />
      ))}
    </ImageSlide>
  );
}
