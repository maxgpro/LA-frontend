import { default as data } from '../../client.json';

export const environment = {
  production: false,
  apiUrl: 'http://apicrm.loc/',
  auth: {
    clientSecret: data.clientSecret,
    clientId: data.clientId
  }
};