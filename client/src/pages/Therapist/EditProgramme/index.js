import { useState, useEffect } from 'react';

import { Switch, useHistory, useParams, useLocation } from 'react-router-dom';

import { navRoutes } from '../../../constants';

import { AddSingleContent, HowToRecord } from '../../../components/Content';

// parts
import Review from './Review';
import AddContent from './AddContent';
import Success from './Success';

import flowTypes from './flowTypes';

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
  // TODO update this
  programmeContents: {
    data: [],
    loading: false,
    error: null,
  },
  contentCategories: {
    data: [],
    loading: false,
    error: null,
  },
};

const EditProgramme = () => {
  // EDIT STATES
  const [description, setDescription] = useState('');
  const [programmeContents, setProgrammeContents] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState(
    initialStates.contentCategories
  );
  const [errors, setErrors] = useState({});
  const [clientDetails, setClientDetails] = useState({});

  // Single Content
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

    const getProgData = async () => {
      const { data, error } = await Programmes.getProgrammeById({
        id: programmeId,
      });

      if (!error) {
        if (data.description) {
          setDescription(data.description);
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

  useEffect(() => {
    const getCategories = async () => {
      setCategoryOptions({ data: [], error: null, loading: true });
      const { data, error } = await Contents.getCategories();
      if (!error) {
        setCategoryOptions({
          data: [{ label: 'All', value: 'ALL' }, ...createUniqueCats(data)],
          error: null,
          loading: false,
        });
      } else {
        setCategoryOptions({
          data: [],
          error: (error && error.message) || 'error loading library content',
          loading: false,
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
          description,
          programmeContents,
          categoryOptions,
          errors,
          setProgrammeContents,
          setDescription,
          setErrors,
        }}
        programmeId={programmeId}
      />
      <AddContent
        exact
        path={navRoutes.THERAPIST.EDIT_PROGRAMME_CONTENT}
        states={{
          programmeContents,
          categoryOptions,
          errors,
          setProgrammeContents,
          setErrors,
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
        // actions={{
        //   addContent: actions.ADD_CONTENT,
        //   addSingleContent: actions.ADD_SINGLE_CONTENT,
        //   resetSingleContent: actions.RESET_SINGLE_CONTENT,
        //   handleUploadStatus: actions.HANDLE_UPLOAD_STATUS,
        //   handleFileUploadInfo: actions.HANDLE_FILE_UPLOAD_INFO,
        //   handleFileUploadError: actions.HANDLE_FILE_UPLOAD_ERROR,
        // }}
        // state={state}
        navFunctions={navFunctions}
      />
      <Success
        exact
        path={navRoutes.THERAPIST.EDIT_PROGRAMME_CONTENT_SUCCESS}
        clientDetails={clientDetails}
        // actions={actions}
        // state={state}
      />
    </Switch>
  );
};

export default EditProgramme;
