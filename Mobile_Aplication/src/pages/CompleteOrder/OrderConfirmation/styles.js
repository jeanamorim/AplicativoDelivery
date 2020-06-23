import styled from 'styled-components/native';

import Button from '../../../components/Button';
import colors from '../../../styles/colors';

export const Container = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 20 },
})``;

export const CreditCardContainer = styled.View`
  align-items: center;
  margin-bottom: 20px;
`;

export const ShippingDetailsContainer = styled.View``;

export const ShippingDetailsHeader = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const AddresseeContainer = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${colors.border};
  margin-bottom: 10px;
`;

export const AddresseeLabel = styled.Text`
  font-size: 12px;
  text-transform: uppercase;
  font-weight: bold;
  color: ${colors.border};
`;

export const AddresseeText = styled.Text`
  font-size: 15px;
`;

export const AddressContainer = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${colors.border};
  margin-bottom: 10px;
`;

export const AddressLabel = styled.Text`
  font-size: 12px;
  text-transform: uppercase;
  font-weight: bold;
  color: ${colors.border};
`;

export const AddressText = styled.Text`
  font-size: 15px;
`;

export const CityPostalCodeContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const CityContainer = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${colors.border};
`;

export const CityLabel = styled.Text`
  font-size: 12px;
  text-transform: uppercase;
  font-weight: bold;
  color: ${colors.border};
`;

export const CityText = styled.Text`
  font-size: 15px;
`;

export const PostalCodeContainer = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${colors.border};
`;

export const PostalCodeLabel = styled.Text`
  font-size: 12px;
  text-transform: uppercase;
  font-weight: bold;
  color: ${colors.border};
`;

export const PostalCodeText = styled.Text`
  font-size: 15px;
`;

export const OrderSummaryContainer = styled.View`
  margin-top: 20px;
`;

export const OrderSummaryHeader = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const SubtotalContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const SubtotalLabel = styled.Text`
  line-height: 20px;
`;

export const SubtotalText = styled.Text`
  line-height: 20px;
`;

export const DeliveryFeeContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const DeliveryFeeLabel = styled.Text`
  line-height: 20px;
`;

export const DeliveryFeeText = styled.Text`
  line-height: 20px;
`;

export const TotalContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const TotalLabel = styled.Text`
  font-weight: bold;
  font-size: 15px;
  line-height: 20px;
`;

export const TotalText = styled.Text`
  font-weight: bold;
  font-size: 15px;
  line-height: 20px;
`;

export const ConfirmButton = styled(Button)`
  background: #f4a460;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 12px;
  color: #fff;
  border-radius: 4px;
  margin: 1px;
  margin-top: 0px;
  margin-left: 1px;
  margin-right: 1px;
`;
export const Card = styled.View`
  border-radius: 4px;
  padding: 13px;
  background-color: #fff;
  margin-bottom: 10px;
  margin-left: -2px;
  margin-right: 8px;
  margin-top: 2px;
`;

export const CardHeader = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
`;

export const CardTitle = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #f4a460;
  margin-left: 5px;
`;

export const Title = styled.Text`
  font-weight: bold;
  text-transform: uppercase;
  font-size: 14px;
  color: #9999;
  margin-bottom: 2px;
`;
export const TitleTotal = styled.Text`
  font-weight: bold;
  text-transform: uppercase;
  font-size: 14px;
  color: #000;
  margin-bottom: 2px;
`;

export const Subtitle = styled.Text`
  font-size: 14px;
  color: #666666;
  margin-bottom: 15px;
`;

export const DateRow = styled.View`
  align-self: stretch;
  flex-direction: row;
  justify-content: space-between;
`;

export const DateContainer = styled.View`
  flex-direction: column;
`;
