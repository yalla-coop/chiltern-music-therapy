import { query } from '../../../database';

const updateProgrammeById = async ({ programmeId, description }, client) => {
  const values = [programmeId, description];

  const sql = `
    UPDATE programmes
    SET
      description = $2
    WHERE id = $1
    RETURNING *
  `;

  const res = await query(sql, values, client);
  return res.rows[0];
};

export { updateProgrammeById };
