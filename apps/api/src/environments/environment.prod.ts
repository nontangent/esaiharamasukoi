import * as functions from 'firebase-functions';

export const environment = {
  production: false,
  origin: 'https://esaiharamasukoi.web.app',
  oauth: {
    clientId: functions.config().key,
    clientSecret: functions.config().secret,
    callbackUrl: 'https://esaiharamasukoi.web.app/api/callback',
  },
};
