import styled from '@emotion/styled';
import setMargin from '../../helpers/set-margin';
import { P } from '../Typography';

export const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: calc(100% + 4px);
  background: ${({ theme }) => theme.gradients.lightBlue};
  position: relative;
  border: none;
  z-index: 2;
  border-radius: 4px;
`;

export const InnerDiv = styled.div`
  background: white;
  height: 36px;
  width: calc(100% - 4px);
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
`;

export const Text = styled(P)`
  background: white;
  border: 1px red solid;
  width: 100%;
`;

export const Container = styled.div`
  ${setMargin};
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

export const Wrapper = styled.div`
  margin-bottom: 12px;
  margin-right: 12px;
`;
