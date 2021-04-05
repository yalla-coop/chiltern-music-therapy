import React from 'react';
import PropTypes from 'prop-types';
import * as S from './style';
import { ReactComponent as TextLogo } from '../../Icon/icons/TextLogo.svg';
import Navbar from '../../Navbar';
import { Link } from 'react-router-dom';

const General = ({ children, maxWidth, ...props }) => {
  return (
    <>
      <S.Wrapper>
        <S.OnboardingHeader>
          <Link to="/">
            <TextLogo />
          </Link>
          <Navbar />
        </S.OnboardingHeader>
      </S.Wrapper>
      <S.Content maxWidth={maxWidth}>{children}</S.Content>
    </>
  );
};

General.propTypes = {
  children: PropTypes.node.isRequired,
};

export default General;
