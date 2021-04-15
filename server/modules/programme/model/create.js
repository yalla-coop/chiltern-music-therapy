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

const createProgrammeFeedback = async (
  {
    programmeId,
    clearInstructions,
    problems,
    clearDemos,
    noDemos,
    enjoyableResources,
    likeMostAndLeast,
  },
  client,
) => {
  const sql = `
    INSERT INTO programmes_feedbacks(
      programme_id,
      clear_instructions,
      problems,
      clear_demos,
      no_demos,
      enjoyable_resources,
      like_most_and_least
    )
      VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7
      ) RETURNING id
  `;
  const res = await query(
    sql,
    [
      programmeId,
      clearInstructions,
      problems,
      clearDemos,
      noDemos,
      enjoyableResources,
      likeMostAndLeast,
    ],
    client,
  );
  return res.rows[0];
};

export { createProgramme, createProgrammesContent, createProgrammeFeedback };
