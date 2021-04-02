import styled from '@emotion/styled';
import setMargin from '../../../helpers/set-margin';

export const Wrapper = styled.div`
  ${setMargin};
  width: 100%;
  padding: ${({ theme, p }) => p || theme.spacings[4]};
  margin-bottom: ${({ theme }) => theme.spacings[5]};
  box-shadow: ${({ theme }) => theme.shadows.elevation1};
  border-radius: ${({ theme }) => theme.borders.radius};
  overflow: hidden;
  display: flex;
  align-items: center;
  position: relative;
  min-height: 80px;

  ::before {
    content: '';
    height: 4px;
    width: 100%;
    background: ${({ borderColor, theme }) =>
      theme.gradients[borderColor] ||
      theme.colors[borderColor] ||
      theme.colors.gray3};
    position: absolute;
    bottom: 0;
    left: 0;
  }
`;

export const GraphicWrapper = styled.div`
  ${setMargin};
  width: 100%;
  padding: ${({ theme, p }) => p || theme.spacings[4]};
  margin-bottom: ${({ theme }) => theme.spacings[5]};
  box-shadow: ${({ theme }) => theme.shadows.elevation1};
  border-radius: ${({ theme }) => theme.borders.radius};
  position: relative;
  overflow: hidden;
  height: 130px;
`;

export const Title = styled.div`
  display: flex;

  div {
    font-size: 1.125rem !important;

    ${({ theme }) => `
    ${theme.media.mobile} {
      font-size: 1rem !important;
    }
  `}
  }
`;

export const ProgDetails = styled.div``;
