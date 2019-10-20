"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const my_express_1 = __importDefault(require("./my-express"));
// myExpress();
const app = new my_express_1.default();
app.init();
app.get('test', (request, response) => {
    // console.log(request);
    response.write("Bienvenue sur test");
    response.end();
});
app.listen(4242);
//# sourceMappingURL=app.js.map