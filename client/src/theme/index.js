import globalStyle from './global-style';

const constants = {
  columns: { mobile: 4, tablet: 6, desktop: 12 },
  gridGutter: { mobile: 8, tablet: 16, desktop: 16 },
  // side menu width
  // header height
  // ...
};

const colors = {
  pink: '#C43BAD',
};

const spacings = {
  0: '0rem',
  1: '0.5rem',
  2: '1rem',
  3: '1.5rem',
  4: '2rem',
  5: '3rem',
  6: '4rem',
  7: '7rem',
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
};

export { globalStyle };
export default theme;
