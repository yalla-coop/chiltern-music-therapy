import styled from '@emotion/styled';

export const AvatarImage = styled.div`
  width: 320px;
  height: 320px;
  border-radius: 50%;
  background-image: ${({ image }) => `url(${image})`};
  background-position: center;
  background-size: cover;
  position: absolute;
  top: 16px;
  left: 16px;
  ${({ theme }) => theme.media.tablet} {
    width: 180px;
    height: 180px;
    top: 8px;
    left: 8px;
  }
`;

export const AvatarContainer = styled.div`
  margin: 10px;
  width: 355px;
  height: 355px;
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
    width: 360px;
    height: 360px;
    top: -2.5px;
    left: -2.5px;
    position: absolute;
    z-index: -1;
  }

  ${({ theme }) => theme.media.tablet} {
    margin: 5px;
    width: 198px;
    height: 198px;
    &:before {
      width: 202px;
      height: 202px;
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
