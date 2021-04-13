import * as User from '../use-cases';

const updateAccount = async (req, res, next) => {
  const { id, role } = req.user;
  try {
    const updatedUser = await User.updateAccount({
      accountData: req.body,
      id,
      role,
    });
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export default updateAccount;
