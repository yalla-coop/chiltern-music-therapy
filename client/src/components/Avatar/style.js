import styled from '@emotion/styled';

export const AvatarImage = styled.div`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background-image: ${({ image }) => `url(${image})`};
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

export const LoadingAvatar = styled.div`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background: #ccc;
  background: ${({ theme }) => theme.colors.gray5};
  display: flex;
  justify-content: center;
  align-items: center;
`;
