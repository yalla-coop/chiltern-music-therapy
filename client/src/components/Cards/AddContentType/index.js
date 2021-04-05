import { useHistory } from 'react-router-dom';
import * as S from './style';
import * as T from '../../Typography';
import Icon from '../../Icon';
import { content, navRoutes } from '../../../constants';

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

const AddContentType = ({ mode = 'create', contentType }) => {
  const history = useHistory();

  // mode can be create / edit program

  const decidePath = (type) =>
    mode === 'create'
      ? history.push({
          pathname: navRoutes.THERAPIST.CREATE_PROGRAM_CONTENT_SINGLE.replace(
            ':category',
            type
          ),
          state: { category: type },
        })
      : history.push(
          navRoutes.THERAPIST.EDIT_PROGRAM_CONTENT_SINGLE.replace(
            ':category',
            type
          )
        );

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
