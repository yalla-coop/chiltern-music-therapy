import * as User from '../use-cases';

const createTherapistProfile = async (req, res, next) => {
  const { id } = req.user;
  try {
    const updatedUser = await User.createTherapistProfile({
      accountData: req.body,
      id,
    });
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export default createTherapistProfile;
