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
  min-height: ${({ open, height }) => (open ? `${height}px` : '80px')};
  transition: all 500ms ease-in;
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
  height: ${({ open }) => (open ? 0 : '48px')};
  opacity: ${({ open }) => (open ? 0 : 1)};
  transition: all 500ms ease-in;
  display: flex;
  align-items: center;
`;

export const Content = styled.div`
  opacity: ${({ open }) => (!open ? 0 : 1)};
  height: ${({ open }) => (!open ? 0 : 'auto')};

  display: flex;
  flex-direction: column;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: ${({ theme }) => theme.spacings[5]};
  margin-bottom: ${({ theme }) => theme.spacings[4]};
`;

export const InvisibleBtn = styled.button`
  cursor: pointer;
  border: none;
  background: none;
`;
