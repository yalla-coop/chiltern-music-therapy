import { query } from '../connect';

const createProgressUpdate = async ({
  programmeId,
  mediaId,
  clientMessage,
  therapistMessage,
  link,
  type,
}) => {
  const sql = `
    INSERT INTO progress_updates(
      programme_id,
      media_id,
      client_message,
      therapist_message,
      link,
      type
    )
      VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6
      ) RETURNING *
  `;
  const res = await query(sql, [
    programmeId,
    mediaId,
    clientMessage,
    therapistMessage,
    link,
    type,
  ]);
  return res.rows[0];
};

const createProgressUpdates = async ({ programmes, media }) => {
  const chilternOrg = await createProgressUpdate({
    programmeId: programmes.programme1.id,
    mediaId: media.progress1Video.id,
    clientMessage:
      "Hi Suzan, i've watched the video and it was really helpful, thanks :)",
    therapistMessage: 'Happy to hear that, have a good weekend',
    type: 'VIDEO',
  });

  return {
    chilternOrg,
  };
};

export default createProgressUpdates;
