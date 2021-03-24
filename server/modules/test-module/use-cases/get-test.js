import * as Test from '../model';

const getTest = () => {
  return Test.findTestById({ testId: 1 });
};

export default getTest;
