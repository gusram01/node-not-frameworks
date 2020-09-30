import http, { IncomingMessage, ServerResponse } from 'http';
import url from 'url';
import routes from './routes';

const init = (req: IncomingMessage, res: ServerResponse) => {
  const parseUrl = url.parse(req.url || '/404', true);

  const {
    protocol,
    slashes,
    auth,
    host,
    port,
    hostname,
    hash,
    search,
    query,
    pathname,
    path,
    href,
  } = parseUrl;

  console.log(path);
  return routes(path!, res);
};

const server = http.createServer(init);

export default server;
