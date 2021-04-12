import { Row, Col } from '../Grid';
import * as T from '../Typography';

const Title = ({
  lightSection,
  boldSection,
  boldFirst,
  lightSection2,
  mb,
  mbM,
}) =>
  boldFirst ? (
    <Row mb={mb || '5'} mbM={mbM || '5'}>
      <Col w={[4, 8, 8]} style={{ display: 'flex ' }}>
        <T.H1>
          <span style={{ fontWeight: 'bold' }}>{boldSection}</span>{' '}
          {lightSection}
        </T.H1>
      </Col>
    </Row>
  ) : (
    <Row mb="5">
      <Col w={[4, 8, 8]} style={{ display: 'flex ' }}>
        <T.H1>
          {lightSection}{' '}
          <span style={{ fontWeight: '900' }}>{boldSection}</span>
          {lightSection2 && ` ${lightSection2}`}
        </T.H1>
      </Col>
    </Row>
  );

export default Title;
