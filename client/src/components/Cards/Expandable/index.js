import { useState, useRef, useEffect } from 'react';
import ReactGA from 'react-ga';
import * as S from './style';
import Icon from '../../Icon';

import ExpandableTitle from './ExpandableTitle';

import ViewMode from './ViewMode';
import EditMode from './EditMode';
import { useExpandable } from '../../../context/expandable';

const Expandable = ({
  borderColor,
  content = {},
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
  send,
  children,
  index = 0,
}) => {
  const [selectedHeight, setSelectedHeight] = useState(0);
  const { setOpenItem, state: openItems, closeAll } = useExpandable();
  const { validationErrs = {} } = content;
  const open = openItems[index - 1];
  const setOpen = () => {
    setOpenItem(index);

    if (process.env.NODE_ENV === 'production' && !editing) {
      ReactGA.event({
        category: 'Viewing content',
        action: 'Clicked to open content card',
      });
    }
  };

  const hasErrors =
    typeof validationErrs === 'object' &&
    Object.keys(validationErrs).length > 0;

  const contentRef = useRef(null);

  useEffect(() => {
    setSelectedHeight(contentRef.current.offsetHeight);
  }, [contentRef]);

  if (children) {
    return (
      <S.Wrapper
        borderColor={borderColor}
        open={open}
        onClick={() => {
          return !open && setOpen(true);
        }}
        height={selectedHeight}
        ref={contentRef}
        error={hasErrors}
      >
        {open && (
          <S.CrossBtn onClick={() => setOpen(false)}>
            <Icon icon="cross" width="16" height="16" color="gray8" />
          </S.CrossBtn>
        )}
        <ExpandableTitle
          open={open}
          review={review}
          withDate={withDate}
          content={content}
          send={send}
        />
        <ViewMode
          open={open}
          contentRef={contentRef}
          selectedHeight={selectedHeight}
        >
          {children}
        </ViewMode>
      </S.Wrapper>
    );
  }
  return (
    <S.Wrapper
      borderColor={borderColor}
      open={open}
      onClick={() => !open && setOpen(true)}
      height={selectedHeight}
      ref={contentRef}
      error={hasErrors}
    >
      {open && (
        <S.CrossBtn onClick={() => closeAll()}>
          <Icon icon="cross" width="16" height="16" color="gray8" />
        </S.CrossBtn>
      )}
      <ExpandableTitle
        open={open}
        review={review}
        withDate={withDate}
        content={content}
        send={send}
      />

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
