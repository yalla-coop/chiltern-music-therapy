import { query } from '../../../database';

const findContentByProg = async (id) => {
  const values = [id];

  const sql = `
    SELECT
    c.title,
    c.instructions,
    c.link,
    c.type,
    m.file_name,
    m.path,
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
    GROUP BY c.id, m.file_name, m.path, tc.therapist_user_id, tc.client_user_id
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
      m.file_name,
      m.path,
      tc.therapist_user_id,
      ARRAY_AGG (cc.text) categories,
      jsonb_agg(jsonb_build_object('value', cc.text, 'categoryId', cc.id)) as categories_editable
    FROM contents c
    INNER JOIN programmes_contents pc ON pc.content_id = c.id
    INNER JOIN programmes p ON pc.programme_id = p.id
    INNER JOIN therapist_clients tc ON p.therapists_clients_id = tc.id
    LEFT JOIN media m ON c.media_id = m.id
    JOIN contents_content_categories ccc ON ccc.content_id = c.id
    LEFT JOIN content_categories cc ON cc.id = ccc.category_id
    WHERE tc.therapist_user_id = $1 AND c.library_content = true
    GROUP BY c.id, m.file_name, m.path, tc.therapist_user_id
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
      m.file_name,
      m.path,
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
    GROUP BY c.id, m.file_name, m.path, tc.therapist_user_id, u.first_name, u.last_name
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

export {
  findLibraryContent,
  findLibraryContentAdmin,
  findCategoriesByTherapist,
  findCategoriesAdmin,
  findContentByProg,
};
