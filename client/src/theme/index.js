import globalStyle from './global-style';
import colors from './colors';
import gradients from './gradients';

const constants = {
  columns: { mobile: 4, tablet: 6, desktop: 12 },
  gridGutter: { mobile: 8, tablet: 16, desktop: 16 },
  // side menu width
  // header height
  // ...
};

const spacings = {
  0: '4px',
  1: '8px',
  2: '12px',
  3: '16px',
  4: '24px',
  5: '32px',
  6: '48px',
  7: '64px',
  8: '80px',
  9: '120px',
};

export const screensWidth = {
  mobile: 449,
  tablet: 949,
  desktop: 1442,
};

export const media = {
  mobile: `@media (max-width: ${screensWidth.mobile}px)`,
  tablet: `@media (max-width: ${screensWidth.tablet}px)`,
  desktop: `@media (max-width: ${screensWidth.desktop}px)`,
};

export const breakpoints = {
  mobile: `${screensWidth.mobile}px`,
  tablet: `${screensWidth.tablet}px`,
  desktop: `${screensWidth.desktop}px`,
};

const theme = {
  name: 'default', // for storybook
  colors,
  spacings,
  screensWidth,
  media,
  breakpoints,
  constants,
  gradients,
};

export { globalStyle };
export default theme;
