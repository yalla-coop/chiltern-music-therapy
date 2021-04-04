import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import * as S from './style';
import { ReactComponent as TextLogo } from '../../Icon/icons/TextLogo.svg';

const Onboarding = ({ children, ...props }) => {
  return (
    <>
      <S.Wrapper>
        <S.OnboardingHeader>
          <Link to="/">
            <TextLogo />
          </Link>
        </S.OnboardingHeader>
      </S.Wrapper>
      <S.Content>{children}</S.Content>
    </>
  );
};

Onboarding.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Onboarding;
