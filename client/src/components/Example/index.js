import React, { useState } from 'react';
import PropTypes from 'prop-types';

import * as S from './style';

const Example = ({ showLabel, hideLabel, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && <S.ExampleWrapper mb="4">{children}</S.ExampleWrapper>}
      <S.TextBtn onClick={() => setOpen(!open)}>
        {open ? hideLabel || 'Hide example' : showLabel || 'Show example'}
      </S.TextBtn>
    </>
  );
};

Example.propTypes = {
  // must provide an example
  children: PropTypes.isRequired,
};

export default Example;
