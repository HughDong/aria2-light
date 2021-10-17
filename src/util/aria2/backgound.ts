import client  from "./client";
import {log} from "@/util/log"
import {Result, Item, Status} from "./index"
import {convertSecondToString, convertSpeedToString, convertSizeToString} from '@/util/time'

export function initBackground(store : any) {
    setInterval(() => {
        const list = store.state.gidList
        list.forEach((gid:string)=>{
            const item : Item = store.state.items[gid]
            if (item != null && (item.status == Status.completed || item.status == Status.error)) {
                return
            }
            client.tellStatus(gid, ['status', 'totalLength', 'completedLength', 'downloadSpeed', 'uploadSpeed', 'files', 'dir', 'errorMessage'])
            .then((resp)=> {
                if (resp.status !== 200) {
                    log.error(resp)
                    return
                }
                if (resp.error != null) {
                    log.error(resp.error);
                    store.dispatch('removeGid', gid)
                }
               const result : Result = resp.data.result;  
                result.gid = gid;
                const pushItem : Item = processResult(result);
                log.debug(pushItem);
                store.dispatch('setItem', pushItem) 
            }).catch((reason : any)=> {
                log.error(reason)
                store.dispatch('removeGid', gid)
            })
        })
    }, 1000)
}

function processResult(result : Result) : Item {
    let percentage = (result.totalLength == 0 ? 0 : result.completedLength/result.totalLength) * 100
    percentage = Math.trunc(percentage)
    const remainTime : number = result.downloadSpeed == 0 ? 0 : (result.totalLength - result.completedLength) / result.downloadSpeed;
    let remainingTime : string = convertSecondToString(remainTime)
    let speed : string = convertSpeedToString(result.downloadSpeed);

    if (result.status == Status.pause) {
        remainingTime = '--:--:--';
        speed = 'pause'
    }

    const item : Item = {
        gid : result.gid,
        name : result.files[0].path.replace(result.dir, '').substring(1),
        status : result.status,
        downloadSpeed : speed,
        percentage : percentage,
        size : convertSizeToString(result.totalLength),
        remainingTime : remainingTime
    }
    if (result.status ==  Status.error) {
        item.errorMessage = "下载失败"
    }
    return item;
}
