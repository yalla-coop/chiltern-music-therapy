import styled from '@emotion/styled';
import setMargin from '../../../helpers/set-margin';

export const Wrapper = styled.div`
  ${setMargin};
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacings[5]};
`;

export const CardWrapper = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.spacings[4]};
  margin-bottom: ${({ theme }) => theme.spacings[5]};
  box-shadow: ${({ theme }) => theme.shadows.elevation1};
  border-radius: ${({ theme }) => theme.borders.radius};
  border: ${({ theme, error }) => error && theme.borders.inputs};
  border-color: ${({ theme, error }) => error && theme.colors.error};
`;

export const ButtonsWrapper = styled.div`
  width: 100%;
  padding-top: ${({ theme }) => theme.spacings[2]};
  display: flex;
  justify-content: space-between;
`;

export const Button = styled.button`
  width: auto;
  padding-top: ${({ theme }) => theme.spacings[2]};
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-left: ${({ right }) => (right ? 'auto' : 0)};
`;
