import React from 'react';

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
  component: FileUpload,
  argTypes: {
    category: { control: 'string' },
    fileUploadError: { control: 'string' },
    uploadedFileInfo: { control: 'object' },
  },
};

const Template = (args) => <FileUpload {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  icon: 'email',
  width: 50,
  height: 50,
};
