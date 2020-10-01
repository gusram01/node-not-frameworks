import https, { RequestOptions } from 'https';
import Stream from 'stream';
import path from 'path';
import fs from 'fs';
import { today } from './getDate/date';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const stream = Stream.Transform;
const imageDir = path.resolve(__dirname, '..', 'public');
const filename = `${imageDir}/nasa-pod.jpg`;
const fileError = `${imageDir}/error.jpg`;

const options: RequestOptions = {
  hostname: 'api.nasa.gov',
  path: `/planetary/apod?api_key=${process.env.NASA_APIKEY}&date=${today}`,
  method: 'GET',
};

const saveImage = (imageUrl: string) => {
  https.get(imageUrl, (response) => {
    if (
      response.statusCode === 200 &&
      response.headers['content-type'] === 'image/jpeg'
    ) {
      let img = new stream();
      response.on('data', (chunk) => {
        img.push(chunk);
      });
      response.on('end', () => {
        fs.writeFileSync(filename, img.read());
      });
    }
  });
};

const reqImage = https.request(options, (res) => {
  let data = '';
  if (res.statusCode && res.statusCode >= 400) {
    fs.copyFile(fileError, filename, () => console.log('show img by cb'));
    res.on('end', () => console.log('show stored image'));
  } else {
    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      const some = JSON.parse(data);
      saveImage(some.hdurl);
    });
  }
});

export default reqImage;
