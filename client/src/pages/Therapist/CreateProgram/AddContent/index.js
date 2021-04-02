import {
  GoBack,
  Typography as T,
  Button,
  Grid,
  Content,
} from '../../../../components';

import * as S from '../style';
import flowTypes from '../flowTypes';

import AddSingleContent from './AddSingleContent';

const { Row, Col } = Grid;
const { AddContentSection } = Content;

const AddContent = ({ state, actions }) => {
  const {
    singleContent: { showModal },
  } = state;

  const goNext = () => {
    return actions.SET_FLOW(flowTypes.reviewFinish);
  };

  const goBack = () => {
    return actions.SET_FLOW(flowTypes.description);
  };

  return (
    <>
      <GoBack customFn={goBack} />
      <Row mT={5}>
        <Col w={[4, 12, 12]}>
          <T.H1 color="gray10">
            <strong>Add</strong> New Programme
          </T.H1>
        </Col>
      </Row>
      <Row mT={5}>
        <Col w={[4, 12, 12]}>
          <AddContentSection />
        </Col>
      </Row>

      <Row mT={5}>
        <Col w={[4, 4, 4]}>
          <Button variant="primary" text="Next" handleClick={goNext} />
        </Col>
      </Row>
      {/*
      {!showModal && (
        <>
          <button
            onClick={() => {
              actions.HANDLE_SINGLE_CONTENT_MODAL();
              actions.HANDLE_CONTENT_TYPE('video');
            }}
          >
            Add Video
          </button>

          <button
            onClick={() => {
              actions.HANDLE_SINGLE_CONTENT_MODAL();
              actions.HANDLE_CONTENT_TYPE('application');
            }}
          >
            Add Doc
          </button>

          <button
            onClick={() => {
              actions.HANDLE_SINGLE_CONTENT_MODAL();
              actions.HANDLE_CONTENT_TYPE('audio');
            }}
          >
            Add Audio
          </button>
        </>
      )}

      {showModal && <AddSingleContent state={state} actions={actions} />}
      {state.content.length > 0 &&
        state.content.map((el) => (
          <ul>
            <li>
              type: {state.singleContent.contentType}, title: {el.title}, file:{' '}
              {el.uploadedFileInfo.name}
            </li>
          </ul>
        ))} */}
    </>
  );
};

export default AddContent;
