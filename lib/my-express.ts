import { Server, IncomingMessage, ServerResponse, createServer } from 'http';
import {existsSync, readFile, readFileSync} from 'fs';
import * as path from 'path';
import Router from './router';

class myExpress {
    private httpSever: Server;
    private router: Router = new Router();
    private readonly main_directory = "lib"
    private readonly pages_directory = "pages";
    private readonly pages_exetension = ".html";

    constructor() {
        this.init();
        this.httpSever = createServer((req: IncomingMessage, res: ServerResponse) => {
            this.router.navigate(req, res);
        })
    }

    private init() {
        for(let method of ["GET","POST","PUT","DELETE", "ALL"]) {
            this[method.toLowerCase()] = (url: string, callback: Function): void => {
                this.handleParameters(url, method, callback);
            }            
        }
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

    handleParameters(url: string, method: string, callback: Function) {
        const findRoute = this.router.routes.find((route) => {
            return route.method === method && route.url === url
        });
        
        if(findRoute) {
            return findRoute.callback;
        }
        const values = /(|)([:|?|&]\w*)/gi;
        const matched = url.match(values);
        
        if (matched) {
            const regexStr = url.replace(/\//g, "\\/").replace(/(:([\w]+))/, (_, ...args: any[]): string => {
                const [, param] = args
                return `(<${param}>\\w+)`
            })

            const regex = new RegExp(`^${regexStr}(\\/)?(\\?.*)?$`)

            this.router.newRoute({method,url,callback,regex});
            
        } else {
            this.router.newRoute({method,url,callback,regex: null});
        }
        // this.router.newRoute({method,url,callback,regex: null});
    }

    listen(port: number, callback: () => void): void{
        this.httpSever.listen(port, callback);
    }
}

export default () => new myExpress();