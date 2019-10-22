"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const fs_1 = require("fs");
const path = __importStar(require("path"));
const navigation_1 = __importDefault(require("./navigation"));
const TypeNavigation_1 = __importDefault(require("./navigation/TypeNavigation"));
class myExpress {
    constructor() {
        this.navigation = new navigation_1.default();
        this.main_directory = "lib";
        this.pages_directory = "pages";
        this.pages_exetension = ".html";
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
    render(filename, param, callback) {
        const pathName = path.join(this.main_directory, this.pages_directory, `${filename}${this.pages_exetension}`);
        if (!fs_1.existsSync(pathName)) {
            callback(new Error(`404 Page ${filename} not exist`), null);
            return;
        }
        const content = fs_1.readFileSync(pathName, "utf-8");
        const mustaches = /{{ ?(\w+)(( ?[|] ?)((\w+)(\:(\w+))?))? ?}}/gi;
        const replaceContent = content.replace(mustaches, (item, ...args) => {
            const [key, , , pipe, transform, , number] = args;
            const value = param[key] || "undefined";
            if (pipe && transform) {
                const trans = this[`${transform}`];
                switch (transform.toLowerCase()) {
                    case 'fixed':
                        return trans ? trans(value, number) : value;
                    default:
                        return trans ? trans(value) : value;
                }
            }
        });
        callback(null, replaceContent);
    }
    upper(string) {
        return string.toUpperCase();
    }
    lower(string) {
        return string.toLowerCase();
    }
    fixed(string, fixed) {
        return parseFloat(string).toFixed(fixed);
    }
    listen(port, callback) {
        this.httpSever.listen(port, callback);
    }
}
exports.default = () => new myExpress();
//# sourceMappingURL=my-express.js.map