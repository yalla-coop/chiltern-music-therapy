import * as S from './style';
import { Avatar as AntAvatar } from 'antd';
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
    <AntAvatar
      size={180}
      icon={<Icon icon="user" style={{ height: '100%' }} />}
    />
  );
};

export default Avatar;
