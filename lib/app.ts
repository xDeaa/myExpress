import myExpress from './my-express';
import {IncomingMessage, ServerResponse} from 'http';

const app = myExpress();
const port: number = 4242;
app.get('/test', (request: IncomingMessage, response: ServerResponse) => {
  app.render('home', { name: 'Ch0pper', age:263 }, (error: Error, html: string): void=> {
    response.setHeader('Content-Type', 'text/html');

    if(error) {
      response.writeHead(500);
      response.write(error.toString());
    } else {
      response.writeHead(200);
      response.write(html)
    }
    
    response.end();
  })                                     
})



app.listen(port, () => {console.log(`Server listenning on ${port} port`)});
