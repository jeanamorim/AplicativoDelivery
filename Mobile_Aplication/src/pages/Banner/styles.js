import styled from 'styled-components/native';

import Swiper from 'react-native-swiper';

export const ImageSlide = styled(Swiper).attrs({
  autoplay: true,
  showsPagination: false,
  showsButtons: false,
  marginTop: 6,
  maxHeight: 115,
})``;

export const Banner = styled.Image`
  flex: 1;
  position: absolute;
  height: 110px;
  width: 100%;
  border-radius: 8px;
  border-color: #f4a460;
  border-width: 2;
  border-radius: 15px;
`;
export const PlaceholderCat = styled.View`
  background: #fff;
`;
