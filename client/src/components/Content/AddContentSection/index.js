import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Grid, Typography as T, Inputs, Modal } from '../../';
import { AddContentType } from '../../Cards';
import Icon from '../../Icon';
import * as S from './style';

import { content, navRoutes } from '../../../constants';

const { Col } = Grid;
const { Dropdown } = Inputs;

const { fileCategories } = content;

const AddContentSection = ({
  m,
  content,
  libraryContent = [],
  setLibraryContent,
  mode,
}) => {
  const [duplicateError, setDuplicateError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const history = useHistory();

  const renderLibraryContentDropdownValues = libraryContent.map((el) => {
    const res = { label: el.title, value: el.id };
    return res;
  });

  const handleSubmitLibraryContent = async (val) => {
    const selectLibraryContent = libraryContent.filter((el) => el.id === val);
    const duplicates = content.filter((el) => el.id === val);

    if (duplicates.length > 0) {
      setDuplicateError(
        'This piece of content has already been added to your programme. Please select another one.'
      );
    } else if (selectLibraryContent.length > 0) {
      setLibraryContent(selectLibraryContent[0]);
      setIsModalVisible(true);
    }
    return false;
  };

  const modalParentFunction = (type) =>
    type === 'addMoreContent'
      ? history.push(navRoutes.THERAPIST.CREATE_PROGRAMME_CONTENT)
      : history.push(navRoutes.THERAPIST.CREATE_PROGRAMME_REVIEW);

  return (
    <S.Wrapper>
      <Modal
        visible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        type="addSuccess"
        parentFunc={modalParentFunction}
      />
      <Col mt={5} mb={5} w={[4, 9, 4]}>
        <T.P weight color="gray9" mb={2}>
          Add content from My Library
        </T.P>
        <Dropdown
          // TODO add get content error
          error={duplicateError}
          options={renderLibraryContentDropdownValues}
          multi={false}
          placeholder="Select one..."
          handleChange={(value) => handleSubmitLibraryContent(value)}
        />
        <S.IconWrapper>
          <Icon icon="or" />
        </S.IconWrapper>
      </Col>

      <T.P weight color="gray9" mt={3} mb={2} ml={3}>
        Add new content
      </T.P>
      {/* Adds content type buttons */}
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
