"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const my_express_1 = __importDefault(require("./my-express"));
const app = my_express_1.default();
const port = 4242;
app.get('/test', (request, response) => {
    app.render('home', { name: 'Ch0pper', weight: 33.1337 }, (error, html) => {
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