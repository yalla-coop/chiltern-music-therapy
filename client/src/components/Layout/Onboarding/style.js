import styled from '@emotion/styled';

export const OnboardingHeader = styled.header`
  width: 100%;
  background: white;
  padding: ${({ theme: { spacings } }) => `40px ${spacings[10]}`};

  ${({ theme }) => theme.media.tablet} {
    padding: ${({ theme: { spacings } }) =>
      `${spacings[7]} ${spacings[9]} ${spacings[0]} ${spacings[9]}`};
  }

  ${({ theme }) => theme.media.mobile} {
    padding: ${({ theme: { spacings } }) =>
      `${spacings[6]} 37px ${spacings[0]} 38px`};
  }
`;

export const Border = styled.div`
  height: ${({ theme: { spacings } }) => spacings[1]};
  width: 100%;
  position: absolute;
  background: ${({ theme: { gradients } }) => gradients.rainbowHorizontal};
  ${({ theme }) => theme.media.tablet} {
    display: none;
  }
`;

export const Wrapper = styled.div`
  position: relative;
`;

export const Content = styled.main`
  width: 100%;
  padding: ${({ theme: { spacings } }) => `${spacings[8]} ${spacings[10]}`};
  ${({ theme }) => theme.media.tablet} {
    padding: ${({ theme: { spacings } }) => `${spacings[7]} ${spacings[9]}`};
  }
  ${({ theme }) => theme.media.mobile} {
    padding: ${({ theme: { spacings } }) =>
      `${spacings[7]} 37px ${spacings[6]} 38px`};
  }
`;
