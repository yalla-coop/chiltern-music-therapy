import styled from '@emotion/styled';

export const Wrapper = styled.div`
  padding-top: ${({ theme: { spacings } }) => spacings[9]};
  display: flex;
  flex-direction: column;
  height: 100%;

  ${({ theme }) => theme.media.tablet} {
    padding-top: 0;
    flex-grow: 1;
  }
`;

export const ButtonWrapper = styled.div`
  ${({ theme }) => theme.media.mobile} {
    height: 100%;
    margin: auto 0 0 0;
  }
`;
