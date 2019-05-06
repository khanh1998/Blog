import http from 'http';
import app from './BlogAPI/config/app';
import config from './BlogAPI/config/index';

const server = http.createServer(app);

server.listen(config.PORT, () => {
  console.log(`Server is running on ${config.PORT}`);
});
