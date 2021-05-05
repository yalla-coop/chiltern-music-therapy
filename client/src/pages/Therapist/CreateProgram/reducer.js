import actionTypes from './actionTypes';

const reducer = (state, action) => {
  const { type, value } = action;
  switch (type) {
    case actionTypes.addContent:
      return {
        ...state,
        content: [...state.content, value],
      };
    case actionTypes.setContent:
      return {
        ...state,
        content: value,
      };
    case actionTypes.setDescription:
      return {
        ...state,
        description: value,
      };
    case actionTypes.setClientDetails:
      return {
        ...state,
        clientDetails: value,
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

    // Content categories
    case actionTypes.getContentCategoriesLoading:
      return {
        ...state,
        contentCategories: {
          ...state.contentCategories,
          data: [],
          error: null,
          loading: value,
        },
      };
    case actionTypes.getContentCategoriesSuccess:
      return {
        ...state,
        contentCategories: {
          ...state.contentCategories,
          data: value,
          error: null,
          loading: false,
        },
      };
    case actionTypes.getContentCategoriesError:
      return {
        ...state,
        contentCategories: {
          ...state.contentCategories,
          data: [],
          error: value,
          loading: false,
        },
      };

    default:
      throw new Error(`Unhandled type: ${type}`);
  }
};

export default reducer;
