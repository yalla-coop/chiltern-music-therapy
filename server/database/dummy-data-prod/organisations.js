import { query } from '../connect';

const createOrganisation = async ({ name }) => {
  const sql = `
    INSERT INTO organisations(name)
      VALUES ($1) RETURNING *
  `;
  const res = await query(sql, [name]);
  return res.rows[0];
};

const createOrganisations = async () => {
  const chilternOrg = await createOrganisation({
    name: 'Chiltern Music Therapy',
  });

  return {
    chilternOrg,
  };
};

export default createOrganisations;
