import styled from '@emotion/styled';
import setMargin from './../../helpers/set-margin';

export const Wrapper = styled.div`
  ${setMargin};
  background: ${({ theme }) => theme.colors.gray2};
  border-radius: 10px;
  display: flex;
  width: 100%;
  padding: 27px 16px;
  align-items: center;
  justify-content: space-between;

  h5,
  p,
  div {
    word-wrap: break-word !important;
    overflow-wrap: break-word;
    -ms-word-break: break-all;
    word-break: break-word;
  }
`;

export const CopyBtn = styled.button`
  ${setMargin};
  border: none;
  background: none;
  cursor: pointer;
  min-width: 25%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
