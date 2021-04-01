import { GoBack, Typography as T, Button, Grid } from '../../../../components';

import * as S from '../style';
import flowTypes from '../flowTypes';

import AddSingleContent from './AddSingleContent';

const { Col } = Grid;

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
      <Col w={[4, 12, 12]}>
        <S.HeadlineWrapper>
          <T.H1 color="gray10">
            <strong>Add</strong> New Programme (Content)
          </T.H1>
        </S.HeadlineWrapper>
      </Col>
      <Col w={[4, 4, 4]}>
        <Button variant="primary" text="Next" handleClick={goNext} />
      </Col>
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
