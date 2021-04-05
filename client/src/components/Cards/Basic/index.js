import * as S from './style';
import * as T from '../../Typography';
import { navRoutes } from '../../../constants';

const Basic = ({ children, variant, therapistInfo, m }) => {
  const textInfoShort = [
    'Open your camera app',
    "Press record and stop when you're finished",
    'Click the upload button below and find your new video (in your Media or Camera folder)',
  ];

  const textInfoLongOption1 = [
    'Open Photo Booth (on Apple) or Camera (on Windows)',
    'Press record and stop when you’re finished',
    'Click the upload button below and find your new video (in your Photo Booth Library or Pictures folder)',
  ];

  const textInfoLongOption2 = [
    <>
      Use a tool like
      <T.Link external to="https://www.loom.com" weight="bold" ml="1" mr="1">
        Loom
      </T.Link>
      and follow their install instructions
    </>,
    'Once you’re finished click to download the video',
    'Click the upload button below and find your new video wherever you chose to download it',
    'If using a third party tool always make sure to check the privacy settings and to be safe always delete the video after you have downloaded it',
  ];

  switch (variant) {
    case 'therapistInfo':
      return (
        <S.Wrapper {...m}>
          <T.P weight="light" color="gray8" mb="1">
            My therapist
          </T.P>
          <T.P weight="bold" color="gray10" mb="4">
            {therapistInfo?.firstName} {therapistInfo?.lastName}
          </T.P>
          <S.Links>
            <T.Link
              to={navRoutes.CLIENT.MY_THERAPIST}
              weight="light"
              mr="2"
              mb="2"
            >
              View biography
            </T.Link>
            <T.Link
              to={navRoutes.CLIENT.CONTACT_THERAPIST}
              weight="light"
              mb="2"
            >
              Contact therapist
            </T.Link>
          </S.Links>
        </S.Wrapper>
      );
    case 'textInfoShort':
      return (
        <S.Wrapper {...m}>
          <T.H4 bold color="gray10" mb="4">
            On your phone or tablet
          </T.H4>
          {textInfoShort.map((point, index) => (
            <S.Point
              key={index}
              mb={index + 1 < textInfoShort.length ? '4' : '0'}
            >
              <T.P color="gray9" mr="2">
                {index + 1}.
              </T.P>
              <T.P color="gray8">{point}</T.P>
            </S.Point>
          ))}
        </S.Wrapper>
      );
    case 'textInfoLong':
      return (
        <S.Wrapper {...m}>
          <T.H4 bold color="gray10" mb="5">
            On your phone or tablet
          </T.H4>
          <T.P weight="bold" color="gray9" mb="4">
            Option 1
          </T.P>
          {textInfoLongOption1.map((point, index) => (
            <S.Point
              key={index}
              mb={index + 1 < textInfoShort.length ? '4' : '5'}
            >
              <T.P color="gray9" mr="2">
                {index + 1}.
              </T.P>
              <T.P color="gray8">{point}</T.P>
            </S.Point>
          ))}
          <T.P weight="bold" color="gray9" mb="4">
            Option 2
          </T.P>
          {textInfoLongOption2.map((point, index) => (
            <S.Point
              key={index}
              mb={index + 1 < textInfoShort.length ? '4' : '0'}
            >
              <T.P color="gray9" mr="2">
                {index + 1}.
              </T.P>
              <T.P color="gray8">{point}</T.P>
            </S.Point>
          ))}
        </S.Wrapper>
      );
    case 'noProgrammes':
      return (
        <S.Wrapper {...m} p="20px 30px">
          <T.P weight="light" color="gray10" mb="1" ta="center">
            No home programmes added yet.
          </T.P>
          <T.P weight="bold" color="gray10" ta="center">
            Check back soon!
          </T.P>
        </S.Wrapper>
      );
    case 'noClients':
      return (
        <S.Wrapper {...m} p="20px 30px">
          <T.P weight="light" color="gray10" mb="1" ta="center">
            You don't have any clients yet.
          </T.P>
          <T.P weight="bold" color="gray10" ta="center">
            Add a client below
          </T.P>
        </S.Wrapper>
      );
    default:
      return <S.Wrapper {...m}>{children}</S.Wrapper>;
  }
};

export default Basic;
