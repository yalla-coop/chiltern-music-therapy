import * as User from '../use-cases';

const getAccountInfo = async (req, res, next) => {
  const { id, role } = req.user;
  try {
    const accountInfo = await User.getAccountInfo({ id, role });
    res.json(accountInfo);
  } catch (error) {
    next(error);
  }
};

export default getAccountInfo;
