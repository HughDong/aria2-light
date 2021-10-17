declare module Aria2 {
    interface Request {
        jsonrpc: string
        id : string
        method : string
        params : any
    }

    // interface Error {
    //     code : number
    //     message : string
    // }
    
    // interface Response {

    //     jsonrpc: string
    //     id: string
    //     error :  Error
    //     result : string
    // }

    interface Options {
        dir : string
    }
}