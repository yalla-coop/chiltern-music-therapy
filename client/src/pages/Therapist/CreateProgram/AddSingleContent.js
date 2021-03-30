import 'antd/dist/antd.css';

import { Col } from '../../../components/Grid';
import { FileUpload } from '../../../components';

const AddSingleContent = ({
  updateContent,
  setShowModal,
  updateSingleContent,
  setFileUploading,
  setUploadedFileInfo,
  setFileUploadError,
  state,
}) => {
  const { contentType, singleContent, fileUpload } = state;
  const {
    fileUploading,
    data: uploadedFileInfo,
    error: fileUploadError,
  } = fileUpload;
  const { title } = singleContent;

  const handleSubmit = async () => {
    const formData = {
      type: contentType,
      // TODO add more inputs and validation
      title,
      uploadedFileInfo,
    };

    // TODO add more checks
    // add to content state
    updateContent(formData);
    setShowModal(false);
  };

  // TODO add card components
  return (
    <div>
      <h1>Add {contentType}</h1>
      <form onSubmit={handleSubmit}>
        {/* TODO add input validation errors */}
        <span>title: </span>
        <input
          label="Title"
          placeholder="add title"
          type="text"
          value={title}
          onChange={(e) => updateSingleContent('title', e.target.value)}
        />
        <FileUpload
          category={contentType}
          setFileUploading={setFileUploading}
          fileUploading={fileUploading}
          setUploadedFileInfo={setUploadedFileInfo}
          uploadedFileInfo={uploadedFileInfo}
          setFileUploadError={setFileUploadError}
          fileUploadError={fileUploadError}
          // maxSize="2"
        />
      </form>

      <Col w={[4, 4, 4]}>
        <button
          style={{ marginTop: '2rem' }}
          disabled={fileUploading}
          loading={fileUploading}
          onClick={handleSubmit}
        >
          {fileUploading ? 'Uploading ...' : 'Add to content'}
        </button>
      </Col>
    </div>
  );
};

export default AddSingleContent;
