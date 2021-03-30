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

  // set state functions
  const dispatchFunctions = {
    // single content
    handleShowModal: () => {
      dispatch({ type: actionTypes.showModal });
    },
    handleContentType: (contentType) => {
      dispatch({ type: actionTypes.setContentType, value: contentType });
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
      dispatch({ type: actionTypes.setFileUploadError, value: error });
    },
    // content
    updateContent: (formData) => {
      dispatch({ type: actionTypes.updateContent, value: formData });
    },
  };

  return (
    <>
      <h1 style={{ marginTop: '3rem' }}>Create Program</h1>
      <AddContent state={state} actions={dispatchFunctions} />
    </>
  );
};

export default CreateProgram;
