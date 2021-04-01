import * as S from './style';
import { P } from '../Typography';
const Tag = ({ tag, tags, ...props }) => {
  if (tags && tags.length > 0) {
    return (
      <S.Container {...props}>
        {tags.map((tag, index) => (
          <S.Wrapper key={tag + index}>
            <S.Div>
              <P color="gray8">{tag}</P>
            </S.Div>
          </S.Wrapper>
        ))}
      </S.Container>
    );
  }

  return (
    <S.Wrapper {...props}>
      <S.Div>
        <P color="gray8">{tag || props.children}</P>
      </S.Div>
    </S.Wrapper>
  );
};

export default Tag;
