import { useState, useEffect } from 'react';
import { Switch, useHistory, useParams, useLocation } from 'react-router-dom';

// parts
import { AddSingleContent, HowToRecord } from '../../../components/Content';
import Review from './Review';
import AddContent from './AddContent';
import Success from './Success';

import flowTypes from './flowTypes';
import { navRoutes } from '../../../constants';

import { Contents, Programmes } from '../../../api-calls';

import { createUniqueCats } from '../../../helpers';

import { useAuth } from '../../../context/auth';

const initialStates = {
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
};

const EditProgramme = () => {
  const [description, setDescription] = useState('');
  const [programmeContents, setProgrammeContents] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState(
    initialStates.contentCategories
  );
  const [errors, setErrors] = useState({});
  const [clientDetails, setClientDetails] = useState({});
  const [singleContent, setSingleContent] = useState(
    initialStates.singleContent
  );
  const [fileUpload, setFileUpload] = useState(initialStates.fileUpload);

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
    goToReview: () => decidePath(flowTypes.review),
    goToAddContent: () => decidePath(flowTypes.addContent),
    goToAddSingleContent: (type) =>
      decidePathSingle(flowTypes.addSingleContent, type),
    goToHowToRecord: () => decidePath(flowTypes.howToRecord),
    goToSuccess: () => decidePath(flowTypes.success),
  };

  useEffect(() => {
    const pathArr = location.pathname.split('/');

    if (!pathArr.includes(flowTypes.reviewProgramme)) {
      navFunctions.goToReview();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // GET client details
  useEffect(() => {
    if (location.state && location.state.clientDetails) {
      setClientDetails(location.state.clientDetails);
    }
  }, [location.state]);

  // GET PROGRAMME CONTENTS AND THERAPIST CONTENT CATEGORIES
  useEffect(() => {
    const getContent = async () => {
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
      } else {
        setErrors({
          ...errors,
          getProgrammeContent: 'Error getting content for this programme',
        });
      }
    };

    // GET programme description
    const getProgData = async () => {
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
      } else {
        setErrors({
          ...errors,
          getProgrammeDescription:
            'Error getting description for this programme',
        });
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
      const { data, error } = await Contents.getCategories();
      if (!error) {
        setCategoryOptions([
          { label: 'All', value: 'ALL' },
          ...createUniqueCats(data),
        ]);
      } else {
        setErrors({
          ...errors,
          getCategories:
            (error && error.message) || 'Error loading content categories',
        });
      }
    };

    getCategories();
  }, [programmeContents]);

  // MANAGE STATE FUNCTIONS
  const handleAddContent = (moreContent) =>
    setProgrammeContents((prevState) => [...prevState, moreContent]);

  const handleAddSingleContent = (key, value) =>
    setSingleContent((prevState) => ({ ...prevState, [key]: value }));

  const handleResetSingleContent = () => {
    setSingleContent(initialStates.singleContent);
    setFileUpload(initialStates.fileUpload);
  };

  const handleUploadStatus = (bool) => {
    setFileUpload((prevState) => ({ ...prevState, fileUploading: bool }));
  };

  const handleFileUploadInfo = (data) => {
    setFileUpload((prevState) => ({ ...prevState, data }));
  };

  const handleFileUploadError = (err) => {
    setFileUpload((prevState) => ({ ...prevState, error: err }));
  };

  const updateSingleContent = (value) => {
    setProgrammeContents(
      programmeContents.map((el) => {
        if (el.id === value.id) {
          return Object.assign({}, el, { ...el, ...value });
        }
        return el;
      })
    );
  };

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
        }}
        actions={{
          setProgrammeContents,
          setDescription,
          setErrors,
          updateSingleContent,
        }}
        programmeId={programmeId}
      />
      <AddContent
        exact
        path={navRoutes.THERAPIST.EDIT_PROGRAMME_CONTENT}
        parentState={{
          programmeContents,
          categoryOptions,
          errors,
        }}
        actions={{
          setProgrammeContents,
          setErrors,
          handleAddContent,
        }}
        navFunctions={navFunctions}
      />
      <HowToRecord
        exact
        path={navRoutes.THERAPIST.EDIT_PROGRAMME_CONTENT_HOW_TO_RECORD}
      />
      <AddSingleContent
        exact
        path={navRoutes.THERAPIST.EDIT_PROGRAMME_CONTENT_SINGLE}
        actions={{
          handleAddContent,
          handleAddSingleContent,
          handleResetSingleContent,
          handleUploadStatus,
          handleFileUploadInfo,
          handleFileUploadError,
        }}
        parentState={{
          singleContent,
          fileUpload,
          contentCategories: {
            data: categoryOptions,
            error: errors && errors.getCategories,
          },
        }}
        navFunctions={navFunctions}
      />
      <Success
        exact
        path={navRoutes.THERAPIST.EDIT_PROGRAMME_CONTENT_SUCCESS}
        clientDetails={clientDetails}
      />
    </Switch>
  );
};

export default EditProgramme;
