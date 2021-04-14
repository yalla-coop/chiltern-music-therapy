import * as S from './style';
import * as T from '../../Typography';
import Icon from '../../Icon';
import { content } from '../../../constants';

const { fileCategories } = content;

const titleData = {
  [fileCategories.video]: {
    title: 'video',
    icon: 'video',
    borderColor: 'rainbowHorizontal',
  },
  [fileCategories.document]: {
    title: 'document/message',
    icon: 'document',
    borderColor: 'darkBlue',
  },
  [fileCategories.audio]: {
    title: 'audio message',
    icon: 'audio',
    borderColor: 'PinkUnder',
  },
};

const AddContentType = ({ contentType, navFunctions }) => {
  const decidePath = (type) => navFunctions.goToAddSingleContent(type);

  return (
    <S.Wrapper
      borderColor={titleData[contentType]?.borderColor}
      onClick={() => {
        decidePath(contentType);
      }}
    >
      <S.Title>
        <Icon
          icon={titleData[contentType]?.icon}
          mr="3"
          width="33"
          height="33"
        />
        <T.P weight="light" mr="1">
          {contentType === fileCategories.audio ? 'An ' : 'A '}
          <span style={{ fontWeight: 'bold' }}>
            {titleData[contentType]?.title}
          </span>
        </T.P>
      </S.Title>
    </S.Wrapper>
  );
};

export default AddContentType;
