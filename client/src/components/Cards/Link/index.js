import * as S from './style';
import * as T from '../../Typography';
import Image from '../../Image';
import Icon from '../../Icon';
import { dateFormatter } from '../../../helpers';

const Link = ({
  to,
  title,
  variant,
  m,
  children,
  programme,
  client,
  borderColor,
}) => {
  switch (variant) {
    case 'graphic1':
      return (
        <S.Link to={to}>
          <S.GraphicWrapper {...m}>
            <S.Title>
              <T.P weight="light" mr="1">
                My
              </T.P>
              <T.P weight="bold">{title}</T.P>
            </S.Title>
            <Image
              image="blueCircles"
              style={{ position: 'absolute', bottom: '-10px', right: '-35px' }}
              alt="circles"
            />
            <Image
              image="greenCircles"
              style={{ position: 'absolute', bottom: '-40px', left: '-45px' }}
              alt="circles"
            />
          </S.GraphicWrapper>
        </S.Link>
      );
    case 'graphic2':
      return (
        <S.Link to={to}>
          <S.GraphicWrapper {...m}>
            <S.Title>
              <T.P weight="light" mr="1">
                My
              </T.P>
              <T.P weight="bold">{title}</T.P>
            </S.Title>
            <Image
              image="orangeCircles"
              style={{ position: 'absolute', top: '-30px', right: '-35px' }}
              alt="circles"
            />
            <Image
              image="pinkCircles"
              style={{ position: 'absolute', bottom: '-70px', left: '15px' }}
              alt="circles"
            />
          </S.GraphicWrapper>
        </S.Link>
      );
    case 'graphic3':
      return (
        <S.Link to={to}>
          <S.GraphicWrapper {...m}>
            <S.Title>
              <T.P weight="light" mr="1">
                Client
              </T.P>
              <T.P weight="bold">{title}</T.P>
            </S.Title>
            <Image
              image="orangeCircles"
              style={{ position: 'absolute', top: '-30px', right: '-35px' }}
              alt="circles"
            />
            <Image
              image="pinkCircles"
              style={{ position: 'absolute', bottom: '-70px', left: '15px' }}
              alt="circles"
            />
          </S.GraphicWrapper>
        </S.Link>
      );
    case 'programme':
      return (
        <S.Link to={to}>
          <S.Wrapper {...m} borderColor={borderColor}>
            <Icon icon="programme" width="40px" height="40px" mr="4" />
            <S.ProgDetails>
              <T.P color="gray8" caps>
                {programme?.date ? dateFormatter(programme.date) : 'N/A'}
              </T.P>
              <T.P weight="light" mr="1">
                View <span style={{ fontWeight: 'bold' }}>programme</span>
              </T.P>
            </S.ProgDetails>
          </S.Wrapper>
        </S.Link>
      );
    case 'client':
      return (
        <S.Link to={to}>
          <S.Wrapper {...m} borderColor={borderColor}>
            {client ? (
              <T.P weight="light" mr="1">
                <span style={{ fontWeight: 'bold' }}>
                  {client.firstInitial}
                </span>{' '}
                {client.secondInitial} {client.postcode}
              </T.P>
            ) : (
              <T.P weight="light">N/A</T.P>
            )}
          </S.Wrapper>
        </S.Link>
      );
    default:
      return (
        <S.Link to={to}>
          <S.Wrapper {...m}>{children}</S.Wrapper>
        </S.Link>
      );
  }
};

export default Link;
