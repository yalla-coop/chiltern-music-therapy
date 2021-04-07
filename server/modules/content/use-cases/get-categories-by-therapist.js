import * as Content from '../model';

const getCategoriesByTherapist = async ({ id }) => {
  return Content.findCategoriesByTherapist({ id });
};

export default getCategoriesByTherapist;
