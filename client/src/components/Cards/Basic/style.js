import styled from '@emotion/styled';
import setMargin from '../../../helpers/set-margin';

export const Wrapper = styled.div`
  ${setMargin};
  width: 100%;
  padding: ${({ theme, p }) => p || theme.spacings[4]};
  margin-bottom: ${({ theme }) => theme.spacings[5]};
  box-shadow: ${({ theme }) => theme.shadows.elevation1};
  border-radius: ${({ theme }) => theme.borders.radius};
`;

export const Links = styled.div`
  ${setMargin};
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const Point = styled.div`
  ${setMargin};
  display: flex;
`;
