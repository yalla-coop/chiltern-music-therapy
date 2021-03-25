import * as Test from '../use-cases';

const getTest = async (req, res, next) => {
  try {
    const testData = await Test.getTest();
    res.json(testData);
  } catch (error) {
    next(error);
  }
};

export default getTest;
