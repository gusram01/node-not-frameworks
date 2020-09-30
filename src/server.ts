import server from './app';
import reqImage from './nasa';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const port = process.env.LOCAL_PORT || 3000;

reqImage.on('error', (err) => console.log(err));
reqImage.end();

server.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});
