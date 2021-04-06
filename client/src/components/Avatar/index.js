import * as S from './style';
import Icon from '../Icon';

const Avatar = ({ status = 'loading', image }) => {
  if (status === 'ready' && image) {
    return (
      <S.AvatarContainer>
        <S.AvatarImage image={image} alt="avatar" />
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
