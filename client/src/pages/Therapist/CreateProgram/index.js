import { useReducer, useEffect } from 'react';

import { Switch, useHistory, useParams } from 'react-router-dom';

import { navRoutes } from '../../../constants';

import reducer from './reducer';
import actionTypes from './actionTypes';

import { AddSingleContent, HowToRecord } from '../../../components/Content';

// parts
import AddDescription from './AddDescription';
import AddContent from './AddContent';
import ReviewFinish from './ReviewFinish';
import Success from './Success';
import flowTypes from './flowTypes';

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
  const { id: clientId } = useParams();

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
    history.push(
      `${navRoutes.THERAPIST.CREATE_PROGRAMME.replace(':id', clientId)}/${flow}`
    );

  const decidePathSingle = (flow, type) =>
    history.push({
      pathname: `${navRoutes.THERAPIST.CREATE_PROGRAMME.replace(
        ':id',
        clientId
      )}/${flow}`.replace(':category', type),
      state: { category: type },
    });

  const navFunctions = {
    goToDescription: () => decidePath(flowTypes.description),
    goToAddContent: () => decidePath(flowTypes.addContent),
    goToAddSingleContent: (type) =>
      decidePathSingle(flowTypes.addSingleContent, type),
    goToReview: () => decidePath(flowTypes.reviewFinish),
    goToHowToRecord: () => decidePath(flowTypes.howToRecord),
    goToSuccess: () => decidePath(flowTypes.success),
  };

  useEffect(() => {
    navFunctions.goToDescription();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Switch>
      <AddDescription
        exact
        path={navRoutes.THERAPIST.CREATE_PROGRAMME_DESCRIPTION}
        actions={actions}
        state={state}
        navFunctions={navFunctions}
        clientId={clientId}
      />
      <AddContent
        exact
        path={navRoutes.THERAPIST.CREATE_PROGRAMME_CONTENT}
        actions={actions}
        state={state}
        navFunctions={navFunctions}
      />
      <HowToRecord
        exact
        path={navRoutes.THERAPIST.CREATE_PROGRAMME_CONTENT_HOW_TO_RECORD}
      />
      <AddSingleContent
        exact
        path={navRoutes.THERAPIST.CREATE_PROGRAMME_CONTENT_SINGLE}
        actions={actions}
        state={state}
        navFunctions={navFunctions}
      />
      <ReviewFinish
        exact
        path={navRoutes.THERAPIST.CREATE_PROGRAMME_REVIEW}
        actions={actions}
        state={state}
        navFunctions={navFunctions}
        clientId={clientId}
      />
      <Success
        exact
        path={navRoutes.THERAPIST.CREATE_PROGRAMME_SUCCESS}
        actions={actions}
        state={state}
      />
    </Switch>
  );
};

export default CreateProgram;
