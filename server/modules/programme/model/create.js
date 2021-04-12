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

const createProgrammesContent = async ({ programmeId, contentId }, client) => {
  const sql = `
    INSERT INTO programmes_contents(
      programme_id,
      content_id
    )
      VALUES (
        $1,
        $2
      ) RETURNING id
  `;
  const res = await query(sql, [programmeId, contentId], client);
  return res.rows[0];
};

export { createProgramme, createProgrammesContent };
