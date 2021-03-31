import styled from '@emotion/styled';
import { Modal as AntModal } from 'antd';
import theme from '../../theme';

const decideType = (type) => {
  switch (type) {
    case 'warning':
      return {
        borderColor: theme.gradients.PinkUnder,
        background: theme.colors.white,
      };
    default:
      return {
        borderColor: theme.gradients.lightGreenUnder,
        background: theme.colors.white,
      };
  }
};

export const Modal = styled(AntModal)`
  .ant-modal-footer,
  .ant-modal-header,
  .ant-modal-close {
    display: none;
  }

  max-width: 420px;

  .ant-modal-content {
    position: relative;
    border: none;
    border-radius: 10px;

    ::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 10px; /*1*/
      border: 3px solid transparent; /*2*/
      background: ${({ theme, variant }) =>
        `${decideType(variant).borderColor} border-box`}; /*3*/
      -webkit-mask: ${({ theme, variant }) => `linear-gradient(${
        decideType(variant).background
      } 0 0) padding-box,
      linear-gradient(${theme.colors.white} 0 0)`}; /*4*/
      -webkit-mask-composite: destination-out; /*5'*/
      mask-composite: exclude; /*5*/
    }
  }

  .ant-modal-body {
    z-index: 999;
    display: flex;
    flex-direction: column;
  }

  ${theme.media.mobile} {
    max-width: 350px;
  }

  ${theme.media.mobileXS} {
    max-width: 300px;
  }
`;
