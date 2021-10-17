import Downloading from '@/view/Downloading.vue'
import Complete from '@/view/Complete.vue'
import { createRouter, createWebHashHistory , Router} from 'vue-router' 

const routes = [
    {path: '/', component: Complete},
    {path: '/downloading', component: Downloading},
    {path: '/complete', component: Complete}
]

const router : Router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
