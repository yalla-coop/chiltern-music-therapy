import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useState, useRef, useEffect } from 'react';
import * as S from './style';
import * as T from '../../Typography';
import Icon from '../../Icon';

const Expandable = ({ borderColor }) => {
  const [open, setOpen] = useState(false);
  const [selectedHeight, setSelectedHeight] = useState(0);

  const toggleModal = () => {
    if (!open) return setOpen(true);
  };

  const closedText = () => <S.Title open={open}>Closed</S.Title>;

  const openText = () => (
    <div>
      <T.P bold>Instructions</T.P>
      <T.P>Lots of stuff and lots of stuff</T.P>
      <T.P>Lots of stuff and lots of stuff</T.P>
      <T.P>Lots of stuff and lots of stuff</T.P>
      <T.P>Lots of stuff and lots of stuff</T.P>
      <T.P>Lots of stuff and lots of stuff</T.P>
      <T.P>Lots of stuff and lots of stuff</T.P>
      <T.P>Lots of stuff and lots of stuff</T.P>
      <T.P>Lots of stuff and lots of stuff</T.P>
      <T.P>Lots of stuff and lots of stuff</T.P>
    </div>
  );

  const contentRef = useRef(null);

  useEffect(() => {
    setSelectedHeight(contentRef.current.offsetHeight);
    console.log('sel', contentRef);
  }, [contentRef]);

  console.log('SEC', selectedHeight);
  return (
    <S.Wrapper
      borderColor={borderColor}
      open={open}
      onClick={() => setOpen(!open)}
      height={selectedHeight}
    >
      <S.Title open={open}>Closed</S.Title>
      <S.Content open={open} ref={contentRef} height={selectedHeight}>
        <div>
          <T.P bold>Instructions</T.P>
          <T.P>Lots of stuff and lots of stuff</T.P>
          <T.P>Lots of stuff and lots of stuff</T.P>
          <T.P>Lots of stuff and lots of stuff</T.P>
          <T.P>Lots of stuff and lots of stuff</T.P>
          <T.P>Lots of stuff and lots of stuff</T.P>
          <T.P>Lots of stuff and lots of stuff</T.P>
          <T.P>Lots of stuff and lots of stuff</T.P>
          <T.P>Lots of stuff and lots of stuff</T.P>
          <T.P>Lots of stuff and lots of stuff</T.P>
        </div>
      </S.Content>
    </S.Wrapper>
  );
};

export default Expandable;
