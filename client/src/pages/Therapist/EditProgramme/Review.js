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

const { Row, Col } = Grid;
const { Textarea } = Inputs;
const { Expandable } = Cards;

const Review = ({ navFunctions }) => {
  console.log(`object`);
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
      <Row mt={5}>
        <Col w={[4, 6, 6]}>
          <Textarea
            label="Programme description"
            placeholder="Programme description..."
            rows={5}
            // value={description}
            // handleChange={(val) => SET_DESCRIPTION(val)}
            // error={errors && errors.description}
          />
        </Col>
      </Row>

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
            // onClick={handleSubmit}
            // loading={loading}
          />
        </Col>
      </Row>
    </>
  );
};

export default Review;
