import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import * as S from './style';
import { ReactComponent as TextLogo } from '../../Icon/icons/TextLogo.svg';
import GoBack from '../../GoBack';
import theme from '../../../theme';

const Onboarding = ({ children, goBack, ...props }) => {
  return (
    <>
      <S.Wrapper>
        <S.OnboardingHeader>
          <Link to="/">
            <TextLogo />
          </Link>
        </S.OnboardingHeader>
      </S.Wrapper>
      <S.Content>
        {goBack && (
          <GoBack
            mb="6"
            mbM="5"
            ml={`${theme.constants.gridGutter.desktop / 2}px`}
            mlT={`${theme.constants.gridGutter.tablet / 2}px`}
            mlM={`${theme.constants.gridGutter.mobile / 2}px`}
          />
        )}
        {children}
      </S.Content>
    </>
  );
};

Onboarding.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Onboarding;
