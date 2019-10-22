import { Server, IncomingMessage, ServerResponse, createServer } from 'http';
import {existsSync, readFile, readFileSync} from 'fs';
import * as path from 'path';
import Router from './router';
import TypeRoute from './Router/TypeRoute';

class myExpress {
    private httpSever: Server;
    private router: Router = new Router();
    private readonly main_directory = "lib"
    private readonly pages_directory = "pages";
    private readonly pages_exetension = ".html";

    constructor() {
        this.httpSever = createServer((req: IncomingMessage, res: ServerResponse) => {
            this.router.navigate(req, res);
        })
    }

    get(url: string, callback: Function): void {
        this.router.newRoute({method: TypeRoute.GET , url, callback});
    }
    post(url: string, callback: Function): void {
        this.router.newRoute({method: TypeRoute.POST, url, callback});
    }
    
    put(url: string, callback: Function): void{
        this.router.newRoute({method: TypeRoute.PUT, url, callback});
    }

    delete(url: string, callback: Function): void{
        this.router.newRoute({method: TypeRoute.DELETE, url, callback});
    }

    all(url: string, callback: Function) {
        this.router.newRoute({method: TypeRoute.ALL, url, callback});
    }

    render(filename: string,param: any, callback: (error: Error, html: string) => void) {
        const pathName = path.join(this.main_directory,this.pages_directory, `${filename}${this.pages_exetension}`);

        if(!existsSync(pathName)) {
            callback(new Error(`404 Page ${filename} not exist`), null);
            return;
        }

        const content = readFileSync(pathName, "utf-8");
        const mustaches = /{{ ?(\w+)(( ?[|] ?)((\w+)(\:(\w+))?))? ?}}/gi;
        
        const replaceContent = content.replace(mustaches, (item: string, ...args: any[]): string => {
            const [key, , , pipe, transform, , number]: string[] = args
        
            const value = param[key] || "undefined";

           if(pipe && transform) {
                const trans: Function = this[`${transform}`];
                switch(transform.toLowerCase()) {
                    case 'fixed':
                        return trans ? trans(value, number) : value;
                    default:
                        return trans ? trans(value) : value;
                }
           }

           return value;
        })

        callback(null, replaceContent);
    }
  
    upper(string: string) {
        return string.toUpperCase();
    }

    lower(string: string) {
        return string.toLowerCase();
    }

    fixed(string: string, fixed: number) {
        return parseFloat(string).toFixed(fixed);
    }

    listen(port: number, callback: () => void): void{
        this.httpSever.listen(port, callback);
    }
}

export default () => new myExpress();