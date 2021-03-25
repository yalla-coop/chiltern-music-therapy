import * as models from './models';
import init from './init';

import buildData from './dummy-data';

// development data build
const build = async () => {
  await init.createTypes();
  await init.createAutoTimestamps();
  await init.buildMigrations();
  await models.testModel.createTable();
  // build dummy data
  const createdData = await buildData();
  return createdData;
};

export default build;
