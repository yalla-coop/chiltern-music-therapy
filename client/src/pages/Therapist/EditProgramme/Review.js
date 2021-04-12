import { useState, useEffect } from 'react';

import moment from 'moment';
import {
  GoBack,
  Typography as T,
  Button,
  Grid,
  Inputs,
  Cards,
  Modal,
} from '../../../components';

import validate from '../../../validation/schemas/programme';

import * as S from './style';

import { Programmes, Contents } from '../../../api-calls';
import {
  decideBorder,
  isEmptyObject,
  decideStreamable,
} from '../../../helpers';

const { Row, Col } = Grid;
const { Textarea } = Inputs;
const { Basic, Expandable } = Cards;

const Review = ({ navFunctions, states, programmeId }) => {
  const [updating, setUpdating] = useState(false);
  const [modalToShow, setModalToShow] = useState('');
  const [contentToDelete, setContentToDelete] = useState('');
  const [updateError, setUpdateError] = useState('');

  // form submission
  const [submitAttempt, setSubmitAttempt] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    description,
    setDescription,
    programmeContents,
    categoryOptions,
    setProgrammeContents,
    errors,
    setErrors,
  } = states;

  const updateSingleContent = (value) => {
    setProgrammeContents(
      programmeContents.map((el) => {
        if (el.id === value.id) {
          return Object.assign({}, el, { ...el, ...value });
        }
        return el;
      })
    );
  };

  const handleRemove = async ({ id: contentId }) => {
    const isExistingContent = programmeContents.filter(
      (content) => contentId === content.id
    )[0].existingContent;

    const newProgrammeContents = programmeContents.filter((el) => {
      return el.id !== contentId;
    });
    // check if content has already an id
    // yes? api call to remove from programme and pop from state array
    // no? just pop from state
    if (isExistingContent) {
      setUpdating(true);
      const { data, error } = await Contents.removeContentFromProgramme({
        contentId,
        programmeId,
      });
      if (error) {
        setUpdateError(error.message || 'Server request error');
        setModalToShow('error');
      } else {
        setProgrammeContents(newProgrammeContents);
        setModalToShow('removeCompletelySuccess');
      }
      setUpdating(false);
    }
  };

  const renderEditCards = (array) => {
    if (array.length > 0) {
      return array.map((content, idx) => {
        return (
          <Col w={[4, 6, 4]} mb="4" key={idx}>
            <Expandable
              borderColor={decideBorder(content.type)}
              content={{
                ...content,
                id: content.id,
                download: content.file.url,
                streamable: decideStreamable(content.type, content.file.url),
                categories: content.categories.filter((cat) => cat !== null),
                type: content.type?.toLowerCase(),
                url: content.file.url,
                validationErrs: errors && errors[`content[${idx}]`],
              }}
              remove={handleRemove}
              withDate
              actions
              editing
              handleInput={updateSingleContent}
              categoryOptions={categoryOptions.filter(
                (opt) => opt.value !== 'ALL'
              )}
              review
            />
          </Col>
        );
      });
    }
  };

  const validateForm = () => {
    try {
      const formData = {
        content: programmeContents,
        description,
        part: 'review',
      };
      validate(formData);

      if (programmeContents.length === 0) {
        setErrors('Please add content to this programme');
      } else {
        setErrors({});
      }

      return true;
    } catch (error) {
      if (error.name === 'ValidationError') {
        setErrors({ ...errors, ...error.inner });
      }
      return false;
    }
  };
  console.log(`errors`, errors);
  useEffect(() => {
    if (programmeContents.length === 0) {
      setErrors('Please add content to this programme');
    } else {
      setErrors({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [programmeContents]);

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
      handleEditProgramme();
    }
  };

  const handleEditProgramme = async () => {
    // navFunctions.goToSuccess();
    console.log(`success`);

    // const { error, data } = await Programmes.editProgramme({
    //   programmeId,
    //   description,
    //   programmeContents,
    // });
    // setLoading(false);
    // if (error) {
    //   setErrors(error.message);
    // } else {
    //   navFunctions.goToSuccess();
    // }
  };
  // console.log(`programmeContents`, programmeContents)r;
  return (
    <>
      {/* TODO UPDATE GOBACK */}
      {/* <GoBack customFn={navFunctions.goToAddContent} /> */}
      <Row mt={5}>
        <Col w={[4, 12, 12]}>
          <S.HeadlineWrapper>
            <T.H1 color="gray10">
              <strong>Edit</strong> Programme
            </T.H1>
          </S.HeadlineWrapper>
        </Col>
      </Row>
      <Row mt={5} mb={7}>
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
      {updating ? (
        <Row mb="4">
          <Col w={[4, 6, 4]} mb="4">
            Loading...
          </Col>
        </Row>
      ) : (
        <Row mb="4">
          {programmeContents.length > 0 ? (
            renderEditCards(programmeContents)
          ) : (
            <Col w={[4, 6, 4]}>
              <Basic>No content to show</Basic>
            </Col>
          )}
        </Row>
      )}

      {/* <Row mt={7}>{renderReviewCards(content)}</Row> */}
      {/* {errors && typeof errors === 'string' && (
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
      )} */}
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

      {/* ERROR */}
      <Modal
        type="error"
        visible={modalToShow === 'error'}
        setIsModalVisible={(e) => !e && setModalToShow('')}
        error={updateError}
      />
    </>
  );
};

export default Review;
