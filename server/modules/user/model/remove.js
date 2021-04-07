import { query } from '../../../database';
import { userStatuses } from '../../../constants';

const deleteUserDetails = async (id) => {
  const sql = `
    UPDATE users
      SET
        first_name = NULL,
        last_name = NULL,
        email = NULL,
        password = NULL,
        reset_password_token = NULL,
        over_16 = NULL,
        postcode = NULL,
        mobile_number = NULL,
        contact_number = NULL,
        status = $2,
        contact_email = NULL,
        bio = NULL,
        profile_photo_media_id = NULL
    WHERE id = $1;
  `;

  await query(sql, [id, userStatuses.DELETED]);
};

export { deleteUserDetails };
