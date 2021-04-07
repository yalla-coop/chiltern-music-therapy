import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const IconWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacings[6]};
`;

export const CardsWrapper = styled.div`
  display: flex;
  ${({ theme }) => `
    ${theme.media.tablet} {
       flex-direction: column;
    }
  `}
`;
