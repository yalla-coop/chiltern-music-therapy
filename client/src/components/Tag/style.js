import styled from '@emotion/styled';
import setMargin from '../../helpers/set-margin';

export const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: fit-content;
  background: white;
  position: relative;
  padding: 12px 16px;
  &:before {
    position: absolute;
    content: '';
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    z-index: -1;
    background: ${({ theme }) => theme.gradients.lightBlue};
    border-radius: 4px;
  }
`;

export const Container = styled.div`
  ${setMargin};
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

export const Wrapper = styled.div`
  margin-top: 12px;
  margin-left: 12px;
`;
