import dotenv from 'dotenv';
import createUsers from './users';
import createOrganisations from './organisations';
import createMedia from './media';
import createViewAccesses from './view-accesses';
import createTherapistClients from './therapist-clients';
import createProgrammes from './programmes';
import createProgressUpdates from './progress-updates';
import createProgrammesFeedbacks from './programmes-feedbacks';
import createContents from './contents';
import createProgrammesContents from './programmes-contents';
import createContentCategories from './content-categories';
import createContentsContentCategories from './contents-content-categories';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const buildData = async () => {
  const createdData = {};
  createdData.organisations = await createOrganisations(createdData);
  createdData.users = await createUsers(createdData);
  createdData.media = await createMedia(createdData);
  createdData.viewAccesses = await createViewAccesses(createdData);
  createdData.therapistClients = await createTherapistClients(createdData);
  createdData.programmes = await createProgrammes(createdData);
  createdData.progressUpdates = await createProgressUpdates(createdData);
  createdData.programmesFeedbacks = await createProgrammesFeedbacks(
    createdData,
  );
  createdData.contents = await createContents(createdData);
  createdData.programmesContents = await createProgrammesContents(createdData);
  createdData.contentCategories = await createContentCategories(createdData);
  createdData.contentsContentCategories = await createContentsContentCategories(
    createdData,
  );

  return createdData;
};

export default buildData;
