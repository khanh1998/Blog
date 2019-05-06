const devConfig = {
  MONGO_URL: 'mongodb://localhost:27017/BlogAPI',
  PORT: process.env.PORT || 3000,
  HOSTNAME: 'http://localhost',
};
const testConfig = {

};
const prodConfig = {
  MONGO_URL: process.env.MONGO_URL,
  PORT: process.env.PORT || 3000,
  HOSTNAME: process.env.HOSTNAME,
};
const defaultConfig = {
  SECRET: process.env.SECRET,
  session: {session: false},
};

function envConfig(env) {
  switch (env) {
    case 'dev':
      return devConfig;
    case 'test':
      return testConfig;
    case 'prod':
      return prodConfig;
  }
}

export default {
  ...defaultConfig,
  ...envConfig(process.env.NODE_ENV),
};
