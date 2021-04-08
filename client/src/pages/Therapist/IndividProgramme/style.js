import styled from '@emotion/styled';
import { Col } from '../../../components/Grid';

export const GreenLine = styled.span`
  height: 1px;
  width: 55px;
  background: ${({ theme }) => theme.gradients.lightGreenUnder};
  display: black;
  margin-bottom: 10px;
`;

export const HorizontalCol = styled(Col)`
  flex-direction: column;
  align-items: flex-start;
`;

export const BoldSpan = styled.span`
  font-weight: bold;
`;
