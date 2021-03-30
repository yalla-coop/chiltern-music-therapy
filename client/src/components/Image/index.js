import React from 'react';
import styled from '@emotion/styled';

import Welcome1 from '../assets/Welcome1.png';
import Welcome2 from '../assets/Welcome2.png';
import Welcome3 from '../assets/Welcome3.png';
import Welcome4 from '../assets/Welcome4.png';
import Welcome5 from '../assets/Welcome5.png';

const imgMap = {
  welcome1: Welcome1,
  welcome2: Welcome2,
  welcome3: Welcome3,
  welcome4: Welcome4,
  welcome5: Welcome5,
};

const StyledImage = styled.img`
  max-width: 100%;
  width: ${({ width }) => (width ? `${width}px` : 'auto')};
  height: ${({ height }) => (height ? `${height}px` : 'auto')};
  margin: ${({ margin }) => margin || '0'};
`;

const Image = ({ image, width, height, margin, alt, customStyle }) => {
  if (!imgMap[image]) {
    // eslint-disable-next-line no-console
    console.warn(`<Image /> called with invalid image prop "${image}"`);
    return null;
  }

  return (
    <StyledImage
      src={imgMap[image]}
      alt={alt}
      width={width}
      height={height}
      margin={margin}
      style={{ ...customStyle }}
    />
  );
};

export default Image;
