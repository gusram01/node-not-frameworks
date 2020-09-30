import { ServerResponse } from 'http';
import { image } from './nasa';

const routes = (pathName: string, res: ServerResponse) => {
  const data = {
    ok: true,
    data: {
      user: 'gus',
      token: 'bearer Token',
    },
  };

  res.setHeader('Content-Type', 'text/html');

  switch (pathName) {
    case '/':
      res.statusCode = 200;
      res.write('<h1>Hello World</h1>');

      break;
    case '/json':
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify(data));

      break;
    case '/nasa-pod':
      res.statusCode = 200;
      res.write(`<img src=${image} width="800px"/>`);

      break;
    default:
      res.statusCode = 404;
      res.write('<h1>Page not found</h1>');
  }
  res.end();
};

export default routes;
