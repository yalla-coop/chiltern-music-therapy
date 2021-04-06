import { query } from '../../../database';

const findContentByProgrammeID = async (id) => {
  const values = [id];

  const sql = `
    SELECT 
    c.title,
    c.instructions,
    c.link,
    m.file_name,
    m.file-type,
    pu.id 'progress_update.id',
    pu.created_at 'progress_update.created_at',
    pu.therapist_message 'progress_update.therapist_message',
    pf.id 'feedback.id',
    pf.created_at 'feedback.created_at'
    FROM content c
    INNER JOIN programme_contents pc ON pc.content_id = c.id
    INNER JOIN media m ON c.media_id = media.id
    INNER JOIN progress_updates pu ON pu.programme_id = pc.programme_id
    INNER JOIN programmes_feedbacks pf ON pf.programme_id = pc.programme_id
    WHERE pc.programme_id = $1
  `;

  const res = await query(sql, values);
  return res.rows;
};

export { findContentByProgrammeID };
