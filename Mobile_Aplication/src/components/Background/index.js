import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';

export default styled(LinearGradient).attrs({
  colors: ['#fff', '#fff'],
  useAngle: true,
  angle: 120,
  angleCenter: { x: 0.5, y: 0.5 },
})`
  flex: 1;
`;
