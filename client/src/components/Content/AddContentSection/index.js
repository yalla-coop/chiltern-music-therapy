import { useState } from 'react';

import { Grid, Typography as T, Inputs, Modal } from '../../';
import { AddContentType } from '../../Cards';
import Icon from '../../Icon';
import * as S from './style';

import { content } from '../../../constants';

const { Col } = Grid;
const { Dropdown } = Inputs;

const { fileCategories } = content;

const AddContentSection = ({
  m,
  content,
  libraryContent = {},
  setLibraryContent,
  navFunctions,
}) => {
  const [duplicateError, setDuplicateError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { data: libraryContentData = [], error = null } = libraryContent;

  const createLibraryContentDropdownValues = (arr) =>
    arr.map((el) => {
      const res = { label: el.title, value: el.id };
      return res;
    });

  const modifiedLibraryContent = content.filter((el) => el.libraryContent);

  // create new library content when user starts to add / remove content
  // take old content and new content and only use unique values
  const decicedLibraryContent =
    modifiedLibraryContent.length > 0
      ? [
          ...new Map(
            libraryContentData
              .concat(modifiedLibraryContent)
              .map((el) => [el.id, el])
          ).values(),
        ]
      : libraryContentData;

  const handleSubmitLibraryContent = (val) => {
    const selectLibraryContent = decicedLibraryContent.filter(
      (el) => el.id === val
    );
    const duplicates = content.filter((el) => el.id === val);

    if (duplicates.length > 0) {
      setDuplicateError(
        'This piece of content has already been added to your programme. Please select another one.'
      );
    } else if (selectLibraryContent.length > 0) {
      setLibraryContent(selectLibraryContent[0]);
      setDuplicateError(null);
      setIsModalVisible(true);
    }
    return false;
  };

  const modalParentFunction = (type) =>
    type === 'addMoreContent'
      ? navFunctions.goToAddContent()
      : navFunctions.goToReview();

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
          error={duplicateError || error}
          options={createLibraryContentDropdownValues(decicedLibraryContent)}
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
        {Object.keys(fileCategories)
          .filter((cat) => cat !== 'image')
          .map((category, i) => (
            <Col mb={5} w={[4, 9, 4]}>
              <AddContentType
                navFunctions={navFunctions}
                contentType={category}
              />
            </Col>
          ))}
      </S.CardsWrapper>
    </S.Wrapper>
  );
};

export default AddContentSection;
