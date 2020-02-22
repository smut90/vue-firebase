import Vue from 'vue';
import Vuex from 'vuex';
import store from './modules/store';

//Load Vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
    modules: {
        store
    }
})
