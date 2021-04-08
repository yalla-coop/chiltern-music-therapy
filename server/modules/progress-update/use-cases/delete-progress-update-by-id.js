import * as ProgressUpdate from '../model';
import events from '../../../services/events';

const deleteProgressUpdatesByClientId = async ({ id }) => {
  const deletedProgressUpdates = await ProgressUpdate.deleteProgressUpdatesByClientId(
    id,
  );

  deletedProgressUpdates.forEach((deletedProgressUpdate) => {
    events.emit(events.types.PROGRESS_UPDATE.DELETED, deletedProgressUpdate);
  });

  return deletedProgressUpdates;
};

export default deleteProgressUpdatesByClientId;
