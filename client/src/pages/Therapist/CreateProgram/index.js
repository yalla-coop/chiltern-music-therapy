import { useReducer } from 'react';
import { Redirect } from 'react-router-dom';

import { navRoutes } from '../../../constants';

import reducer from './reducer';
import actionTypes from './actionTypes';
import flowTypes from './flowTypes';
// parts
import AddDescription from './AddDescription';
import AddContent from './AddContent';
import ReviewFinish from './ReviewFinish';

const initialState = {
  flow: flowTypes.description,
  description: '',
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
    // set flow
    SET_FLOW: (flow) => {
      dispatch({ type: actionTypes.setFlow, value: flow });
    },
    // set description
    SET_DESCRIPTION: (str) => {
      dispatch({ type: actionTypes.setDescription, value: str });
    },
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

  switch (state.flow) {
    case flowTypes.description:
      return (
        <AddDescription actions={actions} description={state.description} />
      );
    case flowTypes.addContent:
      return <AddContent actions={actions} state={state} />;
    case flowTypes.reviewFinish:
      return <ReviewFinish actions={actions} state={state} />;

    default:
      return <Redirect to={navRoutes.GENERAL.UNAUTHORIZED} />;
  }
};

export default CreateProgram;
