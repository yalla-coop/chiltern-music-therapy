import actionTypes from './actionTypes';

export const videoReducer = (state, action) => {
  const { type, key, value } = action;
  switch (type) {
    case actionTypes.addSingleContent:
      return {
        ...state,
        [key]: value,
      };

    case actionTypes.updateFileUploadStatus:
      return {
        ...state,
        fileUpload: {
          ...state.fileUpload,
          fileUploading: value,
        },
      };
    case actionTypes.updateFileUploadInfo:
      return {
        ...state,
        fileUpload: {
          ...state.fileUpload,
          data: value,
        },
      };
    case actionTypes.setFileUploadError:
      return {
        ...state,
        fileUpload: {
          ...state.fileUpload,
          error: value,
        },
      };
    case actionTypes.resetState:
      return state;

    case actionTypes.handleValidationErrors:
      return {
        ...state,
        validationErrs: { ...value },
      };
    case actionTypes.handleRequestError:
      return {
        ...state,
        requestError: { ...value },
      };
    case actionTypes.handleRequestLoading:
      return {
        ...state,
        requestLoading: value,
      };

    default:
      throw new Error(`Unhandled type: ${type}`);
  }
};
