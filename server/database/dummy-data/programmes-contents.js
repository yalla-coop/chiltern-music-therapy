import { query } from '../connect';

const createProgrammesContent = async ({ programmeId, contentId }) => {
  const sql = `
    INSERT INTO programmes_contents(
      programme_id,
      content_id
    )
      VALUES (
        $1,
        $2
      ) RETURNING *
  `;
  const res = await query(sql, [programmeId, contentId]);
  return res.rows[0];
};

const createProgrammesContents = async ({ programmes, contents }) => {
  const programme1Content1 = await createProgrammesContent({
    programmeId: programmes.programme1.id,
    contentId: contents.content1.id,
  });

  return {
    programme1Content1,
  };
};

export default createProgrammesContents;
