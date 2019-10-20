import myExpress from './my-express';
import {IncomingMessage, ServerResponse} from 'http';
// myExpress();
const app = new myExpress();
app.init();
app.get('test', (request: IncomingMessage, response: ServerResponse) => {
    // console.log(request);
    response.write("Bienvenue sur test");
    response.end();
})
app.listen(4242)
