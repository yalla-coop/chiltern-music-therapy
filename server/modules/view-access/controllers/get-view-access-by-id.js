import * as ViewAccess from '../use-cases';

const getViewAccessesById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const viewAccess = await ViewAccess.getViewAccessesById({ id });
    res.json(viewAccess);
  } catch (error) {
    next(error);
  }
};

export default getViewAccessesById;
