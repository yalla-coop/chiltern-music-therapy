import { Grid } from '../../../../components';

import * as S from '../style';
import AddSingleContent from './AddSingleContent';

const { Col } = Grid;

const AddContent = ({ state, actions }) => {
  const {
    singleContent: { showModal },
  } = state;

  return (
    <S.Wrapper>
      <h1 style={{ marginTop: '3rem' }}>Add Content</h1>
      {!showModal && (
        <>
          <Col w={[4, 4, 4]}>
            <button
              onClick={() => {
                actions.HANDLE_SINGLE_CONTENT_MODAL();
                actions.HANDLE_CONTENT_TYPE('video');
              }}
            >
              Add Video
            </button>
          </Col>
          <Col w={[4, 4, 4]}>
            <button
              onClick={() => {
                actions.HANDLE_SINGLE_CONTENT_MODAL();
                actions.HANDLE_CONTENT_TYPE('application');
              }}
            >
              Add Doc
            </button>
          </Col>
          <Col w={[4, 4, 4]}>
            <button
              onClick={() => {
                actions.HANDLE_SINGLE_CONTENT_MODAL();
                actions.HANDLE_CONTENT_TYPE('audio');
              }}
            >
              Add Audio
            </button>
          </Col>
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
        ))}
    </S.Wrapper>
  );
};

export default AddContent;
