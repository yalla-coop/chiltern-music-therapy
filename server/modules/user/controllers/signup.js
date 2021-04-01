import * as User from '../use-cases';
import { userRoles } from '../../../constants';
import { createToken } from '../../../helpers';

const signup = async (req, res, next) => {
  try {
    const { email, password, firstName, lastName, role } = req.body;

    let user;

    if (role === userRoles.CLIENT) {
      user = await User.clientSignup({
        email,
        password,
        firstName,
        lastName,
      });
    } else if (role === userRoles.THERAPIST) {
      user = await User.therapistSignup({
        email,
        password,
        firstName,
        lastName,
        role,
      });
    }

    const { token, tokenName, options } = createToken({ id: user.id });
    res.cookie(tokenName, token, options);

    res.json(user);
  } catch (error) {
    next(error);
  }
};

export default signup;
