"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Navigation {
    constructor() {
        this.routes = [];
    }
    newRoute(route) {
        this.routes.push(route);
    }
    navigate(req, res) {
        const { method, url } = req;
        const matchRoute = this.routes.find(route => {
            console.log(route);
            console.log(method);
            console.log(req.url);
            return route.method === method && route.url === url;
        });
        console.log(matchRoute);
        if (matchRoute) {
            matchRoute.callback(req, res);
        }
        else {
            res.write("404 not found");
            res.end();
        }
        // console.log(index);
        // if(index === -1) {
        //     console.log(this.routes)
        //     console.log(this.routes[index])
        //     // this.routes[].callback(req,res);
        // } else {
        //     res.write("404 not found");
        //     res.end();
        // }
    }
}
exports.default = Navigation;
//# sourceMappingURL=index.js.map