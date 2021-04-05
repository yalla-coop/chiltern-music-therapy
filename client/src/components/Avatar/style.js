import styled from '@emotion/styled';
import fallback from '../assets/Avatar.svg';

export const AvatarImage = styled.div`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background-image: ${({ image }) => `url(${image})`}, url('${fallback}');
  background-position: center;
  background-size: cover;
  position: absolute;
  top: 8px;
  left: 8px;
`;

export const AvatarContainer = styled.div`
  margin: 5px;
  width: 198px;
  height: 198px;
  background: white;
  border-radius: 50%;
  box-sizing: border-box;
  position: relative;
  text-align: center;
  &:before {
    border-radius: 100%;
    content: '';
    background-image: ${({ theme: { gradients } }) =>
      gradients.rainbowHorizontal};
    width: 202px;
    height: 202px;
    top: -2px;
    left: -2px;
    position: absolute;
    z-index: -1;
  }
`;
