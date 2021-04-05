import { Col, Row } from '../../../components/Grid';
import { Link } from '../../../components/Cards';
import { Dropdown } from '../../../components/Inputs';
import { THERAPIST } from '../../../constants/nav-routes';
import * as T from '../../../components/Typography';
import Button from '../../../components/Button';

import { useState } from 'react';

import * as S from './style';
import { useHistory } from 'react-router';

const generateOptions = (data) =>
  data?.length > 0
    ? data.map((client) => ({
        label: `${client.firstInitial} ${client.secondInitial} ${client.postcode}`,
        value: client.id,
      }))
    : [];

const decideBorderColor = (n) => {
  const a = n % 3;
  if (a === 0) return 'rainbowHorizontal';
  if (a === 1) return 'darkBlueH';
  if (a === 2) return 'PinkUnderH';
};

const ClientsSection = ({ clients }) => {
  const history = useHistory();
  const [viewClients, setViewClients] = useState(5);
  const handleChange = (e) => {
    history.push(THERAPIST.CLIENT.replace(':id', e));
  };

  return (
    <>
      <Row>
        <Col w={[4, 4, 4]} mt={6}>
          <Dropdown
            placeholder="Search..."
            options={generateOptions(clients)}
            handleChange={handleChange}
            search
          />
        </Col>
      </Row>
      <Row mt={5} mtT={2}>
        {clients?.length > 0 &&
          clients.slice(0, viewClients).map((client, index) => {
            return (
              <Col w={[4, 4, 4]} mt={4}>
                <S.CardWrapper>
                  <Link
                    variant="client"
                    title="therapy plan"
                    client={{
                      firstInitial: 'J',
                      secondInitial: 'P',
                      postcode: 'SW',
                      id: 1,
                    }}
                    to={THERAPIST.CLIENT.replace(':id', client.id)}
                    borderColor={decideBorderColor(index)}
                  />
                </S.CardWrapper>
              </Col>
            );
          })}
      </Row>

      {viewClients < clients.length && (
        <Row>
          <Col w={[4, 12, 12]} jc="flex-start" jcT="center">
            <T.Link
              weight="bold"
              to={false}
              mt={6}
              onClick={() => setViewClients((_old) => _old + 5)}
              underline
            >
              View more
            </T.Link>
          </Col>
        </Row>
      )}
      <Row mt={8} mtT={6}>
        <Col w={[4, 4, 4]}>
          <Button
            text="Add a new client"
            variant="primary"
            to={THERAPIST.NEW_CLIENT}
          />
        </Col>
      </Row>
    </>
  );
};

export default ClientsSection;
