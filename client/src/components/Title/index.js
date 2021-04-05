import { Row, Col } from '../Grid';
import * as T from '../Typography';

const Title = ({ lightSection, boldSection, boldFirst }) =>
  boldFirst ? (
    <Row mb="5">
      <Col w={[4, 8, 6]} style={{ display: 'flex ' }}>
        <T.H1>
          <span style={{ fontWeight: 'bold' }}>{boldSection}</span>{' '}
          {lightSection}
        </T.H1>
      </Col>
    </Row>
  ) : (
    <Row mb="5">
      <Col w={[4, 8, 6]} style={{ display: 'flex ' }}>
        <T.H1>
          {lightSection}{' '}
          <span style={{ fontWeight: 'bold' }}>{boldSection}</span>
        </T.H1>
      </Col>
    </Row>
  );

export default Title;
