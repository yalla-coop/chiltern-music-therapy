import { query } from '../connect';

const createTherapistsClient = async ({
  therapistUserId,
  clientUserId,
  therapyBackground,
  therapyGoals,
  therapistBio,
  therapistIntro,
  therapistMessage,
  inviteToken,
}) => {
  const sql = `
    INSERT INTO therapist_clients(
      therapist_user_id,
      client_user_id,
      therapy_background,
      therapy_goals,
      therapist_bio,
      therapist_intro,
      therapist_message,
      invite_token
    )
      VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7,
        $8
      ) RETURNING *
  `;
  const res = await query(sql, [
    therapistUserId,
    clientUserId,
    therapyBackground,
    therapyGoals,
    therapistBio,
    therapistIntro,
    therapistMessage,
    inviteToken,
  ]);
  return res.rows[0];
};

const createTherapistsClients = async ({ users }) => {
  const therapist1Client1 = await createTherapistsClient({
    therapistUserId: users.therapist1.id,
    clientUserId: users.client1.id,
    therapyBackground:
      'Between our therapy sessions and home programme content, we’ll continue supporting J in 4 key areas: social interaction &  communication, emotional wellbeing, cognition; learning, and physical skills. Each week, we’ll focus on 1 or more of these areas, with an accompanying resource to support her over that week.',
    therapyGoals: [
      {
        category: 'Communication',
        goal: `- Goal 1: JE will consistently follow lyrical cues to wait and turn-take
        - Goal 2: lorem ipsum test goal 2`,
      },
      {
        category: 'Emotional wellbeing',
        goal: `- Goal 1: For JE to be able to use eye gaze or visuals to communicate how she is feeling.
        - Goal 2: lorem ipsum test goal 2`,
      },
    ],
    therapistBio:
      "Licensed Marriage and Family Therapist in MN, MI and WI. Erin loves working with children, teens, families and couples. Erin is nationally certified in Trauma-Focused Cognitive Behavioral Therapy (TFCBT) and has completed the second level of Gottman Couples Therapy Method. Erin believes everyone should have a safe and healing place to work through life's difficulties.",
    therapistIntro:
      'Erin tries to help bring families and couples closer together through therapeutic work and help to have fulfilling relationships. Erin provides both clinical supervision for Marriage and Family Therapists and Professional Counselors in MN as well as administrative supervision here at FamilyMeans.',
    therapistMessage:
      'I am a board certified Licensed Mental Health Counselor in New York, practicing as a therapist and coach in Manhattan. My education and professional background in both the mind and the body gives me a unique and effective approach to counseling.',
    inviteToken: '00000000',
  });
  const therapist1Client2 = await createTherapistsClient({
    therapistUserId: users.therapist1.id,
    clientUserId: users.client2.id,
    therapyBackground:
      'Between our therapy sessions and home programme content, we’ll continue supporting J in 4 key areas: social interaction &  communication, emotional wellbeing, cognition; learning, and physical skills. Each week, we’ll focus on 1 or more of these areas, with an accompanying resource to support her over that week.2',
    therapyGoals: [
      {
        category: 'Communication',
        goal: `- Goal 1: JE will consistently follow lyrical cues to wait and turn-take
        - Goal 2: lorem ipsum test goal 2`,
      },
      {
        category: 'Emotional wellbeing',
        goal: `- Goal 1: For JE to be able to use eye gaze or visuals to communicate how she is feeling.
        - Goal 2: lorem ipsum test goal 2`,
      },
    ],
    therapistBio:
      "Licensed Marriage and Family Therapist in MN, MI and WI. Erin loves working with children, teens, families and couples. Erin is nationally certified in Trauma-Focused Cognitive Behavioral Therapy (TFCBT) and has completed the second level of Gottman Couples Therapy Method. Erin believes everyone should have a safe and healing place to work through life's difficulties.2",
    therapistIntro:
      'Erin tries to help bring families and couples closer together through therapeutic work and help to have fulfilling relationships. Erin provides both clinical supervision for Marriage and Family Therapists and Professional Counselors in MN as well as administrative supervision here at FamilyMeans.2',
    therapistMessage:
      'I am a board certified Licensed Mental Health Counselor in New York, practicing as a therapist and coach in Manhattan. My education and professional background in both the mind and the body gives me a unique and effective approach to counseling.2',
    inviteToken: '11111111',
  });

  const therapist1Client3 = await createTherapistsClient({
    therapistUserId: users.therapist1.id,
    clientUserId: users.client3.id,
    therapyBackground:
      'Between our therapy sessions and home programme content, we’ll continue supporting J in 4 key areas: social interaction &  communication, emotional wellbeing, cognition; learning, and physical skills. Each week, we’ll focus on 1 or more of these areas, with an accompanying resource to support her over that week.3',
    therapyGoals: [
      {
        category: 'Communication',
        goal: `- Goal 1: JE will consistently follow lyrical cues to wait and turn-take
        - Goal 2: lorem ipsum test goal 2`,
      },
      {
        category: 'Emotional wellbeing',
        goal: `- Goal 1: For JE to be able to use eye gaze or visuals to communicate how she is feeling.
        - Goal 2: lorem ipsum test goal 2`,
      },
    ],
    therapistBio:
      "Licensed Marriage and Family Therapist in MN, MI and WI. Erin loves working with children, teens, families and couples. Erin is nationally certified in Trauma-Focused Cognitive Behavioral Therapy (TFCBT) and has completed the second level of Gottman Couples Therapy Method. Erin believes everyone should have a safe and healing place to work through life's difficulties.3",
    therapistIntro:
      'Erin tries to help bring families and couples closer together through therapeutic work and help to have fulfilling relationships. Erin provides both clinical supervision for Marriage and Family Therapists and Professional Counselors in MN as well as administrative supervision here at FamilyMeans.3',
    therapistMessage:
      'I am a board certified Licensed Mental Health Counselor in New York, practicing as a therapist and coach in Manhattan. My education and professional background in both the mind and the body gives me a unique and effective approach to counseling.3',
    inviteToken: '22222222',
  });

  return {
    therapist1Client1,
    therapist1Client2,
    therapist1Client3,
  };
};

export default createTherapistsClients;
