<template>
    <div>
        <div class='main-tab'>
            <el-button class='item' size='mini' @click="centerDialogVisible = true"> + 新建</el-button>
            <el-button class="item no-border" size='mini' @click="activeItem">
                <i class="el-icon-bottom icon"></i>
            </el-button>
            <el-button class="item no-border" size='mini' @click="pauseItem">
                <i class="el-icon-video-pause icon"></i>
            </el-button>
            <el-button class="item no-border" size='mini' @click="deleteItem">
                <i class="el-icon-delete icon"></i>
            </el-button>
        </div>
        <!-- TODO: 设置对话框 -->
        <el-dialog v-model="centerDialogVisible" title="添加下载链接" :append-to-body="true" :modal="false" width="50%" center>
            <el-input v-model="urls" size="medium" resize="none" :rows="4" type="textarea"/>
            <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="submit">确定</el-button>
                <el-button @click="centerDialogVisible = false">取消</el-button>
            </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang='ts'>
import {reactive, toRefs} from 'vue'
import {useStore} from '@/store'
import {log} from '@/util/log'
import {client as aria2Client, Status} from '@/util/aria2'

export default {
    setup() {
        const store = useStore()
        const data = reactive({
            centerDialogVisible : false,
            urls : '',
            deleteItem : ()=> {
                const gid : string = store.state.selectGid;
                log.debug('delete:'+ gid)
                if (gid == '' || gid == null) {
                    return
                }
                const item = store.state.items[gid]
                if (item == null ) {
                    return
                }
                store.dispatch('removeGid', gid)
                aria2Client.removeItem(gid).then((resp)=> {
                    if (resp.status != 200) {
                        log.error(resp)
                        return
                    }
                })
            },
            activeItem: () => {
                const gid : string = store.state.selectGid;
                if (gid == '' || gid == null) {
                    return
                }
                const item = store.state.items[gid];
                if (item == null || item.status != Status.pause) {
                    return
                }
                aria2Client.active(gid);
            },
            pauseItem: () => {
                const gid : string = store.state.selectGid;
                if (gid == '' || gid == null) {
                    return
                }
                const item = store.state.items[gid];
                if (item == null || item.status != Status.active) {
                    return
                }
                aria2Client.pause(gid);
            },
            submit: () => {
                data.centerDialogVisible = false
                let list = data.urls.split(/[;|；]/)
                log.debug(list)
                aria2Client.addItem(list)
                .then((resp) => {
                    if (resp.status != 200) {
                        log.error(resp)
                        return
                    }
                    const data = resp.data
                    log.debug(data)
                    store.dispatch('addGid', data.result)
                })
                .catch((e)=>{
                    log.error(e)
                }) 
            }
        })
        return {
            ...toRefs(data)
        }
    }
}
</script>

<style lang="scss" scoped>
.main-tab {
    height: auto;
    display: flex;
    flex-direction: row;
    width: 100%;
    background: $background-color;
    border-bottom: solid 1px #e6e6e6;
}

.item {
    line-height: 24px;
    height: auto;
    width: auto;
    margin: 4px 0px 4px 12px;
    padding: 0 12px;
}

.item:focus:not(.item:hover) {
    background: $background-color;
}

.icon {
    margin: 8px 0px 4px 0px;
    font-size: 16px;
    width: 2em;
}

.no-border {
    border: none;
}
</style>