import styled from '@emotion/styled';
import { spacings } from '../../../theme';

export const Wrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.main`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const HeadlineWrapper = styled.main`
  padding: ${spacings[4]} 0 ${spacings[4]} 0;
`;
