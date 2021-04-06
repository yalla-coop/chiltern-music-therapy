import { useEffect, createContext, useState, useContext } from 'react';
import { Users } from './../api-calls';

const initialUserState = {
  id: null,
  email: '',
  firstName: '',
  lastName: '',
  role: '',
};

const AuthContext = createContext({
  user: initialUserState,
  setUser: () => {},
  logout: () => {},
});

const getUserInfoFromStorage = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.id) {
    return user;
  } else {
    return initialUserState;
  }
};

const storeUserInfoIntoStorage = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

const clearUserInfoIntoStorage = (user) => {
  localStorage.removeItem('user');
};

const AuthProvider = (props) => {
  const [user, setUser] = useState(getUserInfoFromStorage);

  const _setUser = (data) => {
    // TODO: get active role when multiple roles when its implemented
    if (data.roles) {
      data.role = data?.roles[0];
    }
    // set User in local storage
    storeUserInfoIntoStorage(data);
    // set user in state
    setUser(data);
  };

  const getUserInfo = async () => {
    const { data } = await Users.getLoggedInUserInfo();
    if (data) {
      _setUser(data);
    } else {
      clearUserInfoIntoStorage();
      setUser(initialUserState);
    }
  };

  useEffect(() => {
    getUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = async () => {
    const { error } = await Users.logout();
    if (!error) {
      _setUser({});
    }
  };

  const value = {
    user,
    getUserInfo,
    setUser: _setUser,
    logout,
  };

  return <AuthContext.Provider value={value} {...props} />;
};

const useAuth = () => {
  const value = useContext(AuthContext);
  return value;
};

export { AuthProvider, useAuth };
export default AuthContext;
