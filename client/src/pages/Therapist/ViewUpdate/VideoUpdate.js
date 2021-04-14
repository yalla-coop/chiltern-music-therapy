import { Col } from '../../../components/Grid';
import * as T from '../../../components/Typography';
import Video from '../../../components/Video';
import Icon from '../../../components/Icon';

const VideoUpdate = ({ update: { clientMessage, url, type, link } }) => {
  return (
    <Col w={[4, 6, 4]} display="block" mtM="6">
      <T.H5 color="gray7" mb="2">
        MESSAGE
      </T.H5>
      {url && <Video url={url} type={type.toLowerCase()} />}
      {(url || link) && (
        <a href={url || link} download>
          <Icon
            icon="download"
            width="16"
            height="16"
            text={`Download ${type.toLowerCase()}`}
            mt="3"
            color="primary"
          />
        </a>
      )}

      {clientMessage && (
        <T.P color="gray8" mt="4">
          <pre>{clientMessage}</pre>
        </T.P>
      )}
    </Col>
  );
};

export default VideoUpdate;
