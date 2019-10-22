"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const my_express_1 = __importDefault(require("./my-express"));
const app = my_express_1.default();
const port = 4242;
app.get('/', (request, response) => {
    app.render('help', {}, (error, html) => {
        response.setHeader('Content-Type', 'text/html');
        if (error) {
            response.writeHead(500);
            response.write(error.toString());
        }
        else {
            response.writeHead(200);
            response.write(html);
        }
        response.end();
    });
});
app.get('/welcome', (request, response) => {
    app.render('home', { name: 'Ch0pper' }, (error, html) => {
        response.setHeader('Content-Type', 'text/html');
        if (error) {
            response.writeHead(500);
            response.write(error.toString());
        }
        else {
            response.writeHead(200);
            response.write(html);
        }
        response.end();
    });
});
app.post('/post', (request, response) => {
    app.render('post', { weight: 33.1337 }, (error, html) => {
        response.setHeader('Content-Type', 'text/html');
        if (error) {
            response.writeHead(500);
            response.write(error.toString());
        }
        else {
            response.writeHead(200);
            response.write(html);
        }
        response.end();
    });
});
app.put('/put', (request, response) => {
    app.render('put', { name: 'Luffy' }, (error, html) => {
        response.setHeader('Content-Type', 'text/html');
        if (error) {
            response.writeHead(500);
            response.write(error.toString());
        }
        else {
            response.writeHead(200);
            response.write(html);
        }
        response.end();
    });
});
app.delete('/delete', (request, response) => {
    app.render('delete', { name: 'Ch0pper' }, (error, html) => {
        response.setHeader('Content-Type', 'text/html');
        if (error) {
            response.writeHead(500);
            response.write(error.toString());
        }
        else {
            response.writeHead(200);
            response.write(html);
        }
        response.end();
    });
});
app.all('/all', (request, response) => {
    app.render('all', {}, (error, html) => {
        response.setHeader('Content-Type', 'text/html');
        if (error) {
            response.writeHead(500);
            response.write(error.toString());
        }
        else {
            response.writeHead(200);
            response.write(html);
        }
        response.end();
    });
});
app.listen(port, () => { console.log(`Server listenning on ${port} port`); });
//# sourceMappingURL=app.js.map