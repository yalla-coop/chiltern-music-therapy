import { expect } from 'chai';
import { build } from '../../../database';
import * as find from './find';

// eslint-disable-next-line no-unused-vars
let createdData;

describe('findTestById()', () => {
  before(async () => {
    /* createdData = */ await build();
  });
  it('should return...', async () => {
    const user = await find.findTestById(1);
    expect(user.id).eq(1);
  });
});
