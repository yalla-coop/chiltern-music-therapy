import React, { useState } from 'react';

import FileUpload from '.';

// PROPS
// category -> video, application, audio
// fileUploadError -> str
// uploadedFileInfo -> obj

// handleFileUploadStatus  -> fn
// fileUploading -> fn
// handleFileUploadInfo -> fn
// handleFileUploadError -> fn

export default {
  title: 'Common Components/File Upload',
  argTypes: {},
};

const Template = (args) => {
  const [fileUploadError, setFileUploadError] = useState(null);
  const [uploadedFileInfo, setUploadedFileInfo] = useState({});
  const [fileUploading, setFileUploading] = useState(false);

  return (
    <div>
      <FileUpload
        {...args}
        fileUploadError={fileUploadError}
        handleFileUploadError={setFileUploadError}
        handleFileUploadInfo={setUploadedFileInfo}
        uploadedFileInfo={uploadedFileInfo}
        fileUploading={fileUploading}
        handleFileUploadStatus={setFileUploading}
      />

      <div style={{ border: '2px solid', marginTop: '2rem' }}>
        <h3>Try to upload a file</h3>
        <p>when selecting a correct file it won't actually upload...</p>

        <h4>accepted file types:</h4>
        <ul>
          <li>video: mp4 / less than 2GB</li>
          <li>document: PDF / less than 20MB</li>
          <li>audio: mpeg (mp3) / less than 100MB</li>
          <li>if maxSize is present allowed file size changes</li>
        </ul>
      </div>
    </div>
  );
};

export const VideoUpload = Template.bind({});
VideoUpload.args = {
  category: 'video',
};

export const DocumentUpload = Template.bind({});
DocumentUpload.args = {
  category: 'application',
};

export const AudioUpload = Template.bind({});
AudioUpload.args = {
  category: 'audio',
};

export const AudioUploadWithMaxSize = Template.bind({});
AudioUploadWithMaxSize.args = {
  category: 'audio',
  maxSize: '1',
};
