import * as T from '../../Typography';
import Button from '../../Button';
import * as S from './style';
import { content } from '../../../constants';

const { fileCategories } = content;

const Add = ({ m }) => {
  return (
    <S.Wrapper {...m}>
      {Object.keys(fileCategories).map((category, i) => (
        <Button text={category}></Button>
      ))}
    </S.Wrapper>
  );
};

export default Add;
