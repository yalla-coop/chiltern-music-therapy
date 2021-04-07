import styled from '@emotion/styled';

export const CardWrapper = styled.div`
  max-width: 300px;
  ${({ theme }) => theme.media.tablet} {
    max-width: none;
  }
`;
