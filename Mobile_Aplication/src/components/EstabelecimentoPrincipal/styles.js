import styled from 'styled-components/native';

export const ProductList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``;
export const Container = styled.View`
  elevation: 4;
  margin-bottom: 5px;
  padding: 10px;
  border-bottom-right-radius: 40px;
  background: #fff;
  border-color: #9999;
  border-width: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Left = styled.View`
  flex-direction: row;
  align-items: center;
`;
export const Text = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #333;
`;

export const Avatar = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 50px;
  opacity: ${props => (props.past ? 0.4 : 1)};
`;

export const Info = styled.View`
  margin-left: 10px;
`;
export const Avaliacao = styled.View`
  display: flex;
  flex-direction: row;
  margin-left: 5px;
  margin-top: 5px;
`;
export const Name = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #333;
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
