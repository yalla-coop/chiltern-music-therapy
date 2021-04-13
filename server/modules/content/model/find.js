import { query } from '../../../database';

const findContentByProg = async (id) => {
  const values = [id];

  const sql = `
    SELECT
    c.id,
    c.title,
    c.instructions,
    c.link,
    c.type,
    c.library_content,
    m.id AS "file.id",
    m.key AS "file.key",
    m.bucket AS "file.bucket",
    tc.therapist_user_id,
    tc.client_user_id,
    ARRAY_AGG (cc.text) categories
    FROM contents c
    INNER JOIN programmes_contents pc ON pc.content_id = c.id
    INNER JOIN programmes p ON pc.programme_id = p.id
    INNER JOIN therapist_clients tc ON p.therapists_clients_id = tc.id
    LEFT JOIN media m ON c.media_id = m.id
    LEFT JOIN contents_content_categories ccc ON ccc.content_id = c.id
    LEFT JOIN content_categories cc ON cc.id = ccc.category_id
    WHERE pc.programme_id = $1
    GROUP BY c.id, m.id, m.key, m.bucket, tc.therapist_user_id, tc.client_user_id
  `;

  const res = await query(sql, values);
  return res.rows;
};

const findLibraryContent = async ({ id }) => {
  const values = [id];

  const sql = `
    SELECT
      c.id,
      c.title,
      c.instructions,
      c.link,
      c.type,
      c.library_content,
      c.created_at "date",
      c.therapist_library_user_id "therapist_user_id",
      m.id AS "file.id",
      m.key AS "file.key",
      m.bucket AS "file.bucket",
      ARRAY_AGG (cc.text) categories
    FROM contents c
    LEFT JOIN media m ON c.media_id = m.id
    LEFT JOIN contents_content_categories ccc ON ccc.content_id = c.id
    LEFT JOIN content_categories cc ON cc.id = ccc.category_id
    WHERE c.therapist_library_user_id = $1 AND c.library_content = 'true'
    GROUP BY c.id, m.id
    `;

  const res = await query(sql, values);
  return res.rows;
};

const findLibraryContentAdmin = async () => {
  const values = [];

  const sql = `
    SELECT
      c.id,
      c.title,
      c.instructions,
      c.link,
      c.type,
      c.library_content,
      c.created_at "date",
      m.id AS "file.id",
      m.key AS "file.key",
      m.bucket AS "file.bucket",
      tc.therapist_user_id,
      u.first_name,
      u.last_name,
      ARRAY_AGG (cc.text) categories
    FROM contents c
    INNER JOIN programmes_contents pc ON pc.content_id = c.id
    INNER JOIN programmes p ON pc.programme_id = p.id
    INNER JOIN therapist_clients tc ON p.therapists_clients_id = tc.id
    INNER JOIN users u ON u.id = tc.therapist_user_id
    LEFT JOIN media m ON c.media_id = m.id
    LEFT JOIN contents_content_categories ccc ON ccc.content_id = c.id
    LEFT JOIN content_categories cc ON cc.id = ccc.category_id
    WHERE c.library_content = true
    GROUP BY c.id, m.id, tc.therapist_user_id, u.first_name, u.last_name
    `;

  const res = await query(sql, values);
  return res.rows;
};

const findCategoriesByTherapist = async ({ id }) => {
  const values = [id];

  const sql = `
    SELECT
      cat.text,
      cat.id
    FROM content_categories cat
    INNER JOIN contents_content_categories ccc ON cat.id = ccc.category_id
    INNER JOIN contents c ON ccc.content_id = c.id
    INNER JOIN users u ON u.id = c.therapist_library_user_id
    WHERE u.id = $1
    `;

  const res = await query(sql, values);
  return res.rows;
};

const findCategoriesAdmin = async () => {
  const values = [];

  const sql = `
    SELECT
      cat.text,
      cat.id
    FROM content_categories cat
    INNER JOIN contents_content_categories ccc ON cat.id = ccc.category_id
    INNER JOIN contents c ON ccc.content_id = c.id
    INNER JOIN users u ON u.id = c.therapist_library_user_id
    `;

  const res = await query(sql, values);
  return res.rows;
};

const findContentById = async (id, client) => {
  const values = [id];

  const sql = `
    SELECT
      *
    FROM contents
    WHERE id = $1
    `;

  const res = await query(sql, values, client);
  return res.rows[0];
};

const findContentByMediaId = async (id, client) => {
  const values = [id];

  const sql = `
    SELECT
      *
    FROM contents
    WHERE media_id = $1
    `;

  const res = await query(sql, values, client);
  return res.rows;
};

const findContentInProgrammes = async (contentId, client) => {
  const values = [contentId];

  const sql = `
    SELECT
      *
    FROM programmes_contents
    WHERE content_id = $1
    `;

  const res = await query(sql, values, client);
  return res.rows;
};

const findCategoriesByContent = async ({ id }) => {
  const values = [id];

  const sql = `
    SELECT
      cat.text,
      cat.id,
      ccc.id "content_cat_id"
    FROM content_categories cat
    INNER JOIN contents_content_categories ccc ON cat.id = ccc.category_id
    INNER JOIN contents c ON ccc.content_id = c.id
    WHERE c.id = $1
    `;

  const res = await query(sql, values);
  return res.rows;
};

const findProgrammeContentId = async ({ contentId, programmeId }, client) => {
  const values = [contentId, programmeId];

  const sql = `
    SELECT
      *
    FROM programmes_contents
    WHERE (content_id, programme_id) = ($1, $2)
    `;

  const res = await query(sql, values, client);
  return res.rows[0];
};

export {
  findLibraryContent,
  findLibraryContentAdmin,
  findCategoriesByTherapist,
  findCategoriesAdmin,
  findContentByProg,
  findContentById,
  findContentByMediaId,
  findContentInProgrammes,
  findCategoriesByContent,
  findProgrammeContentId,
};
