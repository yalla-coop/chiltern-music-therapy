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

const getTherapists = async ({ options } = {}) => {
  try {
    const { data } = await axios.get(`${USERS_BASE}/therapists`);
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
  getTherapists,
};
