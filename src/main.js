import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
const fb = require('./firebaseConfig.js');
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faVial, faPuzzlePiece, faPencilAlt, faCheck, faLink, faStream, faHandPointLeft, faSpinner, faPlayCircle, faPlus, faWrench, faArrowCircleLeft, faPlusCircle, faReply, faReplyAll, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
library.add(faVial, faPuzzlePiece, faPencilAlt, faCheck, faLink, faStream, faHandPointLeft, faSpinner, faPlayCircle, faPlus, faWrench, faArrowCircleLeft, faPlusCircle, faReply, faReplyAll, faTrashAlt);
Vue.component('font-awesome-icon', FontAwesomeIcon);

// handle page reloads
let app;
fb.auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      el: '#app',
      router,
      store,
      render: h => h(App)
    })
  }
});
