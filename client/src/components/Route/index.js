import React from 'react';
import { Route as RouterRoute, Redirect } from 'react-router-dom';
import Layout from './../../components/Layout';
import { navRoutes } from '../../constants/';

import { authorization } from '../../helpers';
import { useAuth } from '../../context/auth';
import { roles } from './../../constants';

const Route = (props) => {
  const {
    isPrivate,
    layout,
    path,
    Component,
    exact,
    allowedRoles,
    loggedOutOnly,
  } = props;

  const { user } = useAuth();

  if (isPrivate) {
    const authorized = authorization(user.role, allowedRoles);
    const { hasProfile } = user;
    const profileRequired = user.role === roles.THERAPIST && !hasProfile;

    // MAKE SURE THERAPIST HAS TO FILL IN PROFILE
    if (
      user.id &&
      authorized &&
      profileRequired &&
      path !== navRoutes.THERAPIST.PROFILE &&
      path !== navRoutes.THERAPIST.WELCOME
    ) {
      return <Redirect to={navRoutes.THERAPIST.PROFILE} {...props} />;
    }

    if (user.id) {
      return (
        <RouterRoute path={path} props exact={exact}>
          <Layout layout={layout} {...props}>
            {authorized ? (
              <Component {...props} />
            ) : (
              <Redirect to={navRoutes.GENERAL.UNAUTHORIZED} {...props} />
            )}
          </Layout>
        </RouterRoute>
      );
    }
    return <Redirect to={navRoutes.GENERAL.LOGIN} />;
  }

  if (loggedOutOnly && user.id) {
    if (user.role === roles.THERAPIST) {
      return <Redirect to={navRoutes.THERAPIST.DASHBOARD} />;
    }
    if (user.role === roles.CLIENT) {
      return <Redirect to={navRoutes.CLIENT.DASHBOARD} />;
    }
    if (user.role === roles.ADMIN) {
      return <Redirect to={navRoutes.ADMIN.ALL_CONTENT} />;
    }
  }

  return (
    <RouterRoute path={path} props exact={exact}>
      <Layout layout={layout} {...props}>
        <Component {...props} />
      </Layout>
    </RouterRoute>
  );
};

export default Route;
