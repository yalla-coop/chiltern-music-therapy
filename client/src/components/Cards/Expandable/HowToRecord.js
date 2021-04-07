import { useState, useRef, useEffect } from 'react';
import * as S from './style';
import * as T from '../../Typography';
import Icon from '../../Icon';
import Basic from '../Basic';

const ExpandableHowToRecord = ({ borderColor, device }) => {
  const [open, setOpen] = useState(false);
  const [selectedHeight, setSelectedHeight] = useState(0);

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
        <Icon icon="video" mr="3" width="33" height="33" />
        <T.P weight="light" mr="1">
          On your
          <span style={{ fontWeight: 'bold' }}> {device}</span>
        </T.P>
      </S.Title>

      <Basic
        open={open}
        contentRef={contentRef}
        selectedHeight={selectedHeight}
        variant={device === 'computer' ? 'textInfoLong' : 'textInfoShort'}
      />
    </S.Wrapper>
  );
};

export default ExpandableHowToRecord;
