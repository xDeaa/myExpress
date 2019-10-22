import {IncomingMessage, ServerResponse} from 'http';
interface Route {
    method: string,
    url: string,
    callback: Function,
    regex: RegExp | null
}

export default class Router {
    public readonly routes: Route[] = [];

    newRoute(route:Route) {
        if (route.method === "ALL") {
            for (let method of ["GET","POST","PUT","DELETE"]) {
                this.routes.push({method, url: route.url, callback: route.callback, regex: route.regex});
            }
        } else {
            this.routes.push(route);
        }
    }

    navigate(req: IncomingMessage, res: ServerResponse) {
        const { method, url } : IncomingMessage  = req;
        const response = this.handleResponse(res);
        const matchRoute = this.routes.find((route) => {
            return route.method === method && route.url === url
        });

        if(matchRoute) {
            matchRoute.callback(req, res);
        } else {
            res.write("404 not found");
            res.end();
        }
    }

    handleResponse(res: ServerResponse) {
        const json = (item: any) => {
            res.write(JSON.stringify(item));
            res.end();
        }

        const send = (content: string): void => {
            res.write(content);
            res.end();
        }
        return Object.assign({},{json,send},res);
    }
}