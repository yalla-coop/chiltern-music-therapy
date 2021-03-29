import { query } from '../connect';

const createViewAccess = async ({ ownerUserId, GrantToUserId }) => {
  const sql = `
    INSERT INTO view_accesses(
      owner_user_id,
      grant_to_user_id
    )
      VALUES (
        $1,
        $2
      ) RETURNING *
  `;
  const res = await query(sql, [ownerUserId, GrantToUserId]);
  return res.rows[0];
};

const createViewAccesses = async ({ users }) => {
  const therapist1Access = await createViewAccess({
    ownerUserId: users.therapist1.id,
    GrantToUserId: users.admin1.id,
  });
  const therapist2Access = await createViewAccess({
    ownerUserId: users.therapist2.id,
    GrantToUserId: users.admin1.id,
  });

  return {
    therapist1Access,
    therapist2Access,
  };
};

export default createViewAccesses;
