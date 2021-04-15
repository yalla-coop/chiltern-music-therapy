import styled from '@emotion/styled';
import { Spin } from 'antd';
import { spacings } from '../../../theme';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Content = styled.main`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const HeadlineWrapper = styled.main`
  padding: ${spacings[4]} 0 ${spacings[4]} 0;
`;

export const Loading = styled(Spin)`
  span {
    line-height: 24px;
    margin-left: 10px;
    color: ${({ theme }) => theme.colors.gray5};
  }
`;
