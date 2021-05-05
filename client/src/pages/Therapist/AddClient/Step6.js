import { Row, Col } from '../../../components/Grid';
import * as T from '../../../components/Typography';
import Button from '../../../components/Button';
import Copy from '../../../components/Copy';
import { THERAPIST } from '../../../constants/nav-routes';

const Step6 = ({
  inviteLink,
  clientId,
  firstInitial,
  lastInitial,
  postcode,
}) => {
  return (
    <>
      <Row>
        <Col w={[4, 6, 6]}>
          <T.P color="gary8">
            Please share this unique invite link to your client
          </T.P>
        </Col>
      </Row>
      <Row mt={4}>
        <Col w={[4, 6, 6]}>
          <Copy inviteToken={inviteLink} />
        </Col>
      </Row>

      <Row mt={6} mtT={8}>
        <Col w={[4, 6, 4]} mtT={4}>
          <Button
            text="Start adding content for my client"
            to={{
              pathname: THERAPIST.CREATE_PROGRAMME_DESCRIPTION.replace(
                ':id',
                clientId
              ),
              state: {
                clientDetails: {
                  firstInitial: firstInitial,
                  lastInitial: lastInitial,
                  postcode: postcode,
                },
              },
            }}
          />
        </Col>
        <Col w={[4, 6, 4]} mtT={4}>
          <Button
            text="Return home"
            variant="secondary"
            to={THERAPIST.DASHBOARD}
          />
        </Col>
      </Row>
    </>
  );
};

export default Step6;
