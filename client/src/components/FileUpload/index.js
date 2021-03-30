/* eslint-disable no-unused-vars */
import { useState } from 'react';
import 'antd/dist/antd.css';
import { Upload } from 'antd';
import { Media } from '../../api-calls';
import Icon from '../Icon';
import * as S from './style';
import { allowedFileTypesAndSizes } from '../../constants';

const { Dragger } = Upload;

const FileUpload = ({
  category,
  setFileUploading,
  fileUploading,
  setUploadedFileInfo,
  uploadedFileInfo = {},
  setFileUploadError,
  fileUploadError,
  maxSize,
}) => {
  const [fileList, setFileList] = useState([]);
  const [fileName, setFileName] = useState(null);
  const [progress, setProgress] = useState(0);

  let updatedFile;

  const checkFileTypes = ({ name, type, size }) => {
    let correctFileType;
    // size in Megabites
    const sizeInMb = size > 0 && size / 1024 / 1024;

    //  check 1: correct file type
    if (!allowedFileTypesAndSizes[category].types.includes(type)) {
      setFileUploadError(
        `${name} is not a ${allowedFileTypesAndSizes[category].types} file`
      );
      correctFileType = false;

      // check 2: max size
    } else if (
      maxSize
        ? maxSize < sizeInMb
        : allowedFileTypesAndSizes[category].maxSize < sizeInMb
    ) {
      setFileUploadError(
        `File is too large. Maximum file size is ${
          maxSize ? maxSize : allowedFileTypesAndSizes[category].maxSize
        } MBs`
      );
      correctFileType = false;
    } else {
      setFileUploadError('');
      correctFileType = true;
    }
    // if false upload doesn't run
    return correctFileType ? true : false;
  };

  // here you can controll state depending on upload status
  const handleFileChanged = async ({ file }) => {
    const { status, name } = file;

    setFileName(name);
    if (!fileUploadError) {
      if (status === 'removed') {
        setFileList([]);
      } else if (status === 'uploading') {
        setFileUploading(true);
        setFileList([file]);
      } else if (status === 'done') {
        setFileUploading(false);
        setFileUploadError(null);
      }
    }
  };

  // get signed url to be used as action / upload url
  const getSignedURL = async (file) => {
    const { data, error: _error } = await Media.getSignedURL({
      fileType: file.type,
      fileName: file.name,
      fileSize: file.size,
      fileCategory: category,
      fileMaxSize: maxSize,
    });

    if (_error) {
      setFileUploadError(_error.message);
    } else {
      updatedFile = { ...data, new: true };
      setUploadedFileInfo(updatedFile);
      setFileUploadError(null);
      return data.url;
    }
    return false;
  };

  // uploads to S3 using signed URL
  const uploadFile = async (options) => {
    const { onSuccess, onError, file, onProgress } = options;
    // check if signed URL is present
    if (uploadedFileInfo.url && uploadedFileInfo.new) {
      //  add custom progress to axios
      const config = {
        onUploadProgress: (event) => {
          const percent = Math.floor((event.loaded / event.total) * 100);
          setProgress(percent);
          if (percent === 100) {
            setTimeout(() => setProgress(0), 1000);
          }
          onProgress({ percent: (event.loaded / event.total) * 100 });
        },
      };
      // upload file
      const {
        data: newUploadedFileInfo,
        error: _error,
      } = await Media.uploadToS3({
        signedURL: uploadedFileInfo.url,
        file,
        options: config,
      });

      if (_error) {
        onError(setFileUploadError(_error.message));
      } else {
        updatedFile = {
          ...uploadedFileInfo,
          ...newUploadedFileInfo,
          uploadedToS3: true,
        };
        setUploadedFileInfo(updatedFile);
        onSuccess('OK');
      }
    }
  };

  const props = {
    name: 'file',
    multiple: false,
    maxCount: 1,
    beforeUpload: (_file) => checkFileTypes(_file),
    action: (_file) => getSignedURL(_file),
    onChange: (e) => handleFileChanged(e),
    customRequest: (options) => uploadFile(options),
    disabled: fileUploading,
    progress: {
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068',
      },
      strokeWidth: 3,
      format: (percent) => `${parseFloat(percent.toFixed(2))}%`,
    },
    showUploadList: !!fileUploading && !fileUploadError,
  };

  return (
    <S.Wrapper>
      <Dragger
        style={{
          background: 'none',
          borderRadius: '10px',
          border: `1px dashed #${fileUploadError ? 'EE4450' : '20B9D6'}`,
          padding: '10px',
        }}
        {...props}
      >
        <p className="ant-upload-drag-icon">
          <Icon error={fileUploadError} icon="inbox" />
        </p>
        {/* TODO UPDATE TYPO */}
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
      </Dragger>
      {/* TODO UPDATE TYPO */}
      {fileName && (
        <S.FileNameWrapper>
          {!fileUploadError ? (
            <>
              <Icon color="blue" icon="attachment" />
              <p
                style={{
                  color: 'blue',
                  marginLeft: '0.2rem',
                  marginTop: '-0.2rem',
                }}
              >
                {fileName}
              </p>
            </>
          ) : (
            <p style={{ color: 'red' }}>{fileUploadError}</p>
          )}
        </S.FileNameWrapper>
      )}
    </S.Wrapper>
  );
};

export default FileUpload;
