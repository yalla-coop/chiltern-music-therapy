import React from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as S from './style';
import Image from '../../Image';
import theme from '../../../theme';
import { ReactComponent as TextLogo } from '../../Icon/icons/TextLogo.svg';

import { useMediaQuery } from 'react-responsive';

import { content } from '../../../constants';

import { useAuth } from '../../../context/auth';

const Info = ({ children, image = 'headphones', section = 'welcome' }) => {
  const isMobile = useMediaQuery({
    query: `(max-width: ${theme.breakpoints.tablet})`,
  });

  const { user } = useAuth();
  const { id } = useParams();

  const decideImage = () => {
    if (section === 'welcome' && id && user.role) {
      return content.welcomeScreens[user.role][Number(id) - 1]?.image;
    }
    return image;
  };

  return (
    <S.Wrapper>
      <S.Content>
        {!isMobile && <TextLogo />}
        {children}
      </S.Content>
      <S.AssetWrapper>
        <Image
          image={isMobile ? `${decideImage()}S` : decideImage()}
          customStyle={{ width: '100%' }}
        />
      </S.AssetWrapper>
    </S.Wrapper>
  );
};

Info.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Info;
