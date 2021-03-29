import { query } from '../connect';

const createProgramme = async ({ therapistsClientsId, description }) => {
  const sql = `
    INSERT INTO programmes(
      therapists_clients_id,
      description
    )
      VALUES (
        $1,
        $2
      ) RETURNING *
  `;
  const res = await query(sql, [therapistsClientsId, description]);
  return res.rows[0];
};

const createProgrammes = async ({ therapistClients }) => {
  const programme1 = await createProgramme({
    therapistsClientsId: therapistClients.therapist1Client1.id,
    description:
      'Lorem ipsum 2 dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip',
  });

  return {
    programme1,
  };
};

export default createProgrammes;
