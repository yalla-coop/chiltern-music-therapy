import styled from '@emotion/styled';
import setMargin from '../../helpers/set-margin';

export const Div = styled.div`
  ${setMargin};
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ w }) => w || '100%'};
  height: 40px;
  background: white;
  position: relative;
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
