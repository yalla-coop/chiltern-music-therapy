import React from 'react';
import PropTypes from 'prop-types';
import * as S from './style';
import { ReactComponent as TextLogo } from '../../Icon/icons/TextLogo.svg';

const Onboarding = ({ children, ...props }) => {
  return (
    <>
      <S.Wrapper>
        <S.OnboardingHeader>
          <TextLogo />
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
