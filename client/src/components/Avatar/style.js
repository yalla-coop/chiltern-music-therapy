import styled from '@emotion/styled';
import fallback from '../assets/Avatar.svg';

export const AvatarImage = styled.div`
  width: ${({ w }) => `${w}px`};
  height: ${({ w }) => `${w}px`};
  border-radius: 50%;
  background-image: ${({ image }) => `url(${image})`}, url('${fallback}');
  background-position: center;
  background-size: cover;
  position: absolute;
  top: 16px;
  left: 16px;
  ${({ theme }) => theme.media.tablet} {
    width: ${({ wT }) => `${wT}px`};
    height: ${({ wT }) => `${wT}px`};
    top: 8px;
    left: 8px;
  }
`;

export const AvatarContainer = styled.div`
  margin: 10px;
  width: ${({ w }) => `calc(${w}px + 35px)`};
  height: ${({ w }) => `calc(${w}px + 35px)`};
  background: white;
  border-radius: 50%;
  box-sizing: border-box;
  position: relative;
  text-align: center;
  &:before {
    border-radius: 50%;
    content: '';
    background-image: ${({ theme: { gradients } }) =>
      gradients.rainbowHorizontal};
    width: ${({ w }) => `calc(${w}px + 40px)`};
    height: ${({ w }) => `calc(${w}px + 40px)`};
    top: -2.5px;
    left: -2.5px;
    position: absolute;
    z-index: -1;
  }

  ${({ theme }) => theme.media.tablet} {
    margin: 5px;
    width: ${({ wT }) => `calc(${wT}px + 18px)`};
    height: ${({ wT }) => `calc(${wT}px + 18px)`};
    &:before {
      width: ${({ wT }) => `calc(${wT}px + 22px)`};
      height: ${({ wT }) => `calc(${wT}px + 22px)`};
      top: -2px;
      left: -2px;
    }
  }
`;

export const LoadingAvatar = styled.div`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.gray5};
  display: flex;
  justify-content: center;
  align-items: center;
`;
