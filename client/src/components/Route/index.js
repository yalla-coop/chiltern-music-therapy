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
        <Layout layout={layout} {...props}>
          <RouterRoute path={path} props exact={exact}>
            {authorized ? (
              <Component {...props} />
            ) : (
              <Redirect to={navRoutes.GENERAL.UNAUTHORIZED} {...props} />
            )}
          </RouterRoute>
        </Layout>
      );
    }
    return <Redirect to={navRoutes.GENERAL.LOGIN} />;
  }

  return (
    <Layout layout={layout} {...props}>
      <RouterRoute path={path} props exact={exact}>
        <Component {...props} />
      </RouterRoute>
    </Layout>
  );
};

export default Route;
