import * as functions from 'firebase-functions';

export const environment = {
  production: false,
  origin: 'https://esaiharamasukoi.web.app',
  oauth: {
    clientId: functions.config().esa.id,
    clientSecret: functions.config().esa.secret,
    callbackUrl: 'https://esaiharamasukoi.web.app/api/callback',
  },
};
