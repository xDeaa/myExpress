"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Navigation {
    constructor() {
        this.routes = [];
    }
    newRoute(route) {
        this.routes.push(route);
        if (route.method === "ALL") {
            for (let method of ["GET", "POST", "PUT", "DELETE"]) {
                this.routes.push({ method, url: route.url, callback: route.callback });
            }
        }
    }
    navigate(req, res) {
        const { method, url } = req;
        const response = this.handleResponse(res);
        const matchRoute = this.routes.find((route) => {
            return route.method === method && route.url === url;
        });
        if (matchRoute) {
            matchRoute.callback(req, res);
        }
        else {
            res.write("404 not found");
            res.end();
        }
    }
    handleResponse(res) {
        const json = (item) => {
            res.write(JSON.stringify(item));
            res.end();
        };
        const send = (content) => {
            res.write(content);
            res.end();
        };
        return Object.assign({}, { json, send }, res);
    }
}
exports.default = Navigation;
//# sourceMappingURL=index.js.map