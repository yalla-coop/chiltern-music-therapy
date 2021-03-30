import { useHistory } from 'react-router-dom';
// import PropTypes from 'prop-types';

import * as T from '../Typography';
import Icon from '../Icon';

import * as S from './style';

const GoBack = ({ color = 'gray8', customLink, text, ...props }) => {
  const history = useHistory();
  const goBack = () =>
    customLink ? history.push(customLink) : history.goBack();
  console.log('prop', props);
  return (
    <S.Wrapper onClick={goBack} color={color} {...props}>
      <Icon icon="goBack" width={35} height={11} color={color} />
      {text && (
        <T.P bold ml="1" as="span" color={color}>
          {text}
        </T.P>
      )}
    </S.Wrapper>
  );
};

// GoBack.propTypes = {
//   color: PropTypes.string,
//   iconColor: PropTypes.string,
// };

export default GoBack;
