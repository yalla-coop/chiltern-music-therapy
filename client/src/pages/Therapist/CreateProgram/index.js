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
  clientDetails: {},
  contentCategories: {
    data: [],
    loading: false,
    error: null,
  },
  description: '',
  content: [],
  errors: {},
  loading: false,
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
    // content overall
    ADD_CONTENT: (formData) => {
      dispatch({ type: actionTypes.addContent, value: formData });
    },
    SET_CONTENT: (formData) => {
      dispatch({ type: actionTypes.setContent, value: formData });
    },
  };

  const decidePath = (flow) =>
    history.push(
      `${navRoutes.THERAPIST.CREATE_PROGRAMME.replace(':id', clientId)}/${flow}`
    );

  const decidePathSingle = (flow, type) =>
    history.push(
      `${navRoutes.THERAPIST.CREATE_PROGRAMME.replace(
        ':id',
        clientId
      )}/${flow}`.replace(':category', type)
    );

  const navFunctions = {
    goToDescription: () => decidePath(flowTypes.description),
    goToAddContent: () => decidePath(flowTypes.addContent),
    goToAddSingleContent: (type) =>
      decidePathSingle(flowTypes.addSingleContent, type),
    goToReview: () => decidePath(flowTypes.reviewFinish),
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
      getCategories();
    }
  }, [user.id]);

  // console.log(`state.content`, state.content);
  return (
    <Switch>
      <AddDescription
        exact
        path={navRoutes.THERAPIST.CREATE_PROGRAMME_DESCRIPTION}
        setParentDescription={actions.SET_DESCRIPTION}
        clientId={clientId}
        navFunctions={navFunctions}
      />
      <AddContent
        exact
        path={navRoutes.THERAPIST.CREATE_PROGRAMME_CONTENT}
        addContent={actions.ADD_CONTENT}
        content={state.content}
        navFunctions={navFunctions}
      />
      <AddSingleContent
        exact
        path={navRoutes.THERAPIST.CREATE_PROGRAMME_CONTENT_SINGLE}
        setContentState={actions.ADD_CONTENT}
        contentCategories={state.contentCategories}
        navFunctions={navFunctions}
      />
      <ReviewFinish
        exact
        path={navRoutes.THERAPIST.CREATE_PROGRAMME_REVIEW}
        contentCategories={state.contentCategories}
        parentDescription={state.description}
        setContentState={actions.SET_CONTENT}
        setErrors={actions.SET_ERRORS}
        setLoading={actions.SET_LOADING}
        content={state.content}
        errors={state.errors}
        loading={state.loading}
        navFunctions={navFunctions}
        clientId={clientId}
      />
      <Success
        exact
        path={navRoutes.THERAPIST.CREATE_PROGRAMME_SUCCESS}
        clientDetails={state.clientDetails}
      />
    </Switch>
  );
};

export default CreateProgram;
