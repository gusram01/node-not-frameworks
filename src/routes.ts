import { IncomingMessage, ServerResponse } from 'http';
import fs from 'fs';
import path from 'path';

interface Routes {
  [key: string]: (req: IncomingMessage, res: ServerResponse) => void;
}

const data = {
  ok: true,
  data: {
    user: 'gus',
    token: 'bearer Token',
  },
};

const routes: Routes = {
  '/hello': (req: IncomingMessage, res: ServerResponse) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.write('<h1>Hello World</h1>');
    res.end();
  },

  '/json': (req: IncomingMessage, res: ServerResponse) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(data));
    res.end();
  },

  '/nasa-pod': (req: IncomingMessage, res: ServerResponse) => {
    const imageDir = path.resolve(__dirname, '..', 'public');
    res.setHeader('Content-Type', 'text/html');

    fs.readFile(`${imageDir}/index.html`, (err, data) => {
      if (err) {
        res.statusCode = 404;
        res.write(`<h1> Pic was not found </h1>`);
        res.end();
      } else {
        res.statusCode = 200;
        res.end(data);
      }
    });
  },
};

export { routes };
