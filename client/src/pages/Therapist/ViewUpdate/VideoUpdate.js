import { Col } from '../../../components/Grid';
import * as T from '../../../components/Typography';
import Video from '../../../components/Video';

const VideoUpdate = ({ update }) => {
  return (
    <Col w={[4, 6, 4]} display="block" mtM="6">
      <T.H5 color="gray7" mb="2">
        MESSAGE
      </T.H5>
      <Video url={update.link} type={update.type} />
      {update.clientMessage && (
        <T.P color="gray8" mt="7">
          {update.clientMessage}
        </T.P>
      )}
    </Col>
  );
};

export default VideoUpdate;
