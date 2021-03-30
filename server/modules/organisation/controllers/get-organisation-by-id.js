import * as Organisation from '../use-cases';

const getOrganisationById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const organisation = await Organisation.getOrganisationById({ id });
    res.json(organisation);
  } catch (error) {
    next(error);
  }
};

export default getOrganisationById;
