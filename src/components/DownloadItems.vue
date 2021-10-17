<template>
    <div class="items" @click="clearSelect">
        <div class= "item"  v-for="item in items" :key = "item.gid" @click.stop="select(item.gid)" @dblclick="toggle(item.gid)" :tabindex="item.gid">
            <div class='name'> {{ item.name }} </div>
            <div class="progress" v-show="downloading">
                <el-progress :percentage="item.percentage" :color="processColor" />
            </div>
            <div class="error" v-if="item.errorMessage != null"> {{item.errorMessage}}</div>
            <div class="info" v-else>
                <div class="size"> {{item.size}} </div>
                <div class='remain-time' v-show="downloading">  {{item.remainingTime }} </div>
                <div class='speed' v-show="downloading"> {{ item.downloadSpeed }} </div>
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
import { reactive, toRefs } from 'vue';
import {useStore} from '@/store'
import { client, Item, Status } from '@/util/aria2';
export default {
    props : {
        items : {
            type : Array,
            default() {
                return []
            }
        },
        downloading : {
            type : Boolean,
            default() {
                return false;
            }
        }
    },
    setup () {  
        const store = useStore()
        const data  = reactive({
            select : (gid : string) => {
                store.dispatch("setSelectGid", gid);
            },
            clearSelect: () => {
                console.log("clear select");
                store.dispatch("clearSelectGid");
            },
            toggle: (gid : string) => {
                const item : Item = store.state.items[gid]
                if (item == null) {
                    return
                }
                if (item.status == Status.active) {
                    client.pause(gid);
                } else if (item.status == Status.pause){
                    client.active(gid);
                }
            },
            processColor : "#409eff"
        })
        const refData = toRefs(data)
        return {
            ...refData
        }
    }

}
</script>

<style lang="scss" scoped>
.items {
    background-color: $background-color;
    display: flex;
    flex-direction: column;
    height: 100%;
}
.item {
    // height: 20%;
    line-height: 24px;
}
.item:focus, .item:hover {
    background: #eaf5ff;
}
.name {
    text-align: start;
    padding: 4px 12px 0px 12px;
    font-size: 15px;
}
.progress {
    margin-left: 6px;
}
.error {
    font-size: 14px;
    color: #F56C6C;
}
.info {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    font-size: 12px;
    line-height: 12px;
}
.info div {
    margin: 10px;
}
</style>