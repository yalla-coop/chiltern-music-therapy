import { query } from '../../../database';

const updateUserById = async () => {
  const sql = ``;

  const res = await query(sql);
  return res.rows[0];
};

export { updateUserById };
