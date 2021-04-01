import { GoBack, Typography as T } from '../../../components';

import * as S from './style';

const AddDescription = ({ state, actions }) => {
  return (
    <>
      <GoBack />
      <S.HeadlineWrapper>
        <T.H1 color="gray10">
          <strong>Add</strong> New Programme
        </T.H1>
      </S.HeadlineWrapper>
    </>
  );
};

export default AddDescription;
