import { useReducer } from 'react';

import { Grid } from '../../../components/';

import reducer from './reducer';
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
  const handleShowModal = () => {
    dispatch({ type: 'showModal' });
  };

  const handleContentType = (contentType) => {
    dispatch({ type: 'setContentType', value: contentType });
  };

  const updateContent = (formData) => {
    dispatch({ type: 'updateContent', value: formData });
  };

  const updateSingleContent = (_key, _value) => {
    dispatch({ type: 'updateSingleContent', key: _key, value: _value });
  };

  const handleFileUploadStatus = (bool) => {
    dispatch({ type: 'updateFileUploadStatus', value: bool });
  };

  const handleFileUploadInfo = (data) => {
    dispatch({ type: 'updateFileUploadInfo', value: data });
  };

  const handleFileUploadError = (error) => {
    dispatch({ type: 'updateFileUploadError', value: error });
  };

  return (
    <S.Wrapper>
      <h1 style={{ marginTop: '3rem' }}>Add Content</h1>
      {!showModal && (
        <>
          <Col w={[4, 4, 4]}>
            <button
              onClick={() => {
                handleShowModal();
                handleContentType('video');
              }}
            >
              Add Video
            </button>
          </Col>
          <Col w={[4, 4, 4]}>
            <button
              onClick={() => {
                handleShowModal();
                handleContentType('application');
              }}
            >
              Add Doc
            </button>
          </Col>
          <Col w={[4, 4, 4]}>
            <button
              onClick={() => {
                handleShowModal();
                handleContentType('audio');
              }}
            >
              Add Audio
            </button>
          </Col>
        </>
      )}

      {showModal && (
        <AddSingleContent
          state={state}
          // update functions
          updateContent={updateContent}
          updateSingleContent={updateSingleContent}
          setFileUploading={handleFileUploadStatus}
          setShowModal={handleShowModal}
          setUploadedFileInfo={handleFileUploadInfo}
          setFileUploadError={handleFileUploadError}
        />
      )}
      {state.content.length > 0 &&
        state.content.map((el) => (
          <ul>
            <li>
              type: {state.contentType}, title: {el.title}, file:
            </li>
          </ul>
        ))}
    </S.Wrapper>
  );
};

export default CreateProgram;
