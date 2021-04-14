import Boom from '@hapi/boom';
import * as Programme from '../model';
import { errorMsgs } from '../../../services/error-handler';
import events from '../../../services/events';

const createProgrammeFeedback = async ({
  id,
  userId,
  clearInstructions,
  problems,
  clearDemos,
  noDemos,
  enjoyableResources,
  likeMostAndLeast,
}) => {
  const programme = await Programme.findProgrammeWithUsersById(id);

  if (!programme) {
    throw Boom.notFound(errorMsgs.NOT_FOUND);
  }

  if (Number(programme.client.id) !== userId) {
    throw Boom.unauthorized(errorMsgs.UNAUTHORISED);
  }

  const createdFeedback = await Programme.createProgrammeFeedback({
    programmeId: id,
    clearInstructions,
    problems,
    clearDemos,
    noDemos,
    enjoyableResources,
    likeMostAndLeast,
  });

  events.emit(events.types.PROGRAMME.FEEDBACK.CREATED, {
    feedbackId: createdFeedback.id,
  });

  return createdFeedback;
};

export default createProgrammeFeedback;
