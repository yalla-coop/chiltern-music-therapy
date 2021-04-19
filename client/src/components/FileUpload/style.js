import styled from '@emotion/styled';
import setMargin from '../../helpers/set-margin';

export const Wrapper = styled.div`
  ${setMargin};
  width: ${({ w }) => w || '100%'};

  .ant-upload.ant-upload-drag {
    opacity: ${({ disabled }) => (disabled ? '0.6' : '1')};
    background: none;
    border-radius: 10px;
    border: ${({ error, theme }) =>
      `1px dashed ${error ? theme.colors.pink : theme.colors.blue}`};
  }
  .ant-upload-drag-container {
    padding: 10px;
  }
  .ant-upload-list-item-name {
    color:  ${({ theme }) => theme.colors.blue}}
    font-size: 16px;
    font-weight: bold;

  }

`;

export const UploadDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FileNameWrapper = styled.div`
  margin-top: ${({ theme }) => theme.spacings[4]};
  display: flex;
`;

export const InfoWrapper = styled.button`
  margin-top: ${({ theme }) => theme.spacings[2]};
  margin-bottom: ${({ theme }) => theme.spacings[2]};
  margin-left: ${({ theme }) => theme.spacings[2]};
  display: flex;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
`;
