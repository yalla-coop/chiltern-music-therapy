import styled from '@emotion/styled';
import { Link as RouterLink } from 'react-router-dom';
import setMargin from '../../helpers/set-margin';

const commonStyle = ({ theme, color, caps, ...props }) => `
font-style: normal;
font-weight: 900;
letter-spacing: 0.2px;
color: ${theme.colors[color] || color || theme.colors.black};
text-transform: ${caps ? 'uppercase' : 'initial'};
`;

const h1Style = ``;

const h2Style = ``;

const h3Style = ``;

const h4Style = ``;

const h5Style = ``;

const h6Style = ``;

export const H1 = styled.h1`
  ${setMargin};
  ${commonStyle};
  ${h1Style};
  ${({ theme }) => theme.media.mobile} {
    ${h2Style};
  }
`;

export const H2 = styled.h2`
  ${setMargin};
  ${h2Style};
  ${commonStyle};
  ${({ theme }) => theme.media.mobile} {
    ${h3Style};
  }
`;

export const H3 = styled.h3`
  ${setMargin};
  ${h3Style};
  ${commonStyle};
  ${({ theme }) => theme.media.mobile} {
    ${h4Style};
  }
`;

export const H4 = styled.h4`
  ${setMargin};
  ${h4Style};
  ${commonStyle};
  ${({ theme }) => theme.media.mobile} {
    ${h5Style};
  }
`;

export const H5 = styled.h5`
  ${setMargin};
  ${h5Style};
  ${commonStyle};
  ${({ theme }) => theme.media.mobile} {
    ${h6Style};
  }
`;
export const H6 = styled.h6`
  ${setMargin};
  ${h6Style};
  ${commonStyle};
`;

export const P = styled.p`
  ${setMargin};
  ${commonStyle};
`;

export const Link = styled(RouterLink)`
  ${setMargin};
  ${commonStyle};
  color: ${({ theme, color }) =>
    theme.colors[color] || color || theme.colors.blue};
  text-decoration-line: underline;
`;
