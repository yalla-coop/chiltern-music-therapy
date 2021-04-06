import styled from '@emotion/styled';
import { H5 } from '../../../components/Typography';

export const Wrapper = styled.div`
  max-width: 948px;
`;

export const TitleWIthBorder = styled(H5)`
  position: relative;

  &::after {
    display: block;
    content: '';
    border-top: ${({ theme }) => `1px solid ${theme.colors.green}`};
    width: 50%;
    top: -10px;
    position: absolute;
  }
`;
