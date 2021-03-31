import { css } from '@emotion/react';

const margins = ({
  mx,
  mxT,
  mxM,
  ml,
  mlT,
  mlM,
  m,
  mT,
  mM,
  mr,
  mrT,
  mrM,
  my,
  myT,
  myM,
  mt,
  mtT,
  mtM,
  mb,
  mbT,
  mbM,
  theme,
}) => css`
  margin-left: ${theme.spacings[ml] ||
  ml ||
  theme.spacings[mx] ||
  mx ||
  theme.spacings[m]} !important;
  margin-right: ${theme.spacings[mr] ||
  mr ||
  theme.spacings[mx] ||
  mx ||
  theme.spacings[m]} !important;
  margin-top: ${theme.spacings[mt] ||
  mt ||
  theme.spacings[my] ||
  my ||
  theme.spacings[m]} !important;
  margin-bottom: ${theme.spacings[mb] ||
  mb ||
  theme.spacings[my] ||
  my ||
  theme.spacings[m] ||
  0} !important;
  ${theme.media.tablet} {
    margin-left: ${theme.spacings[mlT] ||
    mlT ||
    theme.spacings[mxT] ||
    mxT ||
    theme.spacings[mT]} !important;
    margin-right: ${theme.spacings[mrT] ||
    mrT ||
    theme.spacings[mxT] ||
    mxT ||
    theme.spacings[mT]} !important;
    margin-top: ${theme.spacings[mtT] ||
    mtT ||
    theme.spacings[myT] ||
    myT ||
    theme.spacings[mT]} !important;
    margin-bottom: ${theme.spacings[mbT] ||
    mbT ||
    theme.spacings[myT] ||
    myT ||
    theme.spacings[mT] ||
    0} !important;
  }
  ${theme.media.mobile} {
    margin-left: ${theme.spacings[mlM] ||
    mlM ||
    theme.spacings[mxM] ||
    mxM ||
    theme.spacings[mM]} !important;
    margin-right: ${theme.spacings[mrM] ||
    mrM ||
    theme.spacings[mxM] ||
    mxM ||
    theme.spacings[mM]} !important;
    margin-top: ${theme.spacings[mtM] ||
    mtM ||
    theme.spacings[myM] ||
    myM ||
    theme.spacings[mM]} !important;
    margin-bottom: ${theme.spacings[mbM] ||
    mbM ||
    theme.spacings[myM] ||
    myM ||
    theme.spacings[mM] ||
    0} !important;
  }
`;

export default margins;
