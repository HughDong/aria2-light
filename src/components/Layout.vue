<template>
    <el-container>
        <!-- TODO: Light加上icon, 和aside对齐 -->
        <el-header >
            <div class="app-name">
                Aria-light
            </div>
        </el-header>
        <el-container>
            <el-aside>
                <Aside/>
            </el-aside>
            <el-main>
                <router-view/>
            </el-main>
        </el-container>
    </el-container>
</template>

<script lang="ts">
import Aside from '@/components/Aside.vue'
import {initBackground} from '@/util/aria2'
import {useStore} from '@/store'


export default {
    name: "Layout",
    components: {
        Aside
    },
    setup() {
        const store = useStore();
        initBackground(store);
        return {}
    },
}
</script>

<style lang="scss" scoped>
.el-header {
    background-color: #E4E7ED;
    color: var(--el-text-color-primary);
    text-align: start;
    line-height: 60px;
}
.app-name {
    width: 18%;
    padding-right: 20px;
    text-align: center;
}
.el-aside {
  background-color: #d3dce6;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 100px;
  width: 20%;
  height: 100%;
  min-width: 89px;
}

.el-main {
  background-color: #e9eef3;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 160px;
  padding: 0;
  height: 100%;
}

.el-container {
    height: 100%;
    overflow: hidden;
}

</style>