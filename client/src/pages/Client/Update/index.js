import { Row, Col } from '../../../components/Grid';
import { Expandable } from '../../../components/Cards';
import { decideBorder } from '../../../helpers';

import AddVideo from './SendVideo';
import SendMessage from './SendMessage';
import SendAudio from './SendAudio';
import { useParams } from 'react-router';

const types = ['video', 'document', 'audio'];

const Update = () => {
  const { id } = useParams();
  const formContent = [
    <AddVideo programmeId={id} />,
    <SendMessage programmeId={id} />,
    <SendAudio programmeId={id} />,
  ];

  return (
    <Row mb="8">
      {types.map((type, index) => (
        <Col w={[4, 6, 4]} mb="4" key={type}>
          <Expandable
            borderColor={decideBorder(type.toUpperCase())}
            send
            content={{ type }}
          >
            {formContent[index]}
          </Expandable>
        </Col>
      ))}
    </Row>
  );
};

export default Update;
