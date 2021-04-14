import { expect } from 'chai';
import request from 'supertest';
import { build, query } from '../../../database';
import { createTestToken } from '../../../helpers';
import app from '../../../app';

let builtData;
describe('Test update programme api', () => {
  before(async () => {
    builtData = await build();
  });

  it('test with valid request', () => {
    const { users, contents, contentCategories, programmes } = builtData;

    const userId = users.therapist1.id;

    const token = createTestToken({ id: userId }, true);

    // tests request that updates description and content of a programme

    const updateRequest = {
      programmeId: programmes.programme1.id,
      description: 'Updated description of this programme ',
      programmeContents: [
        {
          id: contents.content4.id,
          title: 'Updated Title of this library doc',
          instructions: 'updated instructions of this library doc',
          link: null,
          type: 'DOCUMENT',
          libraryContent: false,
          docContent: null,
          therapistUserId: 4,
          clientUserId: 1,
          categories: [],
          existingContent: true,
        },
        // NEW DOC WITH UPLOADED FILE (MEDIA) AND ADDED CATS
        {
          type: 'document',
          title: 'Test doc with media content',
          categories: [contentCategories.category1.id, 'new category 2'],
          libraryContent: false,
          instructions: 'this is a test message',
          uploadedFileInfo: {
            url:
              'https://testingthisstuff.s3.eu-west-2.amazonaws.com/4/application/pdf-5925f029-13bc-4153-87fd-b438f598da7a-test-doc.pdf?Content-Type=application%2Fpdf',
            name: 'test-doc.pdf',
            key:
              '4/application/pdf-5925f029-13bc-4153-87fd-b438f598da7a-test-doc.pdf',
            bucketRegion: 'eu-west-2',
            bucket: 'testingthisstuff',
            new: true,
            size: 25300,
            fileType: 'application/pdf',
            uploadedToS3: true,
          },
          link: '',
          docContent: '',
        },
      ],
    };

    const libraryContent = updateRequest.programmeContents[0];
    const newDocMedia = updateRequest.programmeContents[1];

    request(app)
      .patch('/api/programmes/update')
      .set('Cookie', [token])
      .send(updateRequest)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(async (err) => {
        // check if programme was updated
        const foundProgramme = await query(
          `
            SELECT * FROM programmes WHERE description = '${updateRequest.description}'
            `,
        );

        expect(typeof foundProgramme.rows[0].id).to.equal('number');

        // check if new contents got created
        const foundDoc = await query(
          `
            SELECT * FROM contents WHERE title = '${newDocMedia.title}'
            `,
        );

        expect(typeof foundDoc.rows[0].id).to.equal('number');
        expect(typeof foundDoc.rows[0].mediaId).to.equal('number');

        // check if media got created
        const foundMedia = await query(
          `SELECT * FROM media WHERE id = ${foundDoc.rows[0].mediaId}`,
        );

        expect(typeof foundMedia.rows[0].id).to.equal('number');
        expect(foundMedia.rows[0].fileName).to.equal(
          newDocMedia.uploadedFileInfo.name,
        );

        // check if exisitng content got updated
        const foundLibrary = await query(
          `SELECT * FROM contents WHERE id = ${libraryContent.id}`,
        );
        expect(foundLibrary.rows[0].instructions).to.equal(
          libraryContent.instructions,
        );

        // check if programmes_contents got updated
        const foundProgrammesContents = await query(
          `SELECT * FROM programmes_contents WHERE programme_id = ${updateRequest.programmeId}`,
        );

        expect(
          foundProgrammesContents.rows
            .map((el) => el.contentId)
            .includes(foundLibrary.rows[0].id),
        ).to.equal(true);
        expect(
          foundProgrammesContents.rows
            .map((el) => el.contentId)
            .includes(foundDoc.rows[0].id),
        ).to.equal(true);

        // check if contents_categories got updated (new ones added non-used ones removed)

        const foundNewContentCategory = await query(
          `SELECT * FROM content_categories WHERE text = '${newDocMedia.categories[1]}'`,
        );

        expect(foundNewContentCategory.rows[0].text).to.equal(
          newDocMedia.categories[1],
        );

        // check if conents_content_categories got created / updated
        const categoriesLibraryContent = await query(
          `SELECT * FROM contents_content_categories WHERE content_id = ${libraryContent.id}`,
        );
        // should be 0
        expect(categoriesLibraryContent.rows.length).to.equal(
          libraryContent.categories.length,
        );

        // check if new content categories got created
        const categoriesDocContent = await query(
          `SELECT * FROM contents_content_categories WHERE content_id = ${foundDoc.rows[0].id}`,
        );

        expect(categoriesDocContent.rows.length).to.equal(
          newDocMedia.categories.length,
        );
        return err;
      });
  });
});
