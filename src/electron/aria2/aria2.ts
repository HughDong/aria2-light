import {spawn, ChildProcessWithoutNullStreams} from 'child_process'
import path from 'path';
import{log} from '@/util/log'

class Aria2Server {
    _aria2!: ChildProcessWithoutNullStreams;
    _isDevelopment : boolean = false;
    _abort : any;
    constructor() {
        this._isDevelopment = process.env.NODE_ENV !== 'production';
    }

    start() {
        const prefix = process.cwd();
        let filePath : string;
        if (this._isDevelopment) {
            filePath = path.join(prefix, 'app', 'aria2c.exe');
        } else {
            filePath = path.join(prefix, 'aria2c.exe');
        }
        
        const logPath : string = path.join(prefix,'aria2.log')
        this._aria2 = spawn(filePath, ['--enable-rpc=true', '--rpc-allow-origin-all=true', '--log=' + logPath]);
        this.aria2EventRegister()
    }
    stop() {
        this._aria2.killed || this._aria2.kill();
        log.info("kill aria2...")
    }

    aria2EventRegister() {
        this._aria2.stdout.on('data', (data)=>{
            const msg : string = data.toString().replace(/^\s*|\s*$/g,"")
            if (msg.length === 0) {
                return
            }
            log.info(msg)
        })
        this._aria2.stderr.on('data', (data)=>{
            const msg : string = data.toString().replace(/^\s*|\s*$/g,"")
            if (msg.length === 0) {
                return
            }
            log.info(msg)
        })
        this._aria2.on('exit', (code)=> {
            log.info('aria2 stop, code:%d', code)
        })
    }
}

const aria2Server = new Aria2Server();

export {aria2Server};