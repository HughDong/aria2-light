import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import router  from './router'
import {store, key, init} from './store'
import {client as aria2Client } from './util/aria2'

aria2Client.setAddress('http://localhost:6800/jsonrpc')
aria2Client.setDir('E:/Download')
init()

createApp(App).use(router).use(store, key).use(ElementPlus).mount('#app')
