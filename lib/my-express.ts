import { Server, IncomingMessage, ServerResponse, createServer } from 'http';
import {existsSync, readFile, readFileSync} from 'fs';
import * as path from 'path';
import Navigation from './navigation';
import TypeNavigation from './navigation/TypeNavigation';

class myExpress {
    private httpSever: Server;
    private navigation: Navigation = new Navigation();
    private readonly main_directory = "lib"
    private readonly pages_directory = "pages";
    private readonly pages_exetension = ".html";

    constructor() {
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
        this.navigation.newRoute({method: TypeNavigation.ALL, url, callback});
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