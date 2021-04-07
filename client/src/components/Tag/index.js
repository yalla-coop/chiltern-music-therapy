import * as S from './style';
import { P } from '../Typography';
const Tag = ({ tag, tags, ...props }) => {
  console.log('tags', tags);
  if (tags && tags.length > 0) {
    return (
      <S.Container {...props}>
        {tags.map((tag, index) => (
          <S.Wrapper key={tag + index}>
            <S.Div>
              <S.InnerDiv>
                <P color="gray8">{tag}</P>
              </S.InnerDiv>
            </S.Div>
          </S.Wrapper>
        ))}
      </S.Container>
    );
  }

  return (
    <S.Wrapper {...props}>
      <S.Div>
        <S.InnerDiv>
          <P color="gray8">{tag || props.children}</P>
        </S.InnerDiv>
      </S.Div>
    </S.Wrapper>
  );
};

export default Tag;
