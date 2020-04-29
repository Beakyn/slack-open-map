import * as shortid from 'shortid';

const shortId = () =>
  shortid.generate('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');
export default shortId;
