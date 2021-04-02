import * as S from './style';
import * as T from '../../Typography';

import Icon from '../../Icon';

const ViewMode = ({
  content,
  open,
  contentRef,
  selectedHeight,
  remove,
  edit,
}) => {
  const { streamable, download, instructions, categories } = content;

  return (
    <S.Content open={open} ref={contentRef} height={selectedHeight}>
      {streamable && (
        <div style={{ marginBottom: '24px' }}>VIDEO/AUDIO HERE</div>
      )}
      {download && (
        <a href={download} download>
          <Icon
            icon="download"
            width="16"
            height="16"
            text="Download file"
            mb="5"
            color="primary"
          />
        </a>
      )}
      {instructions && (
        <>
          <T.H4 weight="bold" mb="2">
            Instructions
          </T.H4>
          <T.P color="gray8" mb="5">
            {instructions}
          </T.P>
        </>
      )}
      {categories && (
        <>
          <T.H4 weight="bold" mb="2">
            Categories
          </T.H4>
          {categories.map((cat, i) => (
            <div key={i}>Tags to go here with {cat}</div>
          ))}
        </>
      )}
      {(remove || edit) && (
        <S.Actions>
          {edit && (
            <S.InvisibleBtn onClick={edit}>
              <Icon
                icon="edit"
                width="16"
                height="16"
                text="Edit"
                color="primary"
              />
            </S.InvisibleBtn>
          )}
          {remove && (
            <S.InvisibleBtn onClick={remove}>
              <Icon
                icon="bin"
                width="16"
                height="16"
                text="Remove"
                color="secondary"
              />
            </S.InvisibleBtn>
          )}
        </S.Actions>
      )}
    </S.Content>
  );
};

export default ViewMode;
