import React from 'react';
import styled from '@emotion/styled';
import setMargin from '../../helpers/set-margin';

import Headphones from '../assets/Headphones.svg';
import HeadphonesS from '../assets/HeadphonesX.svg';
import Dancing from '../assets/Dancing.svg';
import DancingS from '../assets/DancingX.svg';
import Hands from '../assets/Hands.svg';
import HandsS from '../assets/HandsX.svg';
import Meeting from '../assets/Meeting.svg';
import MeetingS from '../assets/MeetingX.svg';
import Mom from '../assets/Mom.svg';
import MomS from '../assets/MomX.svg';
import MomPink from '../assets/MomPink.svg';
import MomPinkS from '../assets/MomPinkX.svg';
import Man from '../assets/Man.svg';
import ManS from '../assets/ManX.svg';
import Rainbow from '../assets/Rainbow.svg';
import BlueCircles from '../assets/BlueCircles.svg';
import GreenCircles from '../assets/GreenCircles.svg';
import OrangeCircles from '../assets/OrangeCircles.svg';
import PinkCircles from '../assets/PinkCircles.svg';

const imgMap = {
  headphones: Headphones,
  headphonesS: HeadphonesS,
  dancing: Dancing,
  dancingS: DancingS,
  hands: Hands,
  handsS: HandsS,
  meeting: Meeting,
  meetingS: MeetingS,
  mom: Mom,
  momS: MomS,
  momPink: MomPink,
  momPinkS: MomPinkS,
  man: Man,
  manS: ManS,
  rainbow: Rainbow,
  blueCircles: BlueCircles,
  greenCircles: GreenCircles,
  orangeCircles: OrangeCircles,
  pinkCircles: PinkCircles,
};

const StyledImage = styled.img`
  max-width: 100%;
  width: ${({ width }) => (width ? `${width}px` : 'auto')};
  height: ${({ height }) => (height ? `${height}px` : 'auto')};
  ${setMargin}
`;

const Image = ({
  image,
  width,
  height,
  margin,
  alt = 'Therapy Illustration',
  customStyle,
  ...props
}) => {
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
      {...props}
    />
  );
};

export default Image;
