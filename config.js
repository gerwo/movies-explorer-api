require('dotenv').config();

const {
  NODE_ENV,
  PORT = 3000,
  BASE_URL = 'mongodb://localhost:27017/bitfilmsdb',
  JWT_SECRET,
} = process.env;

const pattern = /^(https?:\/\/)(www\.)?([\da-z-.]+)\.([a-z.]{2,6})[\da-zA-Z-._~:?#[\]@!$&'()*+,;=/]*\/?#?$/;

module.exports = {
  NODE_ENV,
  PORT,
  BASE_URL,
  JWT_SECRET,
  pattern,
};
