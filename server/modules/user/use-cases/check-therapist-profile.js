import * as User from '../model';

const checkTherapistProfile = async ({ id }) => {
  const profile = await User.findTherapistProfile(id);

  if (profile && profile.bio && profile.contactEmail) return true;

  return false;
};

export default checkTherapistProfile;
