import * as TherapistClient from '../use-cases';

const createTherapistClient = async (req, res, next) => {
  const { id } = req.user;
  const {
    therapyBackground,
    therapyGoals,
    therapistBio,
    therapistIntro,
    email,
    firstName,
    lastName,
    postcodeLetters,
    mobileNumber,
    primaryMobileNumber,
  } = req.body;
  try {
    const newClient = await TherapistClient.createTherapistClient({
      therapistId: id,
      therapyBackground,
      therapyGoals,
      therapistBio,
      therapistIntro,
      email,
      firstName,
      lastName,
      postcode: postcodeLetters,
      mobileNumber,
      contactNumber: primaryMobileNumber,
    });

    res.json(newClient);
  } catch (error) {
    next(error);
  }
};

export default createTherapistClient;
