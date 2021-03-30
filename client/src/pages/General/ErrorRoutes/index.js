import * as S from './style';
import * as T from '../../../components/Typography';

const ErrorRoute = ({ status, title, msg }) => (
  <S.Wrapper>
    <T.H1 color="blue" mb="3">
      {status}
    </T.H1>
    <T.H3 color="gray" mb="5">
      {title}
    </T.H3>
    <T.P>{msg}</T.P>
  </S.Wrapper>
);

export default ErrorRoute;
