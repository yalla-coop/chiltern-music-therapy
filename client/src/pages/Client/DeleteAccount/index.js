import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import * as S from './style';
import * as T from '../../../components/Typography';
import { Row, Col } from '../../../components/Grid';
import Button from '../../../components/Button';

import { Users } from '../../../api-calls';
import Title from '../../../components/Title';
import { navRoutes } from './../../../constants';

import { useAuth } from '../../../context/auth';

const DeleteClientAccount = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { logout: logoutApi } = useAuth();

  const onClick = async () => {
    setLoading(true);

    const { error } = await Users.deleteMyAccount();
    if (!error) {
      setLoading(false);
      setError('');
      await logoutApi();
      history.push(navRoutes.GENERAL.ACCOUNT_DELETED_SUCCESS);
    } else {
      setError('Error deleting your account');
      setLoading(false);
    }
  };
  return (
    <S.Wrapper>
      <Title boldSection="Delete" lightSection="Account" boldFirst />

      <Row mb="6" mt="5">
        <Col w={[4, 8, 8]}>
          <T.P color="gray8">
            Are you sure you want to delete your account? This cannot be undone
            and all content will be deleted. You can speak to your therapist if
            there is any specific content you would like deleted
          </T.P>
        </Col>
      </Row>
      {error && (
        <Row mb="4">
          <Col w={[4, 8, 4]}>
            <T.P color="secondary">{error}</T.P>
          </Col>
        </Row>
      )}
      <Row>
        <S.ButtonWrapper>
          <Col w={[4, 6, 4]}>
            <Button
              handleClick={onClick}
              text="Confirm and delete account"
              variant="primary"
              loading={loading}
            />
          </Col>
        </S.ButtonWrapper>
      </Row>
    </S.Wrapper>
  );
};

export default DeleteClientAccount;
