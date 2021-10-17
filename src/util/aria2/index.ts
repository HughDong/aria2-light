import client  from "./client";
import { initBackground } from "./backgound";

export interface File {
    index : number,
    path : string,
    length : number,
    completedLength : number,
    selected : boolean,
    uris : Array<string>
}

export interface Result {
    gid : string,
    completedLength : number,
    downloadSpeed : number,
    status : string,
    totalLength : number,
    uploadSpeed : number,
    files : Array<File>,
    dir : string,
    errorMessage : string
}

export interface Item {
    gid : string,
    name : string,
    status : string,
    downloadSpeed : string,
    percentage : number,
    size : string,
    errorMessage ? : string,   
    remainingTime? : string,
    createTime? : string
}

export enum Status {
    active = "active",
    pause = "paused",
    error = "error",
    completed = "complete"
}

export {
    client,
    initBackground
}
