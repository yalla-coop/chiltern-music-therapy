import { query } from '../../../database';

const updateContentById = async (
  { contentId, title, instructions, libraryContent },
  client,
) => {
  const values = [contentId, title, instructions, libraryContent];

  const sql = `
    UPDATE contents
    SET
      title = $2,
      instructions = $3,
      library_content = $4
    WHERE id = $1
    RETURNING *
  `;

  const res = await query(sql, values, client);
  return res.rows[0];
};

export { updateContentById };
