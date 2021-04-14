import { expect } from 'chai';
import request from 'supertest';
import { build, query } from '../../../database';
import { createTestToken } from '../../../helpers';
import app from '../../../app';

let builtData;
describe('Test create programme api', () => {
  before(async () => {
    builtData = await build();
  });

  it('test with valid request', (done) => {
    const { users, contents, contentCategories } = builtData;

    const userId = users.therapist1.id;

    const token = createTestToken({ id: userId }, true);

    const newProgrammeRequest = {
      clientId: users.client3.id,
      description: 'This is a testing description',
      content: [
        // library content with updated instructions and category
        {
          id: contents.content4.id,
          title: contents.content4.title,
          instructions:
            'This is an updated instruction to test updating existing content',
          link: null,
          docContent: null,
          type: 'document',
          libraryContent: true,
          date: contents.content4.updatedAt,
          therapistUserId: userId,
          categories: [
            contentCategories.category1.id,
            contentCategories.category3.id,
            'new category 1',
          ],
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
        // NEW VIDEO WITH LINK AND NO CATEGORIES
        {
          type: 'video',
          title: 'Test video with link',
          categories: [],
          libraryContent: false,
          instructions: 'Test message here',
          uploadedFileInfo: {},
          link: 'https://www.youtube.com/watch?v=gVuqP3rchBY',
          docContent: '',
        },
      ],
    };

    const libraryContent = newProgrammeRequest.content[0];
    const newDocMedia = newProgrammeRequest.content[1];
    const newVideoNoMedia = newProgrammeRequest.content[2];

    request(app)
      .post('/api/programmes/create')
      .set('Cookie', [token])
      .send(newProgrammeRequest)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(async (err) => {
        // check if programme was created

        const newProgramme = await query(
          `
          SELECT * FROM programmes WHERE description = '${newProgrammeRequest.description}'
          `,
        );

        expect(typeof newProgramme.rows[0].id).to.equal('number');

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
        const foundVideo = await query(
          `SELECT * FROM contents WHERE title = '${newVideoNoMedia.title}'`,
        );

        expect(typeof foundVideo.rows[0].id).to.equal('number');

        // check if programmes_contents got created
        const foundProgrammesContents = await query(
          `SELECT * FROM programmes_contents WHERE programme_id = ${newProgramme.rows[0].id}`,
        );

        expect(
          JSON.stringify(
            foundProgrammesContents.rows.map((el) => el.contentId),
          ),
        ).to.equal(
          JSON.stringify([
            foundLibrary.rows[0].id,
            foundDoc.rows[0].id,
            foundVideo.rows[0].id,
          ]),
        );
        // check if contents_categories got updated (new ones added non-used ones removed)
        const foundContentCategories = await query(
          `SELECT * FROM content_categories WHERE text = '${libraryContent.categories[2]}' OR text = '${newDocMedia.categories[1]}'`,
        );
        expect(
          JSON.stringify(foundContentCategories.rows.map((el) => el.text)),
        ).to.equal(
          JSON.stringify([
            newDocMedia.categories[1],
            libraryContent.categories[2],
          ]),
        );

        // check if conents_content_categories got created / updated
        const categoriesLibraryContent = await query(
          `SELECT * FROM contents_content_categories WHERE content_id = ${libraryContent.id}`,
        );
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

        done(err);
      });
  });
});
