import * as User from '../use-cases';
import { createToken } from '../../../helpers';

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.login({
      email,
      password,
    });

    const { token, tokenName, options } = createToken({ id: user.id });
    res.cookie(tokenName, token, options);

    res.json(user);
  } catch (error) {
    next(error);
  }
};

export default login;
