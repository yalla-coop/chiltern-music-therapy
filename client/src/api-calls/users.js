import axios from 'axios';
import handleError from './format-error';

const USERS_BASE = '/users';

const getUserById = async ({ id, options }) => {
  try {
    const { data } = await axios.get(`${USERS_BASE}/${id}`);
    return { data };
  } catch (error) {
    const err = handleError(error, options);
    return { error: err };
  }
};

const getLoggedInUserInfo = async ({ options } = {}) => {
  try {
    const { data } = await axios.get(`${USERS_BASE}/my-info`);
    return { data };
  } catch (error) {
    const err = handleError(error, options);
    return { error: err };
  }
};

const signup = async (form, { options } = {}) => {
  try {
    const { data } = await axios.post(`${USERS_BASE}/signup`, form);
    return { data };
  } catch (error) {
    const err = handleError(error, options);
    return { error: err };
  }
};

const login = async (form, { options } = {}) => {
  try {
    const { data } = await axios.post(`${USERS_BASE}/login`, form);
    return { data };
  } catch (error) {
    const err = handleError(error, options);
    return { error: err };
  }
};

const logout = async ({ options } = {}) => {
  try {
    await axios.post(`${USERS_BASE}/logout`);
    return {};
  } catch (error) {
    const err = handleError(error, options);
    return { error: err };
  }
};

const getUserDashboard = async ({ options } = {}) => {
  try {
    const { data } = await axios.get(`${USERS_BASE}/dashboard`);
    return { data };
  } catch (error) {
    const err = handleError(error, options);
    return { error: err };
  }
};

const resetPasswordLink = async (emailForm, { options } = {}) => {
  try {
    await axios.post(`${USERS_BASE}/reset-password-link`, emailForm);
    return {};
  } catch (error) {
    const err = handleError(error, options);
    return { error: err };
  }
};

const updatePassword = async (data, { options } = {}) => {
  try {
    await axios.post(`${USERS_BASE}/update-password`, data);
    return {};
  } catch (error) {
    const err = handleError(error, options);
    return { error: err };
  }
};

const deleteMyAccount = async ({ options } = {}) => {
  try {
    const { data } = await axios.delete(`${USERS_BASE}`);
    return { data };
  } catch (error) {
    const err = handleError(error, options);
    return { error: err };
  }
};

const getTherapists = async ({ options } = {}) => {
  try {
    const { data } = await axios.get(`${USERS_BASE}/therapists`);
    return { data };
  } catch (error) {
    const err = handleError(error, options);
    return { error: err };
  }
};

const updateAccount = async (accountData) => {
  try {
    const { data } = await axios.patch(`${USERS_BASE}/account`, accountData);
    return { data };
  } catch (error) {
    const err = handleError(error);
    return { error: err };
  }
};

const createTherapistProfile = async (accountData) => {
  try {
    const { data } = await axios.post(`${USERS_BASE}/profile`, accountData);
    return { data };
  } catch (error) {
    const err = handleError(error);
    return { error: err };
  }
};

const getAccountInfo = async ({ options } = {}) => {
  try {
    const { data } = await axios.get(`${USERS_BASE}/my-account`);
    return { data };
  } catch (error) {
    const err = handleError(error, options);
    return { error: err };
  }
};
const checkUserExists = async (form, { options } = {}) => {
  try {
    const { data } = await axios.post(`${USERS_BASE}/check-user-exists`, form);
    return { data };
  } catch (error) {
    const err = handleError(error, options);
    return { error: err };
  }
};

const getCSRFToken = async ({ options } = {}) => {
  try {
    const { data } = await axios.get(`${USERS_BASE}/get-csrf-token`);
    return { data };
  } catch (error) {
    const err = handleError(error, options);
    return { error: err };
  }
};

export {
  getUserById,
  getLoggedInUserInfo,
  signup,
  login,
  logout,
  getUserDashboard,
  resetPasswordLink,
  updatePassword,
  deleteMyAccount,
  getTherapists,
  updateAccount,
  getAccountInfo,
  checkUserExists,
  createTherapistProfile,
  getCSRFToken,
};
