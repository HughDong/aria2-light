import { InjectionKey } from 'vue'
import { createStore, Store , useStore as baseUseStore} from 'vuex'
import {Status, Item} from '@/util/aria2'
import { log } from '@/util/log'

export interface State {
    selectGid : string,
    gidList : Array<string>,
    items : Items,
}

export interface Items {
    [key : string] : Item
}

const GID_KEY = 'GID_KEY'

function storeLocalStorage(key : string, item : string) {
    const lists = localStorage.getItem(key)?.split(',') || []
    let exist : boolean = false;
    lists.forEach((gid : string)=> {
        if (gid == item) {
            exist = true
        }
    })
    if (exist) {
        return
    }
    lists.push(item)
    localStorage.setItem(key, lists.join(','))
}

function removeLocalStorage(key : string,  item : string) {
    const lists =  localStorage.getItem(key)?.split(',') || []
    const newList = lists.filter((value)=>{
        return value !== item
    })
    localStorage.setItem(key, newList.join(','))
}

const state : State = {
    selectGid : "",
    gidList : [],
    items : {}
}

const getters = {
    downloadingItems : (state : State) : Array<Item> => {
        const items : Array<Item> = new Array<Item>();
        Object.keys(state.items).forEach((gid:string)=>{
            const item : Item = state.items[gid]
            if (item.status == Status.completed) {
                return
            }
            items.push(item);
        })
        log.debug(items);
        return items
    },
    completedItems : (state : State) :Array<Item> => {
        const items : Array<Item> = new Array<Item>();
        Object.keys(state.items).forEach((gid : string)=> {
            const item : Item = state.items[gid];
            if (item.status != Status.completed) {
                return
            }
            items.push(item);
        })
        return items;
    }
}

const mutations = {
    ADD_GID: (state : State, item : string) => {
        state.gidList.push(item)
    },
    REMOVE_GID:(state: State, item : string) => {
        const newList = state.gidList.filter((value)=>{
            return value != item
        })
        state.gidList = newList
    },
    SET_SELECT_GID : (state : State, gid : string) => {
        state.selectGid = gid;
    },
    CLEAR_SELECT_GID: (state : State) => {
        state.selectGid = "";
    },
    SET_ITEM: (state : State, item : Item) => {
        state.items[item.gid] = item
    },
    REMOVE_ITEM: (state: State, gid : string) => {
        delete state.items[gid]
    }
}

const actions = {
    addGid({ commit } : any, gid : string , init = false) {
        if (gid == '') {
            return
        }
        storeLocalStorage(GID_KEY, gid)
        commit('ADD_GID', gid)
    },
    removeGid({ commit }: any, gid : string) {
        removeLocalStorage(GID_KEY, gid)
        commit('REMOVE_GID', gid)
        commit('REMOVE_ITEM', gid)
    },
    setSelectGid({commit } : any, gid : string) {
        commit('SET_SELECT_GID', gid);
    },
    clearSelectGid({commit}: any) {
        commit('CLEAR_SELECT_GID');
    },
    setItem: ({commit}: any, items : Items) => {
        commit('SET_ITEM', items)
    }
}

export const key : InjectionKey<Store<State>> = Symbol()

export const store = createStore(
    {
        state,
        getters,
        mutations,
        actions
    }
)

export function init() {
    const lists =  localStorage.getItem(GID_KEY)?.split(',') || []
    lists.forEach((gid: string) => {
        store.dispatch('addGid', gid);
    })
}

export function useStore() {
    return baseUseStore(key)
}
