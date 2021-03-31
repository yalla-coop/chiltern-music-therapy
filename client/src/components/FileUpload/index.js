/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { Upload } from 'antd';

import { Media } from '../../api-calls';
import Icon from '../Icon';
import * as T from '../Typography';
import * as S from './style';
import { fileTypeValidation } from '../../constants';

const { printFileTypes, allowedFileTypesAndSizes } = fileTypeValidation;

const { Dragger } = Upload;

const FileUpload = ({
  w, // width
  category,
  setUploading,
  uploading,
  setFileInfo,
  fileInfo = {},
  setError,
  error,
  maxSize,
  disabled,
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
      const fileCategory = type.split('/')[0];
      console.log(`fileCategory`, fileCategory);
      setError(
        `${name} must be one of the following file types: ${printFileTypes(
          category
        )}`
      );
      correctFileType = false;

      // check 2: max size
    } else if (
      maxSize
        ? maxSize < sizeInMb
        : allowedFileTypesAndSizes[category].maxSize < sizeInMb
    ) {
      setError(
        `File is too large. Maximum file size is ${
          maxSize ? maxSize : allowedFileTypesAndSizes[category].maxSize
        } MBs`
      );
      correctFileType = false;
    } else {
      setError('');
      correctFileType = true;
    }
    // if false upload doesn't run
    return correctFileType ? true : false;
  };

  // here you can controll state depending on upload status
  const handleFileChanged = async ({ file }) => {
    const { status, name } = file;

    setFileName(name);
    if (!error) {
      if (status === 'removed') {
        setFileList([]);
      } else if (status === 'uploading') {
        setUploading(true);
        setFileList([file]);
      } else if (status === 'done') {
        setUploading(false);
        setError(null);
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
      setError(_error.message);
    } else {
      updatedFile = { ...data, new: true };
      setFileInfo(updatedFile);
      setError(null);
      return data.url;
    }
    return false;
  };

  // uploads to S3 using signed URL
  const uploadFile = async (options) => {
    const { onSuccess, onError, file, onProgress } = options;
    // check if signed URL is present
    if (fileInfo.url && fileInfo.new) {
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
        signedURL: fileInfo.url,
        file,
        options: config,
      });

      if (_error) {
        onError(setError(_error.message));
      } else {
        updatedFile = {
          ...fileInfo,
          ...newUploadedFileInfo,
          uploadedToS3: true,
        };
        setFileInfo(updatedFile);
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
    disabled: disabled || uploading,
    progress: {
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068',
      },
      strokeWidth: 3,
      format: (percent) => `${parseFloat(percent.toFixed(2))}%`,
    },
    showUploadList: !!uploading && !error,
  };

  return (
    <S.Wrapper error={error} w={w}>
      <Dragger {...props}>
        <S.UploadDetails>
          <Icon error={error} icon="inbox" />
          <T.P color="gray9">Click or drag file to this area to upload</T.P>
        </S.UploadDetails>
      </Dragger>
      {fileName && (
        <S.FileNameWrapper>
          {!error ? (
            <>
              <Icon color="blue" icon="attachment" />
              <T.P
                color="blue"
                style={{
                  marginLeft: '0.2rem',
                  marginTop: '-0.2rem',
                }}
              >
                {fileName}
              </T.P>
            </>
          ) : (
            <T.P color="pink">{error}</T.P>
          )}
        </S.FileNameWrapper>
      )}
    </S.Wrapper>
  );
};

export default FileUpload;
