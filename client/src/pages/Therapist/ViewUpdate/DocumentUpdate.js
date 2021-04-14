import { Col } from '../../../components/Grid';
import Icon from '../../../components/Icon';
import * as T from '../../../components/Typography';

const DocumentUpdate = ({ update }) => {
  return (
    <Col w={[4, 6, 4]} display="block" mtM="6">
      <T.H5 color="gray7" mb="2">
        MESSAGE
      </T.H5>
      {update.url && (
        <a href={update.url} download>
          <Icon
            icon="download"
            width="16"
            height="16"
            text={`Download document`}
            mt="3"
            color="primary"
          />
        </a>
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
