import server from './app';

const port = 3000;

server.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});
