import { useReducer } from 'react';
import { Switch, useHistory } from 'react-router-dom';

import { navRoutes } from '../../../constants';

import reducer from './reducer';
import actionTypes from './actionTypes';

import { AddSingleContent, HowToRecord } from '../../../components/Content';

// parts
import AddDescription from './AddDescription';
import AddContent from './AddContent';
import ReviewFinish from './ReviewFinish';
import Success from './Success';

const initialState = {
  description: '',
  // total content
  content: [],
  // single item
  singleContent: {
    id: null,
    type: null,
    title: '',
    categories: [],
    link: '',
    docContent: '',
    libraryContent: false,
    instructions: '',
    validationErrs: {},
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
    // form submission
    validationErrs: {},
    loading: false,
  },
};

const CreateProgram = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const history = useHistory();

  const actions = {
    SET_ERRORS: (errors) => {
      dispatch({ type: actionTypes.setErrors, value: errors });
    },
    SET_LOADING: (bool) => {
      dispatch({ type: actionTypes.setLoading, value: bool });
    },
    // set description
    SET_DESCRIPTION: (str) => {
      dispatch({ type: actionTypes.setDescription, value: str });
    },
    ADD_SINGLE_CONTENT: (_key, _value) => {
      dispatch({
        type: actionTypes.addSingleContent,
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
    ADD_CONTENT: (formData) => {
      dispatch({ type: actionTypes.addContent, value: formData });
    },
    UPDATE_CONTENT: (formData) => {
      dispatch({ type: actionTypes.updateContent, value: formData });
    },
    UPDATE_CONTENT_ITEM: (data) => {
      dispatch({ type: actionTypes.updateContentItem, value: data });
    },
    REMOVE_CONTENT_ITEM: (data) => {
      dispatch({ type: actionTypes.deleteContentItem, value: data });
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
        state={state}
        decidePath={decidePath}
      />
      <AddContent
        exact
        path={navRoutes.THERAPIST.CREATE_PROGRAM_CONTENT}
        actions={actions}
        state={state}
        decidePath={decidePath}
      />
      <HowToRecord
        exact
        path={navRoutes.THERAPIST.CREATE_PROGRAM_CONTENT_HOW_TO_RECORD}
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
      <Success
        exact
        path={navRoutes.THERAPIST.CREATE_PROGRAM_SUCCESS}
        actions={actions}
        state={state}
        decidePath={decidePath}
      />
    </Switch>
  );
};

export default CreateProgram;
