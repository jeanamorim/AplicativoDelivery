import styled from 'styled-components/native';

export const ProductList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``;
export const Container = styled.View`
  margin-left: 5px;
  display: flex;
  border-color: #9999;
  border-width: 1;
  max-width: 135px;
  max-height: 180px;
  border-top-right-radius: 40px;
`;

export const Left = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Avatar = styled.Image`
  background: #fff;
  border-color: #9999;
  flex: 1;
  display: flex;

  max-width: 130px;
  height: 110px;
  border-top-right-radius: 40px;

  border-color: #fff;
  border-width: 1;
  align-items: center;
`;

export const Info = styled.View`
  display: flex;
  align-items: center;
`;
export const Avaliacao = styled.View`
  display: flex;
  flex-direction: row;
  margin-left: 5px;
  margin-top: 5px;
`;
export const Name = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: #333;

  align-self: center;
`;

export const Time = styled.Text`
  margin-top: 4px;
  font-size: 13px;
  color: #999;
`;

export const Canceled = styled.Text`
  margin-top: 4px;
  font-size: 13px;
  font-weight: bold;
  color: #f64c75;
`;
