import { useParams } from 'react-router';
import { Row, Col } from '../../../components/Grid';
import * as T from '../../../components/Typography';
import Title from '../../../components/Title';
import { TherapistClients } from '../../../api-calls';
import { useEffect, useState } from 'react';

const initialState = {
  firstInitial: null,
  lastInitial: null,
  contactEmail: 'N/A',
  contactNumber: 'N/A',
};

const ContactClient = () => {
  const [state, setState] = useState({ initialState });
  const [errors, setErrors] = useState('');

  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      const { data, error } = await TherapistClients.getClientById({ id });

      if (error) {
        setErrors({ server: error.message });
      } else {
        setState(data);
      }
    };

    if (id) {
      getData();
    }
  }, [id]);

  return (
    <>
      <Title boldSection="Contact" lightSection="My Client" boldFirst />
      <Row>
        <Col w={[4, 4, 4]} display="block">
          <T.H5 color="gray7">CLIENT NAME</T.H5>
          <T.P mt="2">
            {state.firstInitial
              ? `${state.firstInitial} ${state.lastInitial}`
              : 'N/A'}{' '}
          </T.P>
        </Col>
        <Col w={[4, 4, 4]} mtT={5} display="block">
          <T.H5 color="gray7">EMAIL</T.H5>
          <T.P mt="2">{state.contactEmail}</T.P>
        </Col>
        <Col w={[4, 4, 4]} mtT={5} display="block">
          <T.H5 color="gray7">MOBILE NUMBER</T.H5>
          <T.P mt="2">{state.contactNumber} </T.P>
        </Col>
      </Row>
      {errors && (
        <Row>
          <Col w={[4, 12, 12]} mt={5}>
            <T.P color="pink">{errors}</T.P>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ContactClient;
