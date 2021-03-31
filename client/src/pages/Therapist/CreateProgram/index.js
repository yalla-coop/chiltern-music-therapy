import { useReducer } from 'react';

import reducer from './reducer';
import actionTypes from './actionTypes';
import AddContent from './AddContent';

const initialState = {
  // total content
  content: [],
  // single item
  singleContent: {
    // TODO add more inputs
    title: '',
    type: null,
    showModal: false,
  },
  // file upload
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
};

const CreateProgram = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions = {
    // single content
    HANDLE_SINGLE_CONTENT_MODAL: () => {
      dispatch({ type: actionTypes.showModal });
    },
    HANDLE_CONTENT_TYPE: (contentType) => {
      dispatch({ type: actionTypes.setContentType, value: contentType });
    },
    UPDATE_SINGLE_CONTENT: (_key, _value) => {
      dispatch({
        type: actionTypes.updateSingleContent,
        key: _key,
        value: _value,
      });
    },
    RESET_SINGLE_CONTENT: () => {
      dispatch({ type: actionTypes.resetSingleContent, value: initialState });
    },
    // file upload
    HANDLE_UPLOAD_STATUS: (bool) => {
      dispatch({ type: actionTypes.updateFileUploadStatus, value: bool });
    },
    HANDLE_FILE_UPLOAD_INFO: (data) => {
      dispatch({ type: actionTypes.updateFileUploadInfo, value: data });
    },
    HANDLE_FILE_UPLOAD_ERROR: (error) => {
      dispatch({ type: actionTypes.setFileUploadError, value: error });
    },
    // content overall
    UPDATE_CONTENT: (formData) => {
      dispatch({ type: actionTypes.updateContent, value: formData });
    },
  };

  return (
    <>
      <h1 style={{ marginTop: '3rem' }}>Create Program</h1>
      <AddContent state={state} actions={actions} />
    </>
  );
};

export default CreateProgram;
