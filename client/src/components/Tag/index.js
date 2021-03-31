import * as S from './style';
import { P } from '../Typography';
const Tag = (props) => (
  <S.Div {...props}>
    <P color="gray8">{props.text}</P>
  </S.Div>
);

export default Tag;
