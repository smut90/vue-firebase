import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
const fb = require('./firebaseConfig.js');
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPuzzlePiece, faPencilAlt, faCheck, faLink } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
library.add(faPuzzlePiece, faPencilAlt, faCheck, faLink);
Vue.component('font-awesome-icon', FontAwesomeIcon);

// new Vue({
//   render: h => h(App),
// }).$mount('#app');

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


// import Vue from 'vue'
// import App from './App'
// import router from './router'
// import firebase from 'firebase'
// Vue.config.productionTip = false;
//
//
// const config = {
//     apiKey: "AIzaSyD4TKEWlwokXAXrsE8LvNz1Zf3qxcbGY5U",
//     authDomain: "rateme-5c4d7.firebaseapp.com",
//     databaseURL: "https://rateme-5c4d7.firebaseio.com",
//     projectId: "rateme-5c4d7"
// };
// firebase.initializeApp(config);
//
// new Vue({
//     router,
//     render: h => h(App),
// }).$mount('#app');
