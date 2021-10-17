<template>
    <div class="header">
        <div class="app-name">
            Aria-light
        </div>
        <el-button-group class="btn-group">
            <!-- <el-button class="btn" >-</el-button>
            <el-button class="btn" >-</el-button> -->

            <el-button class="btn" icon='el-icon-close' @click="close"></el-button>
        </el-button-group>
    </div>
</template>
<script lang='ts'>
import { reactive, toRefs } from "vue";
import { closeApplication } from "@/electron/event";

export default {
    name : 'Header',
    setup() {
        const data = reactive({
            close : () => {
                closeApplication();
            }
        })
        const refData = toRefs(data)
        return {
            ...refData
        };
    }
}
</script>
<style lang="scss" scoped>
.header {
    display: flex;
    flex-direction: row;
    -webkit-app-region: drag;
}
.app-name {
    width: 18%;
    padding-right: 20px;
    text-align: center;
}
.btn-group {
     -webkit-app-region: none;
    position: absolute;
    right: 0px;
}
.btn {
    background: #E4E7ED;
    border: none;
    padding: 12px 12px;
    font-size: 16px;
}
.btn:focus:not(.btn:hover) {
    color: #606266;
}
</style>