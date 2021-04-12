import { useState, useEffect } from 'react';

import { Switch, useHistory, useParams, useLocation } from 'react-router-dom';

import { navRoutes } from '../../../constants';

import { AddSingleContent, HowToRecord } from '../../../components/Content';

// parts
import Review from './Review';
import AddContent from './AddContent';
import Success from './Success';

import flowTypes from './flowTypes';

import { Contents } from '../../../api-calls';

import { createUniqueCats } from '../../../helpers';

import { useAuth } from '../../../context/auth';

const EditProgramme = () => {
  // EDIT STATES
  const [programmeContents, setProgrammeContents] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [errors, setErrors] = useState({});

  const history = useHistory();
  const location = useLocation();

  const { id: programmeId } = useParams();
  const { user } = useAuth();

  const decidePath = (flow) =>
    history.push(
      `${navRoutes.THERAPIST.EDIT_PROGRAMME.replace(
        ':id',
        programmeId
      )}/${flow}`
    );

  const decidePathSingle = (flow, type) =>
    history.push({
      pathname: `${navRoutes.THERAPIST.EDIT_PROGRAMME.replace(
        ':id',
        programmeId
      )}/${flow}`.replace(':category', type),
      state: { category: type },
    });

  const navFunctions = {
    goToReviewProgramme: () => decidePath(flowTypes.reviewProgramme),
    goToAddContent: () => decidePath(flowTypes.addContent),
    goToAddSingleContent: (type) =>
      decidePathSingle(flowTypes.addSingleContent, type),
    goToHowToRecord: () => decidePath(flowTypes.howToRecord),
    goToSuccess: () => decidePath(flowTypes.success),
  };

  useEffect(() => {
    const pathArr = location.pathname.split('/');
    console.log(`pathArr]`, pathArr);
    if (!pathArr.includes(flowTypes.reviewProgramme)) {
      navFunctions.goToReviewProgramme();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   if (location.state && location.state.clientDetails) {
  //     actions.SET_CLIENT_DETAILS(location.state.clientDetails);
  //   }
  // }, [location.state]);

  useEffect(() => {
    const getContent = async () => {
      const { data, error } = await Contents.getContentByProg({
        id: programmeId,
      });

      const allProgrammeC = data.map((el) => ({
        ...el,
        categories: [...new Set(el.categories.map((cat) => cat))],
      }));

      if (!error) {
        setProgrammeContents(allProgrammeC);
      } else {
        setErrors({
          ...errors,
          getProgrammeContent: 'Error getting content for this programme',
        });
      }
    };
    if (user.id) {
      getContent();
    }
  }, [user.id]);

  useEffect(() => {
    const getCategories = async () => {
      const { data, error } = await Contents.getCategories();
      if (!error) {
        setCategoryOptions([
          { label: 'All', value: 'ALL' },
          ...createUniqueCats(data),
        ]);
      } else {
        setErrors({
          ...errors,
          getContentCategories: 'Error getting content categories',
        });
      }
    };

    getCategories();
  }, [programmeContents]);

  return (
    <Switch>
      <Review
        exact
        path={navRoutes.THERAPIST.EDIT_PROGRAMME_REVIEW}
        navFunctions={navFunctions}
        states={{
          programmeContents,
          categoryOptions,
        }}
      />
      <AddContent
        exact
        path={navRoutes.THERAPIST.EDIT_PROGRAMME_CONTENT}
        // actions={actions}
        // state={state}
        navFunctions={navFunctions}
      />
      <HowToRecord
        exact
        path={navRoutes.THERAPIST.EDIT_PROGRAMME_CONTENT_HOW_TO_RECORD}
      />
      <AddSingleContent
        exact
        path={navRoutes.THERAPIST.EDIT_PROGRAMME_CONTENT_SINGLE}
        // actions={actions}
        // state={state}
        navFunctions={navFunctions}
      />
      <Success
        exact
        path={navRoutes.THERAPIST.EDIT_PROGRAMME_CONTENT_SUCCESS}
        // actions={actions}
        // state={state}
      />
    </Switch>
  );
};

export default EditProgramme;
