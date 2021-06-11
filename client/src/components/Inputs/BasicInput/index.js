import { useState } from 'react';

import Icon from '../../Icon';
import { Info } from '../../Cards';
import * as T from '../../Typography';

import * as CS from '../style';
import * as S from './style';

import { sanitize } from '../../../helpers';

const BasicInput = ({
  type = 'text',
  name,
  placeholder = 'Type here...',
  label,
  error,
  value,
  handleChange,
  helper,
  color = 'gray9',
  w, // width
  disabled,
  autoComplete,
  m, // margins
  showPasswordInfo,
  ...props
}) => {
  const [passwordInfoOpen, setPasswordInfoOpen] = useState(false);
  const decideColor = () => {
    if (error) return 'error';
    return color;
  };
  const onChange = (e) => {
    if (type === 'password') {
      return handleChange(sanitize(e.target.value, null, true), e);
    }
    return handleChange(sanitize(e.target.value), e);
  };

  const Component = type === 'password' ? S.PasswordInput : S.Input;
  return (
    <CS.Field w={w} disabled={disabled} {...m}>
      {label && (
        <CS.Label htmlFor={label}>
          <T.P color={color} m="0" mb="2">
            {label}
          </T.P>
          {showPasswordInfo && type === 'password' && (
            <S.InfoWrapper
              type="button"
              onClick={(e) => setPasswordInfoOpen((prev) => !prev)}
            >
              <Icon icon="questionMark" color="blue" width="16" height="16" />
            </S.InfoWrapper>
          )}
        </CS.Label>
      )}
      <Component
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        color={decideColor()}
        disabled={disabled}
        autoComplete={autoComplete || 'on'}
        error={error}
        {...props}
      />
      {helper && (
        <T.P color={color} mt="2">
          {helper}
        </T.P>
      )}
      {error && (
        <T.P color="error" m="0" mt="1">
          {error}
        </T.P>
      )}
      {passwordInfoOpen && (
        <Info
          title="Password must contain:"
          body={
            <>
              <T.P color="gray9" m={0}>
                - a minimum of 8 characters
              </T.P>
              <T.P color="gray9" m={0}>
                - one capital letter
              </T.P>
              <T.P color="gray9" m={0}>
                - one lowercase letter
              </T.P>
              <T.P color="gray9" m={0}>
                - one number
              </T.P>
              <T.P color="gray9" m={0}>
                - one non alphabetical or numeric character
              </T.P>
            </>
          }
          m={{ mt: 5 }}
        />
      )}
    </CS.Field>
  );
};

export default BasicInput;
