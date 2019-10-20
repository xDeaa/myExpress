"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const navigation_1 = __importDefault(require("./navigation"));
const TypeNavigation_1 = __importDefault(require("./navigation/TypeNavigation"));
class myExpress {
    constructor() {
        this.navigation = new navigation_1.default();
    }
    init() {
        this.httpSever = http_1.createServer((req, res) => {
            this.navigation.navigate(req, res);
        });
    }
    get(url, callback) {
        this.navigation.newRoute({ method: TypeNavigation_1.default.GET, url, callback });
    }
    post(url, callback) {
        this.navigation.newRoute({ method: TypeNavigation_1.default.POST, url, callback });
    }
    put(url, callback) {
        this.navigation.newRoute({ method: TypeNavigation_1.default.PUT, url, callback });
    }
    delete(url, callback) {
        this.navigation.newRoute({ method: TypeNavigation_1.default.DELETE, url, callback });
    }
    all(url, callback) {
        // this.navigation.newRoute({method: "GET", url, callback});
    }
    listen(port) {
        console.log(`Server linstening on port ${port}`);
        this.httpSever.listen(port);
    }
}
exports.default = myExpress;
//# sourceMappingURL=my-express.js.map