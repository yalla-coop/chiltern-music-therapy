import { Grid, Typography as T, Inputs } from '../../';
import { AddContentType } from '../../Cards';
import Icon from '../../Icon';
import * as S from './style';

import { content } from '../../../constants';

const { Col } = Grid;
const { Dropdown } = Inputs;

const { fileCategories } = content;

const AddContentSection = ({ m, mode, libraryContent = [], error }) => {
  // mode can be create / edit program

  // TODO make this dynamic
  libraryContent = [
    { label: 'Option 1 Super Long with Lots of Info', value: 'Option 1' },
    { label: 'Option 2', value: 'Option 2' },
  ];

  return (
    <S.Wrapper>
      <Col mt={5} mb={5} w={[4, 9, 4]}>
        <T.P weight color="gray9" mb={2}>
          Add content from My Library
        </T.P>
        <Dropdown
          error={error}
          options={libraryContent}
          multi={false}
          placeholder="Select one..."
        />
        <S.IconWrapper>
          <Icon icon="or" />
        </S.IconWrapper>
      </Col>

      <T.P weight color="gray9" mt={3} mb={2} ml={3}>
        Add new Content
      </T.P>

      <S.CardsWrapper {...m}>
        {Object.keys(fileCategories).map((category, i) => (
          <Col mb={5} w={[4, 9, 4]}>
            <AddContentType mode={mode} contentType={category} />
          </Col>
        ))}
      </S.CardsWrapper>
    </S.Wrapper>
  );
};

export default AddContentSection;
