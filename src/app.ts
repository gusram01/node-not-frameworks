import http, { IncomingMessage, ServerResponse } from 'http';
import url from 'url';
import { routes } from './routes';
import nodeStatic from 'node-static';

const init = (req: IncomingMessage, res: ServerResponse) => {
  const parseUrl = url.parse(req.url || '/404', true);
  const path = parseUrl.path as string;
  const limitPath =
    path === '/hello' ||
    path === '/json' ||
    path === '/nasa-pod' ||
    path === '/404'
      ? true
      : false;

  const file = new nodeStatic.Server('./public');

  console.log(parseUrl);
  req.on('data', () => console.log('hey'));
  req.addListener('end', () => {
    if (!limitPath) {
      file.serve(req, res, (err) => {
        //@ts-expect-error
        if (err && err.status === 404) {
          file.serveFile('/404.html', 404, {}, req, res);
        }
      });
    } else {
      const func = routes[path];
      func(req, res);
    }
  }).resume;
};

const server = http.createServer(init);

export default server;
