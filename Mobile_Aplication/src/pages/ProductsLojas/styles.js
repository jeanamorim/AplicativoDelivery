import styled from 'styled-components/native';

import colors from '../../styles/colors';

export const ItemCount = styled.Text`
  position: absolute;
  text-align: center;
  top: 40px;
  right: 9px;
  min-width: 17px;
  min-height: 17px;
  background: ${colors.red};
  color: ${colors.white};
  font-size: 13px;
  padding: 0px;
  border-radius: 8px;
  overflow: hidden;
`;
