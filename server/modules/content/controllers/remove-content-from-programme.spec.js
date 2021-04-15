import { expect } from 'chai';
import request from 'supertest';
import { build, query } from '../../../database';
import { createTestToken } from '../../../helpers';
import app from '../../../app';

let builtData;
describe('Test remove content from programme api', () => {
  before(async () => {
    builtData = await build();
  });

  it('test with valid request -> remove content that is library content', (done) => {
    const { users, contents, programmes } = builtData;
    const userId = users.therapist1.id;

    const token = createTestToken({ id: userId }, true);

    // tests request that wants to delete library content from a programme

    const contentId = contents.content4.id;
    const programmeId = programmes.programme1.id;

    request(app)
      .delete(
        `/api/contents/remove-from-programme?contentId=${contentId}&programmeId=${programmeId}`,
      )
      .set('Cookie', [token])
      .expect('Content-Type', /json/)
      .expect(200)
      .end(async (err) => {
        // check if programmes_contents got updated
        const foundProgrammesContents = await query(
          `SELECT * FROM programmes_contents WHERE programme_id = ${programmeId}`,
        );

        expect(
          foundProgrammesContents.rows
            .map((el) => el.contentId)
            .includes(contentId),
        ).to.equal(false);

        done(err);
      });
  });

  it('test with valid request -> content that is not used anywhere else', (done) => {
    const { users, contents, programmes } = builtData;

    const userId = users.therapist1.id;

    const token = createTestToken({ id: userId }, true);

    // tests request that wants to delete library content from a programme
    const contentId = contents.content1.id;
    const programmeId = programmes.programme1.id;

    request(app)
      .delete(
        `/api/contents/remove-from-programme?contentId=${contentId}&programmeId=${programmeId}`,
      )
      .set('Cookie', [token])
      .expect('Content-Type', /json/)
      .expect(200)
      .end(async (err) => {
        // check if programmes_contents got updated
        const foundProgrammesContents = await query(
          `SELECT * FROM programmes_contents WHERE programme_id = ${programmeId}`,
        );

        expect(
          foundProgrammesContents.rows
            .map((el) => el.contentId)
            .includes(contentId),
        ).to.equal(false);

        // check if conents_content_categories got created / updated
        const foundContentContentsCategories = await query(
          `SELECT * FROM contents_content_categories WHERE content_id = ${contentId}`,
        );
        expect(foundContentContentsCategories.rowCount).to.equal(0);

        // check if content got deleted
        const foundContent = await query(
          `SELECT * FROM contents WHERE id = ${contentId}`,
        );
        expect(foundContent.rowCount).to.equal(0);

        // check if media got deleted
        const foundMedia = await query(
          `SELECT * FROM media WHERE id = ${contents.content1.mediaId}`,
        );

        expect(foundMedia.rowCount).to.equal(0);

        done(err);
      });
  });
});
