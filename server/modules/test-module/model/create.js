import { query } from '../../../database';

// pass client instance when you run this query in transaction
const createTest = async ({ testId }, client) => {
  const values = [testId];
  const sql = ``;

  const res = await query(sql, values, client);
  return res.rows;
};

export { createTest };
