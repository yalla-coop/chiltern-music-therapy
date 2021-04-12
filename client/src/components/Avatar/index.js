import * as S from './style';
import Icon from '../Icon';

const Avatar = ({ status = 'loading', image, w = 320, wT = 180 }) => {
  if (status === 'ready' && image) {
    return (
      <S.AvatarContainer w={w} wT={wT}>
        <S.AvatarImage image={image} alt="avatar" w={w} wT={wT} />
      </S.AvatarContainer>
    );
  }
  return (
    <S.LoadingAvatar>
      <Icon icon="user" color="white" />
    </S.LoadingAvatar>
  );
};

export default Avatar;
