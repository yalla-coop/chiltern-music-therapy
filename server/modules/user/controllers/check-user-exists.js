import * as User from '../use-cases';

const checkUserExists = async (req, res, next) => {
  const { ...data } = req.body;

  try {
    await User.checkUserExists({
      data,
      fields: data.fields,
    });
    res.json();
  } catch (error) {
    next(error);
  }
};

export default checkUserExists;
