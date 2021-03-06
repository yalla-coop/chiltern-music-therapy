import { useState, useEffect } from 'react';
import { useLocation, Prompt } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import {
  GoBack,
  Typography as T,
  Button,
  Grid,
  Inputs,
  FileUpload,
} from '../../../components';

import { Info } from '../../Cards';

import { content, navRoutes } from '../../../constants';
import theme from '../../../theme';
import validate from '../../../validation/schemas/programmeSingleContent';

import * as S from './style';

const { fileCategories } = content;

const { Row, Col } = Grid;
const { BasicInput, Textarea, Dropdown, Checkbox } = Inputs;

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

const AddSingleContent = ({ contentCategories, addContent, navFunctions }) => {
  const [singleContent, setSingleContent] = useState(
    initialStates.singleContent
  );
  const [fileUpload, setFileUpload] = useState(initialStates.fileUpload);
  const [submitAttempt, setSubmitAttempt] = useState(false);
  const [allContentInputsMissing, setAllContentInputsMissing] = useState(null);
  const [unsavedChanges, setUnsavedChanges] = useState(true);

  const {
    fileUploading,
    data: uploadedFileInfo,
    error: fileUploadError,
  } = fileUpload;

  const {
    title,
    categories,
    link,
    docContent,
    libraryContent,
    instructions,
    validationErrs,
  } = singleContent;

  const {
    data: contentCategoriesData,
    error: contentCategoriesError,
  } = contentCategories;

  const location = useLocation();

  const category = location.pathname.split('/content/')[1];

  // MANAGE STATE FUNCTIONS
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

  const validInput = (input) =>
    typeof input === 'string' && input.trim().length > 0;

  const checkMissingContentInput = () => {
    // case 1: document, no file, no link, no docContent
    // case 2: audio, video, no file, no link

    const missingErrorMsg = 'Please pick one of the options';

    if (
      category === fileCategories.document &&
      !uploadedFileInfo.new &&
      !validInput(docContent) &&
      !validInput(link)
    ) {
      setAllContentInputsMissing(missingErrorMsg);
      throw new Error();
    } else if (
      [fileCategories.audio, fileCategories.video].includes(category) &&
      !uploadedFileInfo.new &&
      !validInput(link)
    ) {
      setAllContentInputsMissing(missingErrorMsg);
      throw new Error();
    } else {
      setAllContentInputsMissing(null);
      handleFileUploadError('');
    }
  };

  const validateForm = () => {
    try {
      const formData = {
        title,
        categories,
        libraryContent,
        instructions,
      };

      //  add content inputs if they exist
      if (validInput(docContent)) {
        formData.docContent = docContent;
      } else if (validInput(link)) {
        formData.link = link;
      }

      checkMissingContentInput();
      validate(formData);

      handleAddSingleContent('validationErrs', {});
      return true;
    } catch (error) {
      if (error.name === 'ValidationError') {
        handleAddSingleContent('validationErrs', error.inner);
      }
      return false;
    }
  };

  useEffect(() => {
    if (submitAttempt && (title.length || instructions.length)) {
      validateForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, categories, link, docContent, libraryContent, instructions]);

  useEffect(() => {
    handleResetSingleContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitSingleContent = (submitType) => {
    // add single content to overall content
    const formData = {
      id: uuid(),
      type: category,
      title,
      categories,
      libraryContent,
      instructions,
      uploadedFileInfo,
      link,
      docContent,
    };

    addContent(formData);
    handleResetSingleContent();

    if (submitType === 'content') {
      navFunctions.goToAddContent();
    } else if (submitType === 'review') {
      navFunctions.goToReview();
    }
  };

  const handleSubmit = async (e, submitType) => {
    e.preventDefault();

    setSubmitAttempt(true);

    const isValid = await validateForm();

    if (isValid) {
      setUnsavedChanges(false);
      submitSingleContent(submitType);
    }
  };

  const goBack = async () => {
    navFunctions.goToAddContent();
  };

  return (
    <S.Wrapper onSubmit={handleSubmit}>
      <GoBack customFn={goBack} />
      <Prompt
        when={unsavedChanges}
        message="All changes will be lost. Are you sure you want to leave?"
      />
      <Row mt={5} mb={7}>
        <Col w={[4, 12, 12]}>
          <T.H1 color="gray10">
            <strong>Add</strong> {category}
          </T.H1>
        </Col>
      </Row>
      {/* ADD VIDEO EXPLAINER */}
      {category === fileCategories.video && (
        <Row mt={5}>
          <Col w={[4, 12, 4]} mb={5}>
            <Info
              title="Want tips for how to record videos?"
              infoIconStyle={{
                color: 'lightBlue',
                marginTop: theme.spacings[1],
              }}
              body={
                <T.Link
                  underline
                  to={navRoutes.GENERAL.HOW_TO_RECORD}
                  target="_blank"
                >
                  Click to read more
                </T.Link>
              }
            />
          </Col>
        </Row>
      )}

      <Row>
        <Col w={[4, 12, 4]} mb={7} mbM={5}>
          <BasicInput
            placeholder="Type here..."
            label="Title"
            color="gray8"
            value={title}
            handleChange={(value) => handleAddSingleContent('title', value)}
            error={validationErrs.title}
          />
        </Col>
        <Col w={[4, 12, 4]} mb={7} mbM={5}>
          <Dropdown
            label="Categories"
            color="gray8"
            options={contentCategoriesData}
            multi
            addNew
            placeholder="Select...(optional)"
            handleChange={(value) =>
              handleAddSingleContent('categories', value)
            }
            error={validationErrs.categories || contentCategoriesError}
          />
        </Col>
      </Row>
      <Row>
        <Col w={[4, 12, 4]} mb={7} mbM={5}>
          <FileUpload
            category={category}
            setUploading={handleUploadStatus}
            uploading={fileUploading}
            setFileInfo={handleFileUploadInfo}
            fileInfo={uploadedFileInfo}
            setError={handleFileUploadError}
            error={fileUploadError}
            contentInputMissingError={allContentInputsMissing}
            // disable when user adds link to resource
            disabled={validInput(docContent) || validInput(link)}
          />
        </Col>
        <Col w={[4, 12, 4]} mb={7} mbM={5}>
          <BasicInput
            placeholder={`${category} link...`}
            label="If you prefer, you can paste a link to an external resource in the input below"
            color="gray8"
            value={link}
            handleChange={(value) =>
              handleAddSingleContent('link', value.trim())
            }
            disabled={
              validInput(docContent) || fileUploading || uploadedFileInfo.new
            }
            error={validationErrs.link || allContentInputsMissing}
          />
        </Col>
      </Row>
      <Row>
        {category === fileCategories.document && (
          <Col w={[4, 12, 4]} mb={7} mbM={5}>
            <Textarea
              label="Or create the content right now"
              color="gray8"
              placeholder="Type here..."
              rows={5}
              value={docContent}
              handleChange={(value) =>
                handleAddSingleContent('docContent', value)
              }
              disabled={
                validInput(link) || fileUploading || uploadedFileInfo.new
              }
              error={validationErrs.docContent || allContentInputsMissing}
            />
          </Col>
        )}
        <Col w={[4, 12, 4]} mb={7} mbM={5}>
          <Textarea
            label="Want to add any more specific instructions for this content?"
            color="gray8"
            placeholder="Message"
            rows={5}
            value={instructions}
            handleChange={(value) =>
              handleAddSingleContent('instructions', value)
            }
            error={validationErrs.instructions}
          />
        </Col>
      </Row>
      <Row>
        <Col w={[4, 12, 4]} mb={7} mbM={5}>
          <Checkbox
            label={
              <T.P color="gray9">
                Save this video to
                <T.Link
                  weight="700"
                  to={navRoutes.THERAPIST.LIBRARY}
                  bold
                  external
                >
                  &nbsp; My Library
                </T.Link>
                &nbsp; so I can use it again in the future
              </T.P>
            }
            checked={libraryContent}
            handleChange={(value) =>
              handleAddSingleContent('libraryContent', value)
            }
            error={validationErrs.libraryContent}
          />
        </Col>
      </Row>
      <Row mt={7}>
        <Col w={[4, 12, 4]} mbM={5} mbT={5}>
          <Button
            variant="primary"
            text={fileUploading ? 'Uploading ...' : 'Add more content'}
            type="submit"
            handleClick={(e) => handleSubmit(e, 'content')}
            loading={fileUploading}
          />
        </Col>
        <Col w={[4, 12, 4]}>
          <Button
            variant="secondary"
            text={fileUploading ? 'Uploading ...' : 'Review and finish'}
            type="submit"
            handleClick={(e) => handleSubmit(e, 'review')}
            loading={fileUploading}
          />
        </Col>
      </Row>
    </S.Wrapper>
  );
};

export default AddSingleContent;
