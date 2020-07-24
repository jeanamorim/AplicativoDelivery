import styled from 'styled-components/native';

export const Containerr = styled.View`
  margin-top: 5px;
  border-radius: 4px;
  background: #fff;
  margin-bottom: 25px;
  margin-left: 3px;
  margin-right: 3px;
`;

export const Content = styled.View`
  padding: 13px;
`;

export const Headerr = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Title = styled.Text`
  color: #f4a460;
  font-size: 14px;
  font-weight: bold;
  margin-left: 10px;
  font-weight: bold;
`;

export const Footer = styled.View`
  background: #f8f9fd;
  padding: 20px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const FooterItem = styled.View`
  flex-direction: column;
`;

export const Small = styled.Text`
  font-weight: bold;
  font-size: 8px;
  color: #999999;
`;

export const SubTitle = styled.Text`
  font-weight: bold;
  font-size: 12px;
  color: #444444;
`;

export const Button = styled.TouchableOpacity``;

export const ButtonText = styled(SubTitle)`
  color: #f4a460;
`;
export const Line = styled.View`
  height: 1px;
  background: #f4a460;
  border: 1px solid #f4a460;
  margin-left: 30px;
  margin-right: 30px;
  margin-top: 50px;
`;

export const StatusContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: -15px;
  margin-left: 20px;
  margin-right: 20px;
`;
export const ProductList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``;
