import { useState, useEffect } from 'react';

import moment from 'moment';
import {
  GoBack,
  Typography as T,
  Button,
  Grid,
  Inputs,
  Cards,
} from '../../../components';

import validate from '../../../validation/schemas/programme';

import * as S from './style';

import { Programmes } from '../../../api-calls';
import { decideBorder, isEmptyObject } from '../../../helpers';
import ExpandableProvider from '../../../context/expandable';

const { Row, Col } = Grid;
const { Textarea } = Inputs;
const { Expandable } = Cards;

const ReviewFinish = ({
  contentCategories,
  parentDescription,
  setContentState,
  setErrors,
  setLoading,
  content,
  errors,
  loading,
  navFunctions,
  clientId,
}) => {
  const [description, setDescription] = useState(parentDescription);
  const [submitAttempt, setSubmitAttempt] = useState(false);
  const { data: contentCategoriesData } = contentCategories;

  const updateContentItem = (value) => {
    setContentState(
      content.map((el) => {
        if (el.id === value.id) {
          return Object.assign({}, el, { ...el, ...value });
        }
        return el;
      })
    );
  };

  const removeContentItem = (value) => {
    setContentState(content.filter((el) => el.id !== value.id));
  };

  const validateForm = () => {
    try {
      const formData = {
        content,
        description,
        part: 'review',
      };
      validate(formData);

      if (content.length === 0) {
        setErrors('Please add content to this programme');
      } else {
        setErrors({});
      }

      return true;
    } catch (error) {
      if (error.name === 'ValidationError') {
        setErrors(error.inner);
      }
      return false;
    }
  };

  useEffect(() => {
    if (content.length === 0) {
      setErrors('Please add content to this programme');
    } else {
      setErrors({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  useEffect(() => {
    if (submitAttempt) {
      validateForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitAttempt(true);

    const isValid = validateForm();
    if (isValid) {
      handleCreateProgramme();
    }
  };

  const handleCreateProgramme = async () => {
    setLoading(true);

    const { error } = await Programmes.createProgramme({
      clientId,
      description,
      content,
    });
    setLoading(false);
    if (error) {
      setErrors(error.message);
    } else {
      navFunctions.goToSuccess();
    }
  };

  const renderReviewCards = (_content) => {
    if (_content.length > 0) {
      return _content.map((el, idx) => {
        const content = {
          ...el,
          idx,
          id: el.id,
          title: el.title,
          type: el.type.toLowerCase(),
          instructions: el.instructions,
          categories: el.categories,
          libraryContent: el.libraryContent,
          date: el.date || moment(),
          fileUpload: el.uploadedFileInfo,
          docContent: el.docContent,
          // get these from form validation above
          validationErrs: errors && errors[`content[${idx}]`],
        };
        return (
          <Col mb={5} w={[4, 6, 5]} key={el.id}>
            <Expandable
              borderColor={decideBorder(el.type)}
              content={content}
              editing
              withDate
              remove={removeContentItem}
              handleInput={updateContentItem}
              categoryOptions={contentCategoriesData}
              review
              index={idx + 1}
            />
          </Col>
        );
      });
    } else {
      return (
        <Col w={[4, 6, 6]}>
          <T.P bold color="gray8">
            No content added
          </T.P>
        </Col>
      );
    }
  };

  return (
    <>
      <GoBack customFn={navFunctions.goToAddContent} />
      <Row mt={5}>
        <Col w={[4, 12, 12]}>
          <S.HeadlineWrapper>
            <T.H1 color="gray10">
              <strong>Review</strong> And Finish
            </T.H1>
          </S.HeadlineWrapper>
        </Col>
      </Row>
      <Row mt={5}>
        <Col w={[4, 6, 6]}>
          <Textarea
            label="Programme description"
            placeholder="Programme description..."
            rows={5}
            value={description}
            handleChange={(val) => setDescription(val)}
            error={errors && errors.description}
          />
        </Col>
      </Row>
      <ExpandableProvider itemsNumbers={content.length}>
        <Row mt={7}>{renderReviewCards(content)}</Row>
      </ExpandableProvider>
      {errors && typeof errors === 'string' && (
        <Row mt={5}>
          <T.P bold color="pink">
            {errors}
          </T.P>
        </Row>
      )}
      {errors && !isEmptyObject(errors) && (
        <Row mt={5}>
          <T.P bold color="pink">
            Errors storing your programme. Please check if all inputs are filled
            in correctly.
          </T.P>
        </Row>
      )}
      <Row mt={7}>
        <Col w={[4, 6, 4]} mbM={5} mbT={5}>
          <Button
            variant="primary"
            text="Add more content"
            handleClick={navFunctions.goToAddContent}
          />
        </Col>
        <Col w={[4, 6, 4]}>
          <Button
            variant="secondary"
            text="Save Changes"
            type="submit"
            onClick={handleSubmit}
            loading={loading}
          />
        </Col>
      </Row>
    </>
  );
};

export default ReviewFinish;
