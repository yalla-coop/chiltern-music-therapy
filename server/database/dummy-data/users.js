import { query } from '../connect';

const createUser = async (/* data */) => {
  const sql = `INSERT INTO users(id) VALUES ($1) RETURNING *`;
  const res = await query(sql, [1]);
  return res.rows[0];
};

const createUsers = async (data) => {
  const user = await createUser(data);

  return {
    user,
  };
};

export default createUsers;
