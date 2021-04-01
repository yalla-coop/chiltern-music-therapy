import globalStyle from './global-style';
import colors from './colors';
import gradients from './gradients';
import borders from './borders';
import shadows from './shadows';

const constants = {
  columns: { mobile: 4, tablet: 12, desktop: 12 },
  gridGutter: { mobile: 8, tablet: 16, desktop: 24 },
  // side menu width
  // header height
  // ...
};

const spacings = {
  0: '0px',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '24px',
  6: '32px',
  7: '48px',
  8: '64px',
  9: '80px',
  10: '120px',
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
  borders,
  shadows,
};

export { globalStyle };
export default theme;
