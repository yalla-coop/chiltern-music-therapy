import axios from 'axios';

import * as Users from './users';
import * as ProgressUpdates from './progress-updates';
import * as TherapistClients from './therapists-clients';
import * as ViewAccesses from './view-accesses';
import * as Contents from './contents';
import * as Media from './media';
import * as Organisations from './organisations';
import * as Programmes from './programmes';

axios.defaults.baseURL = `${process.env.PUBLIC_URL}/api`;

export {
  Contents,
  Media,
  Organisations,
  Programmes,
  ProgressUpdates,
  TherapistClients,
  Users,
  ViewAccesses,
};
