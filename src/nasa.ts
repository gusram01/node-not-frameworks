import https from 'https';
import Stream from 'stream';
import fs from 'fs';
import path from 'path';

const apiKey = 'ynyBvk4VmMD0BDBE0Ia8DAzNAkroJrsqxUiYyuRr';
const uri = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=2020-09-25`;
const imageDir = path.resolve(__dirname, '..', 'public');
const filename = imageDir + '/nasa-pod.jpg';
const stream = Stream.Transform;

let image = '';

// const sendImage = () => {
//   let pix: Buffer | undefined;
//   fs.access(filename, fs.constants.F_OK, (err) => {
//     console.log(`${filename} ${err ? 'does not exists' : 'exists'}`);
//   });
//   fs.readFile(filename, (err, content) => {
//     if (err) {
//       return (pix = undefined);
//     } else {
//       return (pix = content);
//     }
//   });
//   return pix;
// };

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

const getImage = https.get(uri, (response) => {
  let data = '';
  response.on('data', (chunk) => {
    data += chunk;
  });
  response.on('end', () => {
    const some = JSON.parse(data);
    image = some.hdurl;
    saveImage(image);
  });
});

getImage.on('error', (err) => console.log(err));

export { image };
