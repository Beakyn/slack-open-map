const errors = [
  {statusCode: 400, error: 'Bad Request'},
  {statusCode: 401, error: 'Unauthorized'},
  {statusCode: 404, error: 'Not Found'},
  {statusCode: 500, error: 'Internal Server Error'},
];

export default (statusCode, message) => {
  const error = errors.find((x) => x.statusCode === statusCode).error;

  throw {statusCode, error, message};
};
