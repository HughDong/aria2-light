<template>
    <section class="home">
        <Tab />
        <DownloadItems :items="downloadingItems" :downloading="true"/>
    </section>
</template>

<script lang='ts'>
import Tab from '@/components/Tab.vue'
import {mapGetters} from 'vuex';
import DownloadItems from '@/components/DownloadItems.vue'

export default {
    name : 'Downloading',
    components: {
        Tab,
        DownloadItems
    },
    computed: {
        ...mapGetters([
            'downloadingItems'
        ])
    },
    setup() {

        return {}
    }
}
</script>

<style lang="scss" scoped>
.downloading {
    background-color: $background-color;
    height: 100%;
}
.home {
    height: 100%;
    display: flex;
    flex-direction: column;
}
.downloading {
    display: flex;
    flex-direction: column;
    height: 100%;
}
</style>