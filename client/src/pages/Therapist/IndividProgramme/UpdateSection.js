import { Col, Row } from '../../../components/Grid';
import * as S from './style';
import {
  dateFormatterDay,
  dateFormatterMonthYeah,
} from '../../../helpers/dateFormatter';
import * as T from '../../../components/Typography';
import Button from '../../../components/Button';
import { Basic } from '../../../components/Cards';
import { THERAPIST } from '../../../constants/nav-routes';

const UpdateSection = ({ update }) =>
  update && update.createdAt ? (
    <>
      <Row>
        <Col w={[4, 6, 5]} dir="column" ai="left">
          <T.H2 mb="2" weight="bold">
            Client update
          </T.H2>
          <T.P color="gray8" mb="4">
            Your client sent you an update on{' '}
            {dateFormatterDay(update.createdAt)}{' '}
            <S.BoldSpan>{dateFormatterMonthYeah(update.createdAt)}</S.BoldSpan>
          </T.P>
        </Col>
      </Row>
      <Row mb="7">
        <Col w={[4, 4, 4]}>
          <Button text="View update" to={THERAPIST.MESSAGE} />
        </Col>
      </Row>
    </>
  ) : (
    <Col w={[4, 6, 4]} dir="column" ai="left" mb="7">
      <Basic>
        <T.P weight="light" ta="center">
          No update yet. <b>We'll send you an email</b> as soon as they do!
        </T.P>
      </Basic>
    </Col>
  );

export default UpdateSection;
