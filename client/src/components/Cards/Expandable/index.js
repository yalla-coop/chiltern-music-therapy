import { useState, useRef, useEffect } from 'react';
import * as S from './style';
import * as T from '../../Typography';
import Icon from '../../Icon';
import { dateFormatter, linkFormatter } from '../../../helpers';

const Expandable = ({ borderColor, content, remove, edit, withDate }) => {
  const [open, setOpen] = useState(false);
  const [selectedHeight, setSelectedHeight] = useState(0);

  const {
    fileType,
    title,
    date,
    streamable,
    download,
    instructions,
    categories,
    link,
  } = content;

  const titleData = {
    video: { action: 'Watch', title: 'video', icon: 'video' },
    document: { action: 'View', title: 'content', icon: 'document' },
    audio: { action: 'Listen to', title: 'audio', icon: 'audio' },
  };

  const contentRef = useRef(null);

  useEffect(() => {
    setSelectedHeight(contentRef.current.offsetHeight);
  }, [contentRef]);

  return (
    <S.Wrapper
      borderColor={borderColor}
      open={open}
      onClick={() => setOpen(!open)}
      height={selectedHeight}
    >
      <S.Title open={open}>
        <Icon icon={titleData[fileType]?.icon} mr="3" width="33" height="33" />

        {withDate ? (
          <S.DateTitle>
            <T.P color="gray8" caps small>
              {dateFormatter(date) || 'N/A'}
            </T.P>
            <T.P weight="bold">{title || 'N/A'}</T.P>
          </S.DateTitle>
        ) : (
          <T.P weight="light" mr="1">
            {titleData[fileType]?.action}{' '}
            <span style={{ fontWeight: 'bold' }}>
              {titleData[fileType]?.title}
            </span>
          </T.P>
        )}
      </S.Title>
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
        {link && (
          <T.Link external to={linkFormatter(link)}>
            View content link
          </T.Link>
        )}
        {instructions && (
          <>
            <T.H4 bold mb="2">
              Instructions
            </T.H4>
            <T.P color="gray8">{instructions}</T.P>
          </>
        )}
        {categories && (
          <>
            <T.H4 bold mb="2">
              Categories
            </T.H4>
            {categories.map((cat, i) => (
              <div>Tags to go here with {cat}</div>
            ))}
          </>
        )}
        {(remove || edit) && (
          <S.Actions>
            {edit && (
              <S.InvisibleBtn>
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
              <S.InvisibleBtn>
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
    </S.Wrapper>
  );
};

export default Expandable;
