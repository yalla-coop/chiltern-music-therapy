import { useReducer, useEffect } from 'react';

import { Switch, useHistory, useParams, useLocation } from 'react-router-dom';

import { navRoutes } from '../../../constants';

import reducer from './reducer';
import actionTypes from './actionTypes';

import { AddSingleContent } from '../../../components/Content';

// parts
import AddDescription from './AddDescription';
import AddContent from './AddContent';
import ReviewFinish from './ReviewFinish';
import Success from './Success';
import flowTypes from './flowTypes';

import { Contents } from '../../../api-calls';

import { createUniqueCats } from '../../../helpers';

import { useAuth } from '../../../context/auth';

const initialState = {
  description: '',
  clientDetails: {},
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
      size: 0,
      new: false,
      uploadedToS3: false,
    },
  },
  // form submission
  errors: {},
  loading: false,
  // libraryContent
  libraryContent: {
    data: [],
    loading: false,
    error: null,
  },
  // conent categories
  contentCategories: {
    data: [],
    loading: false,
    error: null,
  },
};

const CreateProgram = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const history = useHistory();
  const location = useLocation();

  const { id: clientId } = useParams();
  const { user } = useAuth();

  const actions = {
    SET_CLIENT_DETAILS: (details) => {
      dispatch({ type: actionTypes.setClientDetails, value: details });
    },
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
    // Library content
    GET_LIBRARY_CONTENT_SUCCESS: (data) => {
      dispatch({ type: actionTypes.getLibraryContentSuccess, value: data });
    },
    GET_LIBRARY_CONTENT_LOADING: (bool) => {
      dispatch({ type: actionTypes.getLibraryContentLoading, value: bool });
    },
    GET_LIBRARY_CONTENT_ERROR: (data) => {
      dispatch({ type: actionTypes.getLibraryContentError, value: data });
    },
    // Content categories
    GET_CONTENT_CATEGORIES_SUCCESS: (data) => {
      dispatch({ type: actionTypes.getContentCategoriesSuccess, value: data });
    },
    GET_CONTENT_CATEGORIES_LOADING: (bool) => {
      dispatch({ type: actionTypes.getContentCategoriesLoading, value: bool });
    },
    GET_CONTENT_CATEGORIES_ERROR: (data) => {
      dispatch({ type: actionTypes.getContentCategoriesError, value: data });
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
    // goToHowToRecord: () => decidePath(flowTypes.howToRecord),
    goToSuccess: () => decidePath(flowTypes.success),
  };

  useEffect(() => {
    const pathArr = location.pathname.split('/');
    if (!pathArr.includes(flowTypes.description)) {
      navFunctions.goToDescription();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (location.state && location.state.clientDetails) {
      actions.SET_CLIENT_DETAILS(location.state.clientDetails);
    }
  }, [location.state]);

  useEffect(() => {
    const getContent = async () => {
      actions.GET_LIBRARY_CONTENT_LOADING(true);
      const { data, error } = await Contents.getLibraryContent();

      if (!error) {
        const allLibraryC = data.map((el) => ({
          ...el,
          categories: [...new Set(el.categories.map((cat) => cat))],
        }));

        actions.GET_LIBRARY_CONTENT_SUCCESS(allLibraryC);
      } else {
        actions.GET_LIBRARY_CONTENT_ERROR(
          (error && error.message) || 'error loading library content'
        );
      }
    };

    const getCategories = async () => {
      actions.GET_CONTENT_CATEGORIES_LOADING(true);
      const { data, error } = await Contents.getCategories();

      if (!error) {
        actions.GET_CONTENT_CATEGORIES_SUCCESS(createUniqueCats(data));
      } else {
        actions.GET_CONTENT_CATEGORIES_ERROR(
          (error && error.message) || 'error loading content categories'
        );
      }
    };

    if (user.id) {
      getContent();
      getCategories();
    }
  }, [user.id]);

  return (
    <Switch>
      <AddDescription
        exact
        path={navRoutes.THERAPIST.CREATE_PROGRAMME_DESCRIPTION}
        actions={actions}
        parentState={state}
        navFunctions={navFunctions}
        clientId={clientId}
      />
      <AddContent
        exact
        path={navRoutes.THERAPIST.CREATE_PROGRAMME_CONTENT}
        actions={actions}
        parentState={state}
        navFunctions={navFunctions}
      />
      <AddSingleContent
        exact
        path={navRoutes.THERAPIST.CREATE_PROGRAMME_CONTENT_SINGLE}
        actions={{
          handleAddContent: actions.ADD_CONTENT,
          handleAddSingleContent: actions.ADD_SINGLE_CONTENT,
          handleResetSingleContent: actions.RESET_SINGLE_CONTENT,
          handleUploadStatus: actions.HANDLE_UPLOAD_STATUS,
          handleFileUploadInfo: actions.HANDLE_FILE_UPLOAD_INFO,
          handleFileUploadError: actions.HANDLE_FILE_UPLOAD_ERROR,
        }}
        parentState={state}
        navFunctions={navFunctions}
      />
      <ReviewFinish
        exact
        path={navRoutes.THERAPIST.CREATE_PROGRAMME_REVIEW}
        actions={actions}
        parentState={state}
        navFunctions={navFunctions}
        clientId={clientId}
      />
      <Success
        exact
        path={navRoutes.THERAPIST.CREATE_PROGRAMME_SUCCESS}
        actions={actions}
        clientDetails={state.clientDetails}
      />
    </Switch>
  );
};

export default CreateProgram;
