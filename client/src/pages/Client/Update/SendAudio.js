import { useReducer } from 'react';
import { useHistory } from 'react-router';

import { Row, Col } from '../../../components/Grid';
import { BasicInput, Textarea } from '../../../components/Inputs';
import FileUpload from '../../../components/FileUpload';
import Button from '../../../components/Button';
import { CLIENT } from '../../../constants/nav-routes';
import { TherapistClients } from '../../../api-calls';

import { videoReducer } from './reducer';
import actionTypes from './actionTypes';
import validate from '../../../validation/schemas/videoUpdate';

const initialState = {
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
      new: false,
      uploadedToS3: false,
    },
  },
  link: '',
  message: '',
  validationErrs: {},
};

const SendAudio = ({ programmeId }) => {
  const [state, dispatch] = useReducer(videoReducer, initialState);

  const { fileUpload, link, message, validationErrs } = state;
  const {
    fileUploading,
    data: uploadedFileInfo,
    error: fileUploadError,
  } = fileUpload;

  const history = useHistory();

  const actions = {
    // file upload
    HANDLE_UPLOAD_STATUS: (bool) => {
      dispatch({ type: actionTypes.updateFileUploadStatus, value: bool });
    },
    HANDLE_FILE_UPLOAD_INFO: (data) => {
      dispatch({ type: actionTypes.updateFileUploadInfo, value: data });
    },
    HANDLE_FILE_UPLOAD_ERROR: (error) => {
      dispatch({ type: actionTypes.setFileUploadError, value: error });
    },
    ADD_SINGLE_CONTENT: (_key, _value) => {
      dispatch({
        type: actionTypes.addSingleContent,
        key: _key,
        value: _value,
      });
    },
    HANDLE_VALIDATIONS_ERROR: (errors) => {
      dispatch({ type: actionTypes.handleValidationErrors, value: errors });
    },
    RESET_STATE: () => {
      dispatch({ type: actionTypes.resetState, value: initialState });
    },
  };

  const handleSubmit = () => {
    let fileUploadErr = '';
    try {
      if (!fileUpload?.data?.name && !fileUpload?.data?.key && !link) {
        fileUploadErr = 'this field is requeued';
      } else {
        fileUploadErr = '';
      }
      validate({
        link: state.link,
        message: state.message,
        audio: uploadedFileInfo,
      });
    } catch (e) {
      actions.HANDLE_VALIDATIONS_ERROR({
        ...e.inner,
        fileUpload: fileUploadErr,
      });
    }
    if (fileUploadErr) {
      actions.HANDLE_VALIDATIONS_ERROR({ fileUpload: fileUploadErr });
    } else {
      actions.HANDLE_VALIDATIONS_ERROR({});

      TherapistClients.sendUpdate({
        type: 'audio',
        programmeId,
        fileUpload: fileUpload.data,
        clientMessage: message,
        link,
      });

      history.push(CLIENT.SUCCESS_UPDATE);
    }
  };
  return (
    <Row inner mt="5">
      <Col w={[4, 12, 12]} mb={7} mbM={5}>
        <FileUpload
          category={'audio'}
          setUploading={actions.HANDLE_UPLOAD_STATUS}
          uploading={fileUploading}
          setFileInfo={actions.HANDLE_FILE_UPLOAD_INFO}
          fileInfo={uploadedFileInfo}
          setError={actions.HANDLE_FILE_UPLOAD_ERROR}
          error={fileUploadError || validationErrs.fileUpload}
          // disable when user adds link to resource
          disabled={link}
        />
      </Col>
      <Col w={[4, 12, 12]} mb={7} mbM={5}>
        <BasicInput
          placeholder={`audio link...`}
          label="If you prefer, you can paste a link to an external resource in the input below"
          color="gray8"
          value={link}
          handleChange={(value) =>
            actions.ADD_SINGLE_CONTENT('link', value.trim())
          }
          disabled={fileUploading || uploadedFileInfo.new}
          error={validationErrs.link}
        />
      </Col>

      <Col w={[4, 12, 12]} mb={7} mbM={5}>
        <Textarea
          label="Want to add an additional message? Add it here"
          color="gray8"
          placeholder="Message..."
          rows={5}
          value={message}
          handleChange={(value) => actions.ADD_SINGLE_CONTENT('message', value)}
          error={validationErrs.message}
        />
      </Col>
      <Col w={[4, 12, 12]}>
        <Button variant="primary" text="Send" handleClick={handleSubmit} />
      </Col>
    </Row>
  );
};

export default SendAudio;
