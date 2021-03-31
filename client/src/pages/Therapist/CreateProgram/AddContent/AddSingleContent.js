import { Grid, FileUpload } from '../../../../components';

const { Col } = Grid;

const AddSingleContent = ({ actions, state }) => {
  const { singleContent, fileUpload } = state;
  const { contentType } = singleContent;

  const {
    fileUploading,
    data: uploadedFileInfo,
    error: fileUploadError,
  } = fileUpload;

  const { title } = singleContent;

  const {
    UPDATE_CONTENT,
    HANDLE_SINGLE_CONTENT_MODAL,
    UPDATE_SINGLE_CONTENT,
    HANDLE_UPLOAD_STATUS,
    HANDLE_FILE_UPLOAD_INFO,
    HANDLE_FILE_UPLOAD_ERROR,
    RESET_SINGLE_CONTENT,
  } = actions;

  const handleSubmit = async () => {
    const formData = {
      type: contentType,
      // TODO add more inputs and validation
      title,
      uploadedFileInfo,
    };

    // TODO add more checks
    // add to content state
    UPDATE_CONTENT(formData);
    HANDLE_SINGLE_CONTENT_MODAL(false);
    RESET_SINGLE_CONTENT();
  };

  // TODO add card component here

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        marginTop: '2rem',
      }}
    >
      <h1>Add {contentType}</h1>
      <form style={{ marginTop: '2rem' }} onSubmit={handleSubmit}>
        {/* TODO add input validation errors */}
        <span>title: </span>
        <input
          label="Title"
          placeholder="add title"
          type="text"
          value={title}
          onChange={(e) => UPDATE_SINGLE_CONTENT('title', e.target.value)}
        />
        <FileUpload
          category={contentType}
          setUploading={HANDLE_UPLOAD_STATUS}
          uploading={fileUploading}
          setFileInfo={HANDLE_FILE_UPLOAD_INFO}
          fileInfo={uploadedFileInfo}
          setError={HANDLE_FILE_UPLOAD_ERROR}
          error={fileUploadError}
          w="300"
        />
      </form>

      <Col w={[4, 4, 4]}>
        <button
          style={{ marginTop: '2rem' }}
          disabled={
            fileUploading ||
            title.length === 0 ||
            !uploadedFileInfo.uploadedToS3
          }
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
