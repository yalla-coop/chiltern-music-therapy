import { useHistory } from 'react-router-dom';
import { CLIENT, THERAPIST, ADMIN, GENERAL } from '../../constants/nav-routes';
import { useAuth } from '../../context/auth';

import * as S from './style';

const handleClick = (cb) => {
  if (typeof cb === 'function') {
    return cb(false);
  }
  return;
};

const LogoutRoute = ({ setOpen }) => {
  const history = useHistory();

  const { logout: logoutApi } = useAuth();
  return (
    <S.Link
      onClick={async () => {
        await logoutApi();
        handleClick(setOpen);
        history.push(GENERAL.LOGIN);
      }}
    >
      <S.Head4 weight="bold" color="gray8">
        Log
      </S.Head4>{' '}
      <S.Head4>out</S.Head4>
    </S.Link>
  );
};

export const ClientRoutes = ({ setOpen }) => {
  return (
    <>
      <S.Link to={CLIENT['DASHBOARD']} onClick={() => handleClick(setOpen)}>
        <S.Head4>My</S.Head4>{' '}
        <S.Head4 weight="bold" color="gray8">
          dashboard
        </S.Head4>
      </S.Link>
      <S.Link to={CLIENT['PROGRAMMES']} onClick={() => handleClick(setOpen)}>
        <S.Head4>My</S.Head4>{' '}
        <S.Head4 weight="bold" color="gray8">
          home programmes
        </S.Head4>
      </S.Link>
      <S.Link to={CLIENT['MY_THERAPIST']} onClick={() => handleClick(setOpen)}>
        <S.Head4>My</S.Head4>{' '}
        <S.Head4 weight="bold" color="gray8">
          therapist
        </S.Head4>
      </S.Link>
      <S.Link to={CLIENT['ACCOUNT']} onClick={() => handleClick(setOpen)}>
        <S.Head4>My</S.Head4>{' '}
        <S.Head4 weight="bold" color="gray8">
          account
        </S.Head4>
      </S.Link>
      <LogoutRoute setOpen={setOpen} />
    </>
  );
};

export const TherapistRoutes = ({ setOpen }) => (
  <>
    <S.Link to={THERAPIST['DASHBOARD']} onClick={() => handleClick(setOpen)}>
      <S.Head4>My</S.Head4>{' '}
      <S.Head4 weight="bold" color="gray8">
        dashboard
      </S.Head4>
    </S.Link>
    <S.Link to={THERAPIST['LIBRARY']} onClick={() => handleClick(setOpen)}>
      <S.Head4>My</S.Head4>{' '}
      <S.Head4 weight="bold" color="gray8">
        library
      </S.Head4>
    </S.Link>
    {/* TO BE ADDED ONCE FEEDBACK PAGES HAVE BEEN CREATED */}
    {/* <S.Link to={THERAPIST['FEEDBACK']} onClick={() => handleClick(setOpen)}>
      <S.Head4>My</S.Head4>{' '}
      <S.Head4 weight="bold" color="gray8">
        feedback
      </S.Head4>
    </S.Link> */}
    <S.Link to={THERAPIST['ACCOUNT']} onClick={() => handleClick(setOpen)}>
      <S.Head4>My</S.Head4>{' '}
      <S.Head4 weight="bold" color="gray8">
        account
      </S.Head4>
    </S.Link>
    <LogoutRoute setOpen={setOpen} />
  </>
);

export const AdminRoutes = ({ setOpen }) => (
  <>
    {/* TO BE ADDED ONCE FEEDBACK PAGES HAVE BEEN CREATED */}
    {/* <S.Link to={ADMIN['ALL_FEEDBACK']} onClick={() => handleClick(setOpen)}>
      <S.Head4>All</S.Head4>{' '}
      <S.Head4 weight="bold" color="gray8">
        feedback
      </S.Head4>
    </S.Link> */}
    <S.Link to={ADMIN['ALL_CONTENT']} onClick={() => handleClick(setOpen)}>
      <S.Head4>All</S.Head4>{' '}
      <S.Head4 weight="bold" color="gray8">
        content
      </S.Head4>
    </S.Link>
    <LogoutRoute setOpen={setOpen} />
  </>
);
