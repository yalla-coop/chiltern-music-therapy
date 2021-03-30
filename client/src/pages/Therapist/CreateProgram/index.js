import { useReducer } from 'react';

import { Grid } from '../../../components/';

import reducer from './reducer';
import actionTypes from './actionTypes';
import * as S from './style';
import AddSingleContent from './AddSingleContent';

const { Col } = Grid;

const initialState = {
  content: [],
  singleContent: {
    // TODO add more inputs
    title: '',
  },
  contentType: null,
  fileUpload: {
    fileUploading: false,
    data: {
      id: null,
      name: '',
      key: '',
      bucketRegion: '',
      bucket: '',
      fileType: '',
      new: false,
      uploadedToS3: false,
    },
    error: null,
  },
  showModal: false,
};

const CreateProgram = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { showModal } = state;

  // set state functions
  const dispatchFunctions = {
    handleShowModal: () => {
      dispatch({ type: actionTypes.showModal });
    },
    handleContentType: (contentType) => {
      dispatch({ type: actionTypes.setContentType, value: contentType });
    },
    updateContent: (formData) => {
      dispatch({ type: actionTypes.updateContent, value: formData });
    },
    updateSingleContent: (_key, _value) => {
      dispatch({
        type: actionTypes.updateSingleContent,
        key: _key,
        value: _value,
      });
    },
    resetSingleContent: () => {
      dispatch({ type: actionTypes.resetSingleContent, value: initialState });
    },
    handleFileUploadStatus: (bool) => {
      dispatch({ type: actionTypes.updateFileUploadStatus, value: bool });
    },
    handleFileUploadInfo: (data) => {
      dispatch({ type: actionTypes.updateFileUploadInfo, value: data });
    },
    handleFileUploadError: (error) => {
      console.log(`error`, error);
      dispatch({ type: actionTypes.setFileUploadError, value: error });
    },
  };

  return (
    <S.Wrapper>
      <h1 style={{ marginTop: '3rem' }}>Add Content</h1>
      {!showModal && (
        <>
          <Col w={[4, 4, 4]}>
            <button
              onClick={() => {
                dispatchFunctions.handleShowModal();
                dispatchFunctions.handleContentType('video');
              }}
            >
              Add Video
            </button>
          </Col>
          <Col w={[4, 4, 4]}>
            <button
              onClick={() => {
                dispatchFunctions.handleShowModal();
                dispatchFunctions.handleContentType('application');
              }}
            >
              Add Doc
            </button>
          </Col>
          <Col w={[4, 4, 4]}>
            <button
              onClick={() => {
                dispatchFunctions.handleShowModal();
                dispatchFunctions.handleContentType('audio');
              }}
            >
              Add Audio
            </button>
          </Col>
        </>
      )}

      {showModal && (
        <AddSingleContent state={state} dispatchFunctions={dispatchFunctions} />
      )}
      {state.content.length > 0 &&
        state.content.map((el) => (
          <ul>
            <li>
              type: {state.contentType}, title: {el.title}, file:{' '}
              {el.uploadedFileInfo.name}
            </li>
          </ul>
        ))}
    </S.Wrapper>
  );
};

export default CreateProgram;
