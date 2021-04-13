import { dateFormatter } from '../../../helpers';
import * as S from './style';
import Icon from '../../Icon';
import * as T from '../../Typography';

const TitleContent = ({ dark, review, send }) => {
  const light = review ? 'Review' : 'Send';
  let _dark = dark;
  if (dark === 'content') {
    _dark = '';
  }
  return (
    <T.P weight="light" mr="1">
      {light}
      <S.BoldSpan>
        {' '}
        {_dark} {send && ' message'}
      </S.BoldSpan>
    </T.P>
  );
};

const ExTitle = ({ open, review, withDate, content, send }) => {
  const titleData = {
    video: { action: 'Watch', title: 'video', icon: 'video' },
    document: { action: 'View', title: 'content', icon: 'document' },
    audio: { action: 'Listen to', title: 'audio', icon: 'audio' },
  };
  const { type } = content;

  return (
    <S.Title open={open}>
      <Icon icon={titleData[type]?.icon} mr="3" width="33" height="33" />

      {review || send ? (
        <TitleContent
          review={review}
          send={send}
          dark={titleData[type].title}
        />
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
              <S.BoldSpan>{titleData[content.fileType]?.title}</S.BoldSpan>
              {titleData[type]?.action}{' '}
              <S.BoldSpan>{titleData[type]?.title}</S.BoldSpan>
            </T.P>
          )}
        </>
      )}
    </S.Title>
  );
};

export default ExTitle;
