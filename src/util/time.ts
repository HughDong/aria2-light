
export function convertSecondToString(time : number) : string {
    time = Math.trunc(time);
    const second = time % 60;
    time = Math.trunc(time / 60);
    const minutes = time % 60;
    time = Math.trunc(time / 60);
    const hour = time % 60;
    time = Math.trunc(time / 60);
    if (time == 0) {
        return hour + ":" + minutes + ":" + second;
    }
    
    const day = Math.trunc(time / 24); 
    return "大于 " + day + " 天";
}

// input byte/sec
export function convertSpeedToString(speed : number) : string {
    return parseSize(speed) + "/s";
}

export function convertSizeToString(size : number) : string {
    return parseSize(size);
}

function parseSize(size : number) : string {
    const unit = ['B', 'KB', 'MB', 'GB'];
    let index = 0;
    size = Math.trunc(size);

    while (size > 1024) {
        if (index == 3) {
            break;
        }
        size = size/1024;
        index++;
    }
    return size.toFixed(2) + " " + unit[index]
}