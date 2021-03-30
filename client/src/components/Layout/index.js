import React from 'react';
import PropTypes from 'prop-types';

import Onboarding from './Onboarding';
import Info from './Info';
import General from './General';

const Layout = ({ layout, ...props }) => {
  switch (layout) {
    case 'onboarding':
      return <Onboarding {...props} />;
    case 'info':
      return <Info {...props} />;
    case 'general':
    default:
      return <General {...props} />;
  }
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
