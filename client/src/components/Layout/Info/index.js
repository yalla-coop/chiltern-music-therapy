import React from 'react';
import PropTypes from 'prop-types';
import * as S from './style';
import Image from '../../Image';

const General = ({ children, image = 'welcome1', ...props }) => {
  return (
    <S.Wrapper>
      <S.Content>{children}</S.Content>
      <S.AssetWrapper>
        <Image image={image} customStyle={{ width: '100%' }} />
      </S.AssetWrapper>
    </S.Wrapper>
  );
};

General.propTypes = {
  children: PropTypes.node.isRequired,
};

export default General;
