import actionTypes from './actionTypes';

const reducer = (state, action) => {
  const { type, key, value } = action;
  switch (type) {
    case actionTypes.showModal:
      return {
        ...state,
        showModal: !state.showModal,
      };
    case actionTypes.setContentType:
      return {
        ...state,
        contentType: value,
      };
    case actionTypes.updateContent:
      return {
        ...state,
        content: [...state.content, value],
      };
    case actionTypes.updateSingleContent:
      return {
        ...state,
        singleContent: {
          ...state.singleContent,
          [key]: value,
        },
      };
    // takes initial state as value
    case actionTypes.resetSingleContent:
      return {
        ...state,
        singleContent: value.singleContent,
        fileUpload: value.fileUpload,
        contentType: value.contentType,
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

    default:
      throw new Error(`Unhandled type: ${action.type}`);
  }
};

export default reducer;
