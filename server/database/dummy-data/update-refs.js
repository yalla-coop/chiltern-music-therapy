import { query } from '../connect';
import { bucket, region } from '../../services/files-storage/config';

const updateUserProfileImageRef = async ({ id, mediaId }) => {
  const sql = `
  UPDATE users
  SET
    profile_photo_media_id = $2
  WHERE id = $1
  RETURNING *
  `;
  const res = await query(sql, [id, mediaId]);
  return res.rows[0];
};

const updateRefs = async (data) => {
  const therapist1 = await updateUserProfileImageRef({
    id: data.users.therapist1.id,
    mediaId: data.media.therapist1ProfileImage.id,
  });

  // eslint-disable-next-line no-param-reassign
  data.users.therapist1 = therapist1;
};

export default updateRefs;
