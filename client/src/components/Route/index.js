import React from 'react';
import { Route as RouterRoute, Redirect } from 'react-router-dom';
import Layout from './../../components/Layout';
import { navRoutes } from '../../constants/';

import { authorization } from '../../helpers';
import { useAuth } from '../../context/auth';

const Route = (props) => {
  const { isPrivate, layout, path, Component, exact, allowedRoles } = props;

  const { user } = useAuth();

  if (isPrivate) {
    const authorized = authorization(user.role, allowedRoles);

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

  return (
    <RouterRoute path={path} props exact={exact}>
      <Layout layout={layout} {...props}>
        <Component {...props} />
      </Layout>
    </RouterRoute>
  );
};

export default Route;
