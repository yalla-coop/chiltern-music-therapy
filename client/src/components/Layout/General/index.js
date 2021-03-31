import React from 'react';
import PropTypes from 'prop-types';
import * as S from './style';
import { ReactComponent as TextLogo } from '../../Icon/icons/TextLogo.svg';

const General = ({ children, ...props }) => {
  return (
    <>
      <S.Wrapper>
        <S.OnboardingHeader>
          <TextLogo />
          {/* nav menu goes here */}
          <div>menu</div>
        </S.OnboardingHeader>
      </S.Wrapper>
      <S.Content>{children}</S.Content>
    </>
  );
};

General.propTypes = {
  children: PropTypes.node.isRequired,
};

export default General;
