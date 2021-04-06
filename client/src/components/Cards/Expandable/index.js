import { useState, useRef, useEffect } from 'react';
import * as S from './style';
import * as T from '../../Typography';
import Icon from '../../Icon';
import { dateFormatter } from '../../../helpers';

import ViewMode from './ViewMode';
import EditMode from './EditMode';

const Expandable = ({
  borderColor,
  content,
  remove,
  edit,
  withDate,
  editing,
  library,
  handleInput,
  saveChanges,
  errors,
  categoryOptions,
  onCancel,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedHeight, setSelectedHeight] = useState(0);

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
      onClick={() => (editing ? setOpen(true) : setOpen(!open))}
      height={selectedHeight}
    >
      <S.Title open={open}>
        <Icon
          icon={titleData[content.fileType]?.icon}
          mr="3"
          width="33"
          height="33"
        />

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
          </T.P>
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
