import actionTypes from './actionTypes';

const reducer = (state, action) => {
  const { type, key, value } = action;
  switch (type) {
    case actionTypes.addContent:
      return {
        ...state,
        content: [...state.content, value],
      };
    case actionTypes.updateContentItem:
      return {
        ...state,
        content: state.content.map((el) => {
          if (el.id === value.id) {
            return Object.assign({}, el, { ...el, ...value });
          }
          return el;
        }),
      };
    case actionTypes.deleteContentItem:
      return {
        ...state,
        content: state.content.filter((el) => {
          return el.id !== value.id;
        }),
      };
    case actionTypes.addSingleContent:
      return {
        ...state,
        singleContent: {
          ...state.singleContent,
          [key]: value,
        },
      };
    case actionTypes.setDescription:
      return {
        ...state,
        description: value,
      };
    case actionTypes.setErrors:
      return {
        ...state,
        errors: value,
      };
    case actionTypes.setLoading:
      return {
        ...state,
        loading: value,
      };
    // takes initial state as value
    case actionTypes.resetSingleContent:
      return {
        ...state,
        singleContent: value.singleContent,
        fileUpload: value.fileUpload,
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
      throw new Error(`Unhandled type: ${type}`);
  }
};

export default reducer;
