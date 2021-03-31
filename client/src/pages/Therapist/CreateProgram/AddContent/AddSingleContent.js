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
    updateContent,
    handleShowModal,
    updateSingleContent,
    handleFileUploadStatus,
    handleFileUploadInfo,
    handleFileUploadError,
    resetSingleContent,
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
    updateContent(formData);
    handleShowModal(false);
    resetSingleContent();
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
          onChange={(e) => updateSingleContent('title', e.target.value)}
        />
        <FileUpload
          category={contentType}
          setUploading={handleFileUploadStatus}
          uploading={fileUploading}
          setFileInfo={handleFileUploadInfo}
          fileInfo={uploadedFileInfo}
          setError={handleFileUploadError}
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
