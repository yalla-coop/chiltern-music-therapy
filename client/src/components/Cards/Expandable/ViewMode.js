import * as S from './style';
import * as T from '../../Typography';

import Icon from '../../Icon';
import Tag from '../../Tag';
import Video from '../../Video';

import { linkFormatter } from '../../../helpers';

const ViewMode = ({
  content = {},
  open,
  contentRef,
  selectedHeight,
  remove,
  edit,
  children,
}) => {
  const {
    streamable,
    download,
    instructions,
    categories,
    link,
    url,
    type,
  } = content;
  if (!open) return <div ref={contentRef} height={selectedHeight} />;

  if (children) {
    return (
      <S.Content open={open} ref={contentRef} height={selectedHeight}>
        {children}
      </S.Content>
    );
  }
  return (
    <S.Content open={open} ref={contentRef} height={selectedHeight}>
      {streamable && (
        <div style={{ marginBottom: '24px', marginTop: '8px' }}>
          <Video url={url} type={type} />
        </div>
      )}
      {download && (
        <a href={download} download>
          <Icon
            icon="download"
            width="16"
            height="16"
            text={`Download ${type}`}
            mb="5"
            color="primary"
          />
        </a>
      )}
      {link && (
        <T.Link
          external
          to={linkFormatter(link)}
          weight="bold"
          color="primary"
          mb="5"
        >
          View content link
        </T.Link>
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
      {categories?.length > 0 && <Tag tags={categories} />}
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
