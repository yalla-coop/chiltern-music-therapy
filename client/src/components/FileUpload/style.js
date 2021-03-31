import styled from '@emotion/styled';
import setMargin from '../../helpers/set-margin';

export const Wrapper = styled.div`
  ${setMargin};
  width: ${({ w }) => w || '100%'};

  .ant-upload.ant-upload-drag {
    background: none;
    border-radius: 10px;
    border: ${({ error, theme }) =>
      `1px dashed ${error ? theme.colors.pink : theme.colors.blue}`};
  }
  .ant-upload-drag-container {
    padding: 10px;
  }
`;

export const UploadDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FileNameWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
`;
