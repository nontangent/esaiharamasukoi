export const environment = {
  production: false,
  origin: 'http://localhost:4200',
  oauth: {
    clientId: process.env['CLIENT_ID'],
    clientSecret: process.env['CLIENT_SECRET'],
    callbackUrl: 'http://localhost:4200/api/callback',
  },
};
