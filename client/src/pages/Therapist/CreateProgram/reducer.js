const reducer = (state, action) => {
  const { type, key, value } = action;
  switch (type) {
    case 'showModal':
      return {
        ...state,
        showModal: !state.showModal,
      };
    case 'setContentType':
      return {
        ...state,
        contentType: value,
      };
    case 'updateContent':
      return {
        ...state,
        content: [...state.content, value],
      };
    case 'updateSingleContent':
      return {
        ...state,
        singleContent: {
          ...state.singleContent,
          [key]: value,
        },
      };
    case 'updateFileUploadStatus':
      return {
        ...state,
        fileUpload: {
          ...state.fileUpload,
          fileUploading: value,
        },
      };
    case 'updateFileUploadInfo':
      return {
        ...state,
        fileUpload: {
          ...state.fileUpload,
          data: value,
        },
      };
    case 'updateFileUploadError':
      return {
        ...state,
        fileUpload: {
          ...state.fileUpload,
          error: value,
        },
      };

    default:
      throw new Error();
  }
};

export default reducer;
