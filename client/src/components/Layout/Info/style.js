import styled from '@emotion/styled';

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  min-height: 100vh;
  flex-direction: row;
  justify-content: flex-start;
  ${({ theme }) => theme.media.tablet} {
    flex-direction: column-reverse;
    justify-content: flex-end;
  }
`;

export const AssetWrapper = styled.div`
  width: 50%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  ${({ theme }) => theme.media.tablet} {
    width: 100%;
  }
`;

export const Content = styled.main`
  width: 50%;
  padding: ${({ theme: { spacings } }) =>
    `40px ${spacings[5]} 40px ${spacings[10]}`};
  ${({ theme }) => theme.media.tablet} {
    width: 100%;
    padding: ${({ theme: { spacings } }) => `${spacings[7]} ${spacings[9]}`};
  }

  ${({ theme }) => theme.media.mobile} {
    width: 100%;
    padding: ${({ theme: { spacings } }) =>
      `${spacings[0]} 38px ${spacings[6]} 38px`};
  }
`;
