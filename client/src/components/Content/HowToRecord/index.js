import {
  GoBack,
  Typography as T,
  Button,
  Grid,
  Inputs,
  FileUpload,
} from '../../../components';
import Icon from '../../Icon';
import ExpandableHowToRecord from '../../Cards/Expandable/HowToRecord';
import * as S from './style';

const { Row, Col } = Grid;
const { BasicInput, Textarea, Dropdown, Checkbox } = Inputs;

const AddSingleContent = ({}) => {
  return (
    <S.Wrapper>
      <GoBack />
      <Row mt={5} mb={7}>
        <Col w={[4, 12, 12]}>
          <T.H1 color="gray10">
            <strong>How to</strong> Record
          </T.H1>
        </Col>
      </Row>
      <Row>
        <Col w={[4, 9, 4]} mbM={5} mbT={5}>
          <ExpandableHowToRecord
            device="phone or tablet"
            variant="textInfoShort"
          />
        </Col>
        <Col w={[4, 9, 4]} mbM={5} mbT={5}>
          <ExpandableHowToRecord device="computer" variant="textInfoLong" />
        </Col>
      </Row>
    </S.Wrapper>
  );
};

export default AddSingleContent;
