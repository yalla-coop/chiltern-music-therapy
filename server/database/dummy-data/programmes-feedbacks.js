import { query } from '../connect';

const createProgrammesFeedback = async ({
  programmeId,
  clearInstructions,
  problems,
  clearDemos,
  noDemos,
  enjoyableResources,
  likeMostAndLeast,
}) => {
  const sql = `
    INSERT INTO programmes_feedbacks(
      programme_id,
      clear_instructions,
      problems,
      clear_demos,
      no_demos,
      enjoyable_resources,
      like_most_and_least
    )
      VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7
      ) RETURNING *
  `;
  const res = await query(sql, [
    programmeId,
    clearInstructions,
    problems,
    clearDemos,
    noDemos,
    enjoyableResources,
    likeMostAndLeast,
  ]);
  return res.rows[0];
};

const createProgrammesFeedbacks = async ({ programmes }) => {
  const programme1Feedback1 = await createProgrammesFeedback({
    programmeId: programmes.programme1.id,
    clearInstructions: 5,
    problems: "Voice wasn't clear",
    clearDemos: 4,
    noDemos: false,
    enjoyableResources: 3,
    likeMostAndLeast: `
    - I liked the video the most, it was cool
    - but the instructions weren't clear
    `,
  });

  return {
    programme1Feedback1,
  };
};

export default createProgrammesFeedbacks;
