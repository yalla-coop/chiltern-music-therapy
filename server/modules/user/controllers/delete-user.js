import * as User from '../use-cases';
import { TOKEN_NAME } from '../../../constants';

const deleteUser = async (req, res, next) => {
  try {
    const { id, role } = req.user;

    await User.deleteUser({ id, role });
    res.clearCookie(TOKEN_NAME);
    res.send();
  } catch (error) {
    next(error);
  }
};

export default deleteUser;
