import * as T from '../../Typography';
import * as S from './style';
import Icon from '../../Icon';

const Info = ({
  error,
  value,
  handleChange,
  m, // margins
  allowClear,
  goals,
  title,
  body,
  ...props
}) => {
  return (
    <S.CardWrapper {...m}>
      <S.IconWrapper>
        <Icon icon="info" width="24" height="24" />
      </S.IconWrapper>
      <S.Content>
        {title && (
          <T.P bold color="gray9" mb="0">
            {title}
          </T.P>
        )}
        {body && typeof body === 'string' ? (
          <T.P mb="0" color="gray9">
            {body}
          </T.P>
        ) : (
          body
        )}
      </S.Content>
    </S.CardWrapper>
  );
};

export default Info;
