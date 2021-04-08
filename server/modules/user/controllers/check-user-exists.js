import * as User from '../use-cases';

const checkUserExists = async (req, res, next) => {
  const { ...data } = req.body;

  console.log('test', data);
  try {
    await User.checkUserExists({
      data,
      type: data.type,
    });
    res.json();
  } catch (error) {
    next(error);
  }
};

export default checkUserExists;
