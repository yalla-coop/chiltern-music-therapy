import { query } from '../../../database';
import { userStatuses } from '../../../constants';

// returns the original row before the update
const deleteUserDetails = async (id) => {
  const sql = `
    UPDATE users AS u 
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
    FROM users AS old_u 
    WHERE u.id = old_u.id AND u.id = $1 
    RETURNING old_u.*    
  `;

  const res = await query(sql, [id, userStatuses.DELETED]);
  return res.rows[0];
};

export { deleteUserDetails };
