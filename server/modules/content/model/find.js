import { query } from '../../../database';

const findContentByProgId = async (id) => {
  const values = [id];

  const sql = `
    SELECT 
    c.title,
    c.instructions,
    c.link,
    m.file_name,
    m.file-type
    FROM content c
    INNER JOIN programme_contents pc ON pc.content_id = c.id
    INNER JOIN media m ON c.media_id = media.id
    WHERE pc.programme_id = $1
  `;

  const res = await query(sql, values);
  return res.rows;
};

export { findContentByProgId };
