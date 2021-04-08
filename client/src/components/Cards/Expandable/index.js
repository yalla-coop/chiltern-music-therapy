import { useState, useRef, useEffect } from 'react';
import * as S from './style';
import * as T from '../../Typography';
import Icon from '../../Icon';
import { dateFormatter, linkFormatter } from '../../../helpers';

import ViewMode from './ViewMode';
import EditMode from './EditMode';

const Expandable = ({
  borderColor,
  content,
  remove,
  edit,
  withDate,
  editing,
  review,
  library,
  handleInput,
  saveChanges,
  errors,
  categoryOptions,
  onCancel,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedHeight, setSelectedHeight] = useState(0);

  const { type } = content;

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
      onClick={() => !open && setOpen(true)}
      height={selectedHeight}
      ref={contentRef}
    >
      {open && (
        <S.CrossBtn onClick={() => setOpen(false)}>
          <Icon icon="cross" width="16" height="16" color="gray8" />
        </S.CrossBtn>
      )}

      <S.Title open={open}>
        <Icon icon={titleData[type]?.icon} mr="3" width="33" height="33" />

        {review ? (
          <T.P weight="light" mr="1">
            Review
            <span style={{ fontWeight: 'bold' }}> {titleData[type].title}</span>
          </T.P>
        ) : (
          <>
            {withDate ? (
              <S.DateTitle>
                <T.P color="gray8" caps small>
                  {dateFormatter(content.date) || 'N/A'}
                </T.P>
                <T.P weight="bold">{content.title || 'N/A'}</T.P>
              </S.DateTitle>
            ) : (
              <T.P weight="light" mr="1">
                {titleData[content.fileType]?.action}{' '}
                <span style={{ fontWeight: 'bold' }}>
                  {titleData[content.fileType]?.title}
                </span>
                {titleData[type]?.action}{' '}
                <span style={{ fontWeight: 'bold' }}>
                  {titleData[type]?.title}
                </span>
              </T.P>
            )}
          </>
        )}
      </S.Title>
      {editing ? (
        <EditMode
          content={content}
          open={open}
          contentRef={contentRef}
          selectedHeight={selectedHeight}
          remove={remove}
          library={library}
          handleInput={handleInput}
          saveChanges={saveChanges}
          errors={errors}
          categoryOptions={categoryOptions}
          onCancel={onCancel}
        />
      ) : (
        <ViewMode
          content={content}
          open={open}
          contentRef={contentRef}
          selectedHeight={selectedHeight}
          remove={remove}
          edit={edit}
        />
      )}
    </S.Wrapper>
  );
};

export default Expandable;
