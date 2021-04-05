import * as models from './models';
import init from './init';

import buildData from './dummy-data';

// development data build
const build = async () => {
  await init.createTypes();
  await init.createAutoTimestamps();
  await init.buildMigrations();

  await models.organisations.createTable();
  await models.media.createTable();
  await models.users.createTable();
  await models.viewAccesses.createTable();
  await models.therapistClients.createTable();
  await models.programmes.createTable();
  await models.progressUpdates.createTable();
  await models.programmesFeedback.createTable();
  await models.contents.createTable();
  await models.programmesContents.createTable();
  await models.contentCategories.createTable();
  await models.contentsContentCategories.createTable();

  await init.addRefs();

  // build dummy data
  const createdData = await buildData();
  return createdData;
};

export default build;
