import styled from '@emotion/styled';
import { Link as RouterLink } from 'react-router-dom';
import setMargin from '../../helpers/set-margin';
import { Typography } from 'antd';
const { Title, Paragraph } = Typography;

const commonStyle = ({ theme, color, caps, ...props }) => `
font-style: normal !important;
font-weight: 900 !important;
letter-spacing: 0.2px !important;
color: ${theme.colors[color] || color || theme.colors.black} !important;
text-transform: ${caps ? 'uppercase' : 'initial'} !important;
`;

const h1Style = ({ bold }) => `
  font-size: 38px !important;
  line-height: 44px !important;
  font-weight:  ${bold ? '900 !important' : '300 !important'};
`;

const h2Style = ({ bold }) => `
font-size: 24px !important;
line-height: 44px !important;
font-weight:  ${bold ? '900 !important' : '300 !important'};
`;

const h3Style = `
font-size: 20px !important;
line-height: 32px !important;
font-weight:  700 !important;
`;

const h4Style = ({ bold }) => `
font-size: 18px !important;
line-height: 150% !important;
font-weight:  ${bold ? '900 !important' : '300 !important'};
`;

const h5Style = () => `
font-size: 14px !important;
line-height: 150px !important;
font-weight:  400 !important;
`;

const pStyle = ({ bold }) => `
font-size: 16px !important;
line-height: 150% !important;
font-weight:  ${bold ? '700 !important' : '300 !important'};
`;
const linkStyle = ({ bold }) => `
font-size: 16px !important;
line-height: 150% !important;
font-weight:  ${bold ? '700 !important' : '300 !important'};
`;

const Head1 = styled(Title)`
  ${setMargin};
  ${commonStyle};
  ${h1Style};
`;
export const H1 = (props) => <Head1 {...props} level={1} />;

export const Head2 = styled(Title)`
  ${setMargin};
  ${commonStyle};
  ${h2Style};
`;
export const H2 = (props) => <Head2 {...props} level={2} />;

export const Head3 = styled(Title)`
  ${setMargin};
  ${commonStyle};
  ${h3Style};
`;
export const H3 = (props) => <Head3 {...props} level={3} />;

export const Head4 = styled(Title)`
  ${setMargin};
  ${commonStyle};
  ${h4Style};
`;
export const H4 = (props) => <Head4 {...props} level={4} />;

export const Head5 = styled(Title)`
  ${setMargin};
  ${commonStyle};
  ${h5Style};
`;
export const H5 = (props) => <Head5 {...props} level={5} />;

export const P = styled(Paragraph)`
  ${setMargin};
  ${commonStyle};
  ${pStyle};
`;

const AntdLink = ({ to = '/', ...props }) => (
  <RouterLink to={to} component={() => <Typography.Link {...props} />} />
);

export const Link = styled(AntdLink)`
  ${setMargin};
  ${commonStyle};
  ${linkStyle};
`;
