import styled from '@emotion/styled';
import setMargin from '../../../helpers/set-margin';
import { Collapse } from 'antd';

const { Panel } = Collapse;

export const Wrapper = styled.button`
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
  background: white;
  border: none;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  height: ${({ open, height }) => (open ? `${height + 40}px` : '80px')};
  transition: all 500ms ease-in;

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

  .open-enter {
    opacity: 0;
  }
  .open-enter-active {
    opacity: 1;
    transition: all 500ms linear;
  }
  .open-exit {
    opacity: 1;
  }
  .open-exit-active {
    opacity: 0;
    transition: all 500ms ease-in;
  }
`;

export const Title = styled.div`
  height: ${({ open }) => (open ? 0 : '20px')};
  opacity: ${({ open }) => (open ? 0 : 1)};
  transition: all 500ms ease-in;
`;

export const Content = styled.div`
  opacity: ${({ open }) => (!open ? 0 : 1)};
  transition: all 500ms ease-in;
`;
