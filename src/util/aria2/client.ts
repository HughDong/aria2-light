
import axios from "axios";
import {log} from "@/util/log"
import { Interface } from "readline";

const ADD_URI_METHOD : string = 'aria2.addUri';
const ADD_TORRENT_METHOD : string = 'aria2.addTorrent';
const REMOVE_METHOD : string = 'aria2.remove';
const PAUSE_METHOD : string = 'aria2.pause';
const PAUSE_ALL_METHOD : string = 'aria2.pauseAll';
const UNPAUSE_METHOD : string = 'aria2.unpause';
const UNPAUSE_ALL_METHOD : string = 'aria2.unpauseAll';
const TELL_STATUS : string = 'aria2.tellStatus';

class Client {
    address : string;
    dir : string;
    constructor(address : string) {
        this.address = address;
        this.dir = '';
    }
    setAddress(address : string) {
        this.address = address;
    }
    setDir(dir : string) {
        this.dir = dir;
    }
    addItem(uris : Array<string>) :Promise<any> {
        return this.callRPC(ADD_URI_METHOD, [uris, this.options()])
    }
    removeItem(gid : string) {
        return this.callRPC(REMOVE_METHOD, [gid])
    }
    pause(gid : string) {
        return this.callRPC(PAUSE_METHOD, [gid]);
    }
    active(gid : string) {
        return this.callRPC(UNPAUSE_METHOD, [gid]);
    }
    tellStatus(gid : string, keys : Array<string>) : Promise<any> {
        const params = [gid, keys]
        return this.callRPC(TELL_STATUS, params)
    }
    callRPC(method : string, params : Array<any>) :Promise<any> {
        const request : Aria2.Request = {
            jsonrpc: '2.0',
            id : '' ,
            method : method,
            params : params,
        };
        const reqJson : string = JSON.stringify(request);
        log.debug(reqJson);
        return axios.post(this.address, reqJson);
    }
    options() : Aria2.Options {
        const opt : Aria2.Options = {
            dir : this.dir
        };
        return opt
    }
}

const client : Client = new Client('')

export default client