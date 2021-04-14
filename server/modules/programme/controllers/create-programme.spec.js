import { expect } from 'chai';
import request from 'supertest';
import { build, query } from '../../../database';
import { createTestToken } from '../../../helpers';
import app from '../../../app';

let builtData;
describe.only('Test create programme api', () => {
  before(async () => {
    builtData = await build();
  });

  // add library content
  // update some categories (delete existing ones, add new ones)
  // add new content with media
  // add new content without media
  // add some categories (existing and new ones)

  it('test with valid request', (done) => {
    // console.log(`builtData`, builtData);
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
          id: 'c0d97aef-ebf8-44d6-87ef-79d81a9b7984',
          type: 'document',
          title: 'Test doc with media content',
          categories: [contentCategories.category1.id, 'new category 1'],
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
          id: '3c58e66e-bc9b-4884-bb53-751abbb8fb4f',
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

    request(app)
      .post('/api/programmes/create')
      .set('Cookie', [token])
      .send(newProgrammeRequest)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        console.log(`res`, res);
        done(err);
      });
  });
});
