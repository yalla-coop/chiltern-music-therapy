import { useReducer } from 'react';

import { Switch, useHistory } from 'react-router-dom';

import { navRoutes } from '../../../constants';

import reducer from './reducer';
import actionTypes from './actionTypes';
import flowTypes from './flowTypes';

import { AddSingleContent } from '../../../components/Content';

// parts
import AddDescription from './AddDescription';
import AddContent from './AddContent';
import ReviewFinish from './ReviewFinish';

const initialState = {
  description: '',
  // total content
  content: [],
  // single item
  singleContent: {
    type: null,
    title: '',
    categories: [],
    link: '',
    docContent: '',
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
  const history = useHistory();

  const actions = {
    // set description
    SET_DESCRIPTION: (str) => {
      dispatch({ type: actionTypes.setDescription, value: str });
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

  const decidePath = (flow) =>
    history.push(`${navRoutes.THERAPIST.CREATE_PROGRAM}/${flow}`);

  return (
    <Switch>
      <AddDescription
        exact
        path={navRoutes.THERAPIST.CREATE_PROGRAM_DESCRIPTION}
        actions={actions}
        description={state.description}
        decidePath={decidePath}
      />
      <AddContent
        exact
        path={navRoutes.THERAPIST.CREATE_PROGRAM_CONTENT}
        actions={actions}
        state={state}
        decidePath={decidePath}
      />
      <AddSingleContent
        exact
        path={navRoutes.THERAPIST.CREATE_PROGRAM_CONTENT_SINGLE}
        actions={actions}
        state={state}
      />
      <ReviewFinish
        exact
        path={navRoutes.THERAPIST.CREATE_PROGRAM_REVIEW}
        actions={actions}
        state={state}
        decidePath={decidePath}
      />
    </Switch>
  );
};

export default CreateProgram;
