import { Col } from '../../../components/Grid';
import Icon from '../../../components/Icon';
import * as T from '../../../components/Typography';
import * as S from './style';

const DocumentUpdate = ({ update }) => {
  return (
    <Col w={[4, 6, 4]} display="block" mtM="6">
      <T.H5 color="gray7" mb="2">
        MESSAGE
      </T.H5>
      {update.link && (
        <S.LinkWrapper
          href={update.link}
          download
          target="_blank"
          rel="noreferrer"
        >
          <Icon icon="download" width="16" height="16" color="blue" />
          <T.P color="blue" bold ml="2" weight="700">
            Download document
          </T.P>
        </S.LinkWrapper>
      )}
      {update.clientMessage && (
        <T.P color="gray8" mt="3">
          {update.clientMessage}
        </T.P>
      )}
    </Col>
  );
};

export default DocumentUpdate;
