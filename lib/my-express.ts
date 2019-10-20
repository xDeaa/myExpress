import { Server, IncomingMessage, ServerResponse, createServer } from 'http';
import Navigation from './navigation';
import TypeNavigation from './navigation/TypeNavigation';

export default class myExpress {
    private httpSever: Server;
    private navigation: Navigation = new Navigation();

    init() {
        this.httpSever = createServer((req: IncomingMessage, res: ServerResponse) => {
            this.navigation.navigate(req, res);
        })
    }
    get(url: string, callback: Function): void {
        this.navigation.newRoute({method: TypeNavigation.GET , url, callback});
    }
    post(url: string, callback: Function): void {
        this.navigation.newRoute({method: TypeNavigation.POST, url, callback});
    }
    
    put(url: string, callback: Function): void{
        this.navigation.newRoute({method: TypeNavigation.PUT, url, callback});
    }

    delete(url: string, callback: Function): void{
        this.navigation.newRoute({method: TypeNavigation.DELETE, url, callback});
    }

    all(url: string, callback: Function) {
        // this.navigation.newRoute({method: "GET", url, callback});
    }

    listen(port: number): void{
        console.log(`Server linstening on port ${port}`)
        this.httpSever.listen(port)
    }
}