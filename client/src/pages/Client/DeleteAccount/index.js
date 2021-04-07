import { useHistory } from 'react-router-dom';

import * as S from './style';
import * as T from '../../../components/Typography';
import { Row, Col } from '../../../components/Grid';
import Button from '../../../components/Button';

import { Users } from '../../../api-calls';
import AccountDeleted from './AccountDeleted';
import Title from '../../../components/Title';
import { navRoutes } from './../../../constants';

const DeleteClientAccount = ({ clientHistory }) => {
  const history = useHistory();

  const onClick = async () => {
    const { error } = await Users.deleteMyAccount();
    if (!error) {
      history.push(navRoutes.CLIENT.ACCOUNT_DELETED);
    }
  };
  return (
    <S.Wrapper>
      <Title boldSection="Delete" lightSection="Account" boldFirst />

      <Row mb="6" mt="5">
        <Col w={[4, 12, 6]}>
          <T.P color="gray8">
            Are you sure you want to delete your account? This cannot be undone
            and all content will be deleted. You can speak to your therapist if
            there is any specific content you would like deleted
          </T.P>
        </Col>
      </Row>

      <Row mb="8">
        <Col w={[4, 12, 4]}>
          <Button
            handleClick={onClick}
            text="Confirm and delete account"
            variant="primary"
          />
        </Col>
      </Row>
    </S.Wrapper>
  );
};

export { AccountDeleted };
export default DeleteClientAccount;
