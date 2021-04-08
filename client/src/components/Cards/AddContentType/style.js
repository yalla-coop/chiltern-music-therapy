import styled from '@emotion/styled';
import setMargin from '../../../helpers/set-margin';

export const Wrapper = styled.button`
  ${setMargin};
  width: 100%;
  padding: ${({ theme, p }) => p || theme.spacings[4]};
  margin-bottom: ${({ theme }) => theme.spacings[5]};
  box-shadow: ${({ theme }) => theme.shadows.elevation1};
  border-radius: ${({ theme }) => theme.borders.radius};
  display: flex;
  align-items: center;
  position: relative;
  background: white;
  border: none;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  min-height: 80px;
  cursor: pointer;

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
    border-radius: 0 0 10px 10px;
  }
`;

export const Title = styled.div`
  height: 48px;
  display: flex;
  align-items: center;
`;
