import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";
import store from './modules/store';

//Load Vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
    plugins: [createPersistedState(
        {
            paths: ['store.activeMasterData']
        }
    )],
    modules: {
        store
    }
})
