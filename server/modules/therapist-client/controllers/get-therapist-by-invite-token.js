import * as TherapistClient from '../use-cases';

const getTherapistByInviteToken = async (req, res, next) => {
  const { token } = req.params;
  try {
    const therapist = await TherapistClient.getTherapistByInviteToken({
      inviteToken: token,
    });
    res.json(therapist);
  } catch (error) {
    next(error);
  }
};

export default getTherapistByInviteToken;
