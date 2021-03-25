import { query } from '../../../database';

const updateTestById = async () => {
  const sql = ``;

  const res = await query(sql);
  return res.rows[0];
};

export { updateTestById };
