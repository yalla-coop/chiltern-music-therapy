import styled from '@emotion/styled';
import { Spin } from 'antd';
import setMargin from '../../../helpers/set-margin';

export const InvisibleBtn = styled.button`
  ${setMargin};
  cursor: pointer;
  border: none;
  background: none;
`;

export const Loading = styled(Spin)`
  span {
    line-height: 24px;
    margin-left: 10px;
    color: ${({ theme }) => theme.colors.gray5};
  }
`;
