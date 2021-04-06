import {
  GoBack,
  Typography as T,
  Button,
  Grid,
  Content,
} from '../../../components';

import * as S from './style';
import flowTypes from './flowTypes';

const { Row, Col } = Grid;
const { AddContentSection } = Content;

const AddContent = ({ state, actions, decidePath }) => {
  const { ADD_CONTENT } = actions;
  const { content } = state;

  const goNext = () => decidePath(flowTypes.reviewFinish);
  const goBack = () => decidePath(flowTypes.description);

  const testLibraryContent = [
    {
      id: 1,
      type: 'video',
      title: 'test video 1',
      categories: ['test', 'this'],
      link: 'www.youtube.com/test',
      libraryContent: true,
      instructions: 'this is a test',
    },
  ];

  return (
    <S.Wrapper>
      <GoBack customFn={goBack} />
      <Row mt={6}>
        <Col w={[4, 12, 9]}>
          <T.H1 color="gray10">
            <strong>Add</strong> New Programme
          </T.H1>
        </Col>
        <Col w={[4, 9, 7]} mt={5}>
          <T.P color="gray8">
            Great! Now it’s time to share content. Add as many videos, audio
            files, links and written content as you like!
          </T.P>
        </Col>
      </Row>
      <Row mt={5}>
        <AddContentSection
          content={content}
          // TODO add library content
          libraryContent={testLibraryContent}
          setLibraryContent={ADD_CONTENT}
        />
      </Row>

      <Row mt={7}>
        <Col w={[4, 9, 4]}>
          {/* TODO add check to render if content */}
          <Button
            variant="secondary"
            text="Review and finish"
            handleClick={goNext}
          />
        </Col>
      </Row>
      {/*
      {state.content.length > 0 &&
        state.content.map((el) => (
          <ul>
            <li>
              type: {state.singleContent.contentType}, title: {el.title}, file:{' '}
              {el.uploadedFileInfo.name}
            </li>
          </ul>
        ))} */}
    </S.Wrapper>
  );
};

export default AddContent;
