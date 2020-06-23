import styled from 'styled-components/native';
import { Placeholder, PlaceholderMedia, Fade } from 'rn-placeholder';
import { Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export const Wrapper = styled(Placeholder).attrs({ Animation: Fade })`
  flex: 0.5;
`;

export const Container = styled.View`
  flex-direction: row;
`;

export const Rectangle = styled(PlaceholderMedia)`
  flex: 1;
  margin: 6px;
  height: 100px;
  width: 100px;
  border-radius: 60px;
`;
