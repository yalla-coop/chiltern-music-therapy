import { useReducer } from 'react';
import { useHistory } from 'react-router';

import { Row, Col } from '../../../components/Grid';
import { Textarea } from '../../../components/Inputs';
import FileUpload from '../../../components/FileUpload';
import Button from '../../../components/Button';
import { CLIENT } from '../../../constants/nav-routes';
import { TherapistClients } from '../../../api-calls';

import { videoReducer } from './reducer';
import actionTypes from './actionTypes';
import validate from '../../../validation/schemas/documentUpdate';

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
  message: '',
  validationErrs: {},
};

const SendMessage = () => {
  const [state, dispatch] = useReducer(videoReducer, initialState);

  const history = useHistory();

  const { fileUpload, message, validationErrs } = state;
  const {
    fileUploading,
    data: uploadedFileInfo,
    error: fileUploadError,
  } = fileUpload;

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

  const handleSubmit = ({ programmeId }) => {
    let fileUploadErr = '';
    try {
      if (!fileUpload?.data?.name && !fileUpload?.data?.key && !message) {
        fileUploadErr = 'this field is requeued';
      } else {
        fileUploadErr = '';
      }

      if (!fileUpload?.data?.name && !fileUpload?.data?.key) {
        validate({
          message: state.message,
          document: fileUpload,
        });
      }
      if (fileUploadErr) {
        actions.HANDLE_VALIDATIONS_ERROR({ fileUpload: fileUploadErr });
      } else {
        actions.HANDLE_VALIDATIONS_ERROR({});

        TherapistClients.sendUpdate({
          type: 'text', // or doc
          programmeId,
          fileUpload: fileUpload.data,
          clientMessage: message,
        });

        history.push(CLIENT.SUCCESS_UPDATE);
      }
    } catch (e) {
      actions.HANDLE_VALIDATIONS_ERROR({
        ...e.inner,
        fileUpload: fileUploadErr,
      });
    }
  };
  return (
    <Row inner mt="5">
      <Col w={[4, 12, 12]} mb={7} mbM={5}>
        <FileUpload
          category={'document'}
          setUploading={actions.HANDLE_UPLOAD_STATUS}
          uploading={fileUploading}
          setFileInfo={actions.HANDLE_FILE_UPLOAD_INFO}
          fileInfo={uploadedFileInfo}
          setError={actions.HANDLE_FILE_UPLOAD_ERROR}
          error={fileUploadError || validationErrs.fileUpload}
          // disable when user adds link to resource
          disabled={null}
        />
      </Col>

      <Col w={[4, 12, 12]} mb={7} mbM={5}>
        <Textarea
          label="Write your message here"
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

export default SendMessage;
