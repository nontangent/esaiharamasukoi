import * as functions from 'firebase-functions';

export const environment = {
  production: true,
  accessToken: functions.config().accessToken,
};
