<template>
    <el-menu
        default-active="downloading"
        @select="handleSelect"
    >
        <el-menu-item index="downloading">下载中</el-menu-item>
        <el-menu-item index="complete">已完成</el-menu-item>
        <el-menu-item index="recyle">回收站</el-menu-item>
    </el-menu>
</template>

<script lang="ts">
import { log } from '@/util/log'
import { useRouter } from 'vue-router'
export default {
    name : "Aside",
    setup() {
        const router = useRouter();
        const handleSelect = (key: string) => {
            const path : string = '/' + key
            log.log('go to ' + path )
            router.push(path);
        }

        return {
            handleSelect
        }
    }
}
</script>

<style lang="scss" scoped>
.el-menu {
    height: 100%;
}
</style>