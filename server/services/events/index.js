import pubSub from './create-pub-sub';

import types from './event-types';

import './user';
// add all modules & services(eg. emails)

const { emit, listen } = pubSub;
export default { emit, listen, types };
