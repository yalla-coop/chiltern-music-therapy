import React from 'react';
import PropTypes from 'prop-types';
import * as S from './style';
import Image from '../../Image';
import theme from '../../../theme';
import { useMediaQuery } from 'react-responsive';

const Info = ({ children, image = 'headphones' }) => {
  const isMobile = useMediaQuery({
    query: `(max-width: ${theme.breakpoints.mobile})`,
  });
  return (
    <S.Wrapper>
      <S.Content>{children}</S.Content>
      <S.AssetWrapper>
        <Image
          image={isMobile ? `${image}S` : image}
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
