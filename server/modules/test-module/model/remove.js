import { query } from '../../../database';

const deleteTestById = async () => {
  const sql = ``;

  const res = await query(sql);
  return res.rows[0];
};

export { deleteTestById };
