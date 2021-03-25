import React from 'react';
import PropTypes from 'prop-types';

const General = ({ children, ...props }) => {
  return (
    <>
      <header>header</header>
      <main>{children}</main>
      <footer>footer</footer>
    </>
  );
};

General.propTypes = {
  children: PropTypes.node.isRequired,
};

export default General;
