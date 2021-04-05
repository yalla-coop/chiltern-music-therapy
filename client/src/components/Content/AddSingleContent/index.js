import { useLocation, Link } from 'react-router-dom';

import {
  GoBack,
  Typography as T,
  Button,
  Grid,
  Inputs,
  FileUpload,
} from '../../../components';

import { content, navRoutes } from '../../../constants';

import * as S from './style';

const { fileCategories } = content;

const { Row, Col } = Grid;
const { BasicInput, Textarea, Dropdown, Checkbox } = Inputs;

const AddSingleContent = ({ state, actions }) => {
  console.log('s', state);
  const { singleContent, fileUpload } = state;

  const {
    fileUploading,
    data: uploadedFileInfo,
    error: fileUploadError,
  } = fileUpload;

  const { title, categories, link, docContent, libraryContent } = singleContent;

  const {
    state: { category },
  } = useLocation();
  console.log('l', category);

  const {
    // UPDATE_CONTENT,
    // HANDLE_SINGLE_CONTENT_MODAL,
    // UPDATE_SINGLE_CONTENT,
    HANDLE_UPLOAD_STATUS,
    HANDLE_FILE_UPLOAD_INFO,
    HANDLE_FILE_UPLOAD_ERROR,
    // RESET_SINGLE_CONTENT,
  } = actions;

  const handleSubmit = (e) => {
    e.preventDefault();
    // setState({ submitAttempt: true });

    // const isValid = validateForm();
    // if (isValid) {
    //   handleSignup();
    // }
  };

  return (
    <S.Wrapper onSubmit={handleSubmit}>
      <GoBack />
      <Row mt={5} mb={7}>
        <Col w={[4, 12, 12]}>
          <T.H1 color="gray10">
            {' '}
            <strong>Add</strong> {category}{' '}
          </T.H1>
        </Col>
      </Row>
      {/* ADD VIDEO EXPLAINER */}
      <Row>
        <Col w={[4, 12, 4]} mb={7} mbM={5}>
          <BasicInput
            placeholder="Type here..."
            label="Title"
            color="gray8"
            value={title}
            // handleChange={(value) => setState({ title: value })}
            // error={validationErrs.firstName}
          />
        </Col>
        <Col w={[4, 12, 4]} mb={7} mbM={5}>
          <Dropdown
            label="Categories"
            color="gray8"
            options={categories}
            multi={true}
            placeholder="Select one..."
            search={false}
            // error={error}
          />
        </Col>
      </Row>
      <Row>
        <Col w={[4, 12, 4]} mb={7} mbM={5}>
          <FileUpload
            category={category}
            setUploading={HANDLE_UPLOAD_STATUS}
            uploading={fileUploading}
            setFileInfo={HANDLE_FILE_UPLOAD_INFO}
            fileInfo={uploadedFileInfo}
            setError={HANDLE_FILE_UPLOAD_ERROR}
            error={fileUploadError}
          />
        </Col>
        <Col w={[4, 12, 4]} mb={7} mbM={5}>
          <BasicInput
            placeholder="Type here..."
            label="If you prefer, you can paste a link to an external resource in the input below"
            color="gray8"
            value={link}
            // handleChange={(value) => setState({ title: value })}
            // error={validationErrs.firstName}
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
              // handleChange={setDescription}
            />
          </Col>
        )}
        <Col w={[4, 12, 4]} mb={7} mbM={5}>
          <Textarea
            label="Want to add any more specific instructions for this content?"
            color="gray8"
            placeholder="Message"
            rows={5}
            value={docContent}
            // handleChange={setDescription}
          />
        </Col>
      </Row>
      <Row>
        <Col w={[4, 12, 4]} mb={7} mbM={5}>
          <Checkbox
            label={
              <T.P color="gray8">
                Save this video to
                <Link
                  to={navRoutes.THERAPIST.LIBRARY}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  &nbsp; My Library
                </Link>
                &nbsp; so I can use it again in the future
              </T.P>
            }
            value={libraryContent}
            // handleChange={(value) => setState({ title: value })}
            // error={validationErrs.firstName}
          />
        </Col>
      </Row>
      <Row mt={7}>
        <Col w={[4, 12, 4]} mbM={5} mbT={5}>
          <Button variant="primary" text="Add more content" handleClick="" />
        </Col>
        <Col w={[4, 12, 4]}>
          <Button variant="secondary" text="Review and finish" handleClick="" />
        </Col>
      </Row>
    </S.Wrapper>
  );
};

export default AddSingleContent;
