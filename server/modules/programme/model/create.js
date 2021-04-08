import { query } from '../../../database';

const createProgramme = async (
  { therapistsClientsId, description },
  client,
) => {
  const sql = `
    INSERT INTO programmes(
      therapists_clients_id,
      description
    )
      VALUES (
        $1,
        $2
      ) RETURNING id
  `;
  const res = await query(sql, [therapistsClientsId, description], client);
  return res.rows[0];
};

export { createProgramme };
