import {IncomingMessage, ServerResponse} from 'http';
interface Route {
    method: string,
    url: string,
    callback: Function
}

export default class Navigation {
    private routes: Route[] = [];

    newRoute (route:Route) {
        this.routes.push(route);
    }

    navigate(req: IncomingMessage, res: ServerResponse) {
        const { method, url} = req;
        const matchRoute = this.routes.find(route => {
            return route.method === method && route.url === url
        });

        if(matchRoute) {
            matchRoute.callback(req, res);

        } else {
            res.write("404 not found");
            res.end();

        }
    }
}