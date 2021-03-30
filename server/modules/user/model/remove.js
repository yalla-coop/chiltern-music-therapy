import { query } from '../../../database';

const deleteUserDetails = async (id) => {
  const sql = `
    UPDATE users
      SET
        email = NULL
    WHERE id = $1;
  `;

  await query(sql, [id]);
};

export { deleteUserDetails };
