import { IncomingMessage } from "http";

export interface Request extends IncomingMessage {
    params: {[k: string]: string}
    query: {[k: string]: string}
}