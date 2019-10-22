import myExpress from './my-express';
import {IncomingMessage, ServerResponse} from 'http';

const app = myExpress();
const port: number = 4242;

app.get('/', (request: IncomingMessage, response: ServerResponse) => {
  app.render('help', {} , (error: Error, html: string): void=> {
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

app.get('/welcome', (request: IncomingMessage, response: ServerResponse) => {
  app.render('home', { name: 'Ch0pper' }, (error: Error, html: string): void=> {
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

app.post('/post', (request: IncomingMessage, response: ServerResponse) => {
  app.render('post', {weight:33.1337 }, (error: Error, html: string): void=> {
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

app.put('/put', (request: IncomingMessage, response: ServerResponse) => {
  app.render('put', {name: 'Luffy' }, (error: Error, html: string): void=> {
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

app.delete('/delete', (request: IncomingMessage, response: ServerResponse) => {
  app.render('delete', { name: 'Ch0pper' }, (error: Error, html: string): void=> {
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


app.all('/all', (request: IncomingMessage, response: ServerResponse) => {
  app.render('all', {  }, (error: Error, html: string): void=> {
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
