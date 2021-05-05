import { useState, useEffect } from 'react';
import { Switch, useHistory, useParams, useLocation } from 'react-router-dom';

// parts
import { AddSingleContent } from '../../../components/Content';
import Review from './Review';
import AddContent from './AddContent';
import Success from './Success';

import flowTypes from './flowTypes';
import { navRoutes } from '../../../constants';

import { Contents, Programmes } from '../../../api-calls';

import { createUniqueCats } from '../../../helpers';

import { useAuth } from '../../../context/auth';

const EditProgramme = () => {
  const [description, setDescription] = useState('');
  const [programmeContents, setProgrammeContents] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [clientDetails, setClientDetails] = useState({});

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
    history.push(
      `${navRoutes.THERAPIST.EDIT_PROGRAMME.replace(
        ':id',
        programmeId
      )}/${flow}`.replace(':category', type)
    );

  const navFunctions = {
    goToReview: () => decidePath(flowTypes.review),
    goToAddContent: () => decidePath(flowTypes.addContent),
    goToAddSingleContent: (type) =>
      decidePathSingle(flowTypes.addSingleContent, type),
    goToSuccess: () => decidePath(flowTypes.success),
  };

  useEffect(() => {
    const pathArr = location.pathname.split('/');

    if (!pathArr.includes(flowTypes.reviewProgramme)) {
      navFunctions.goToReview();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // GET PROGRAMME CONTENTS AND THERAPIST CONTENT CATEGORIES
  useEffect(() => {
    const getContent = async () => {
      setLoading(true);
      const { data, error } = await Contents.getContentByProg({
        id: programmeId,
      });

      if (!error) {
        const allProgrammeC = data.map((el) => ({
          ...el,
          existingContent: true,
          categories: [...new Set(el.categories.map((cat) => cat))],
        }));
        setProgrammeContents(allProgrammeC);
        setLoading(false);
      } else {
        setErrors({
          ...errors,
          getProgrammeContent: 'Error getting content for this programme',
        });
        setLoading(false);
      }
    };

    // GET programme description
    const getProgData = async () => {
      setLoading(true);
      const { data, error } = await Programmes.getProgrammeById({
        id: programmeId,
      });

      if (!error) {
        if (data.description) {
          setDescription(data.description);
        }
        if (data.client) {
          setClientDetails(data.client);
        }
        setLoading(false);
      } else {
        setErrors({
          ...errors,
          getProgrammeDescription:
            'Error getting description for this programme',
        });
        setLoading(false);
      }
    };
    if (user.id) {
      getContent();
      getProgData();
    }
  }, [programmeId, user.id]);

  // GET categories
  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      const { data, error } = await Contents.getCategories();
      if (!error) {
        setCategoryOptions(createUniqueCats(data));
        setLoading(false);
      } else {
        setErrors({
          ...errors,
          getCategories:
            (error && error.message) || 'Error loading content categories',
        });
        setLoading(false);
      }
    };

    getCategories();
  }, []);

  // MANAGE STATE FUNCTIONS
  const handleAddContent = (moreContent) =>
    setProgrammeContents((prevState) => [...prevState, moreContent]);

  return (
    <Switch>
      <Review
        exact
        path={navRoutes.THERAPIST.EDIT_PROGRAMME_REVIEW}
        navFunctions={navFunctions}
        parentState={{
          description,
          programmeContents,
          categoryOptions,
          errors,
          loading,
        }}
        actions={{
          setProgrammeContents,
          setDescription,
          setErrors,
        }}
        programmeId={programmeId}
      />
      <AddContent
        exact
        path={navRoutes.THERAPIST.EDIT_PROGRAMME_CONTENT}
        programmeContents={programmeContents}
        addContent={handleAddContent}
        navFunctions={navFunctions}
      />
      <AddSingleContent
        exact
        path={navRoutes.THERAPIST.EDIT_PROGRAMME_CONTENT_SINGLE}
        addContent={handleAddContent}
        contentCategories={{
          data: categoryOptions,
          error: errors && errors.getCategories,
        }}
        navFunctions={navFunctions}
      />
      <Success
        exact
        path={navRoutes.THERAPIST.EDIT_PROGRAMME_CONTENT_SUCCESS}
        clientDetails={clientDetails}
        loading
      />
    </Switch>
  );
};

export default EditProgramme;
