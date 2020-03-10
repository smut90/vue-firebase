import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login'
import Profile from './components/Profile'
import DetailList from './components/DetailList'
import RunSequence from './components/RunSequence'
import firebase from 'firebase'

Vue.use(Router);

let router = new Router({
        mode: 'history',

        routes: [
            {
                path: '*',
                redirect: '/profile'
            },
            {
                path: '/profile',
                name: 'Profile',
                component: Profile,
                meta: {
                    auth: true
                }
            },
            {
                path: '/details',
                name: 'Details',
                component: DetailList,
                props: true,
                meta: {
                    auth: true
                }
            },
            {
                path: '/run',
                name: 'RunSequence',
                component: RunSequence,
                meta: {
                    auth: true
                }
            },
            {
                path: '/login',
                name: 'Login',
                component: Login,
                meta: {
                    guest: true
                }

            }
        ]

    },

);


router.beforeEach((to, from, next) => {

    if (to.matched.some(record => record.meta.auth)) {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                next()
            } else {
                next({
                    path: "/login",
                })
            }
        })
    } else if (to.matched.some(record => record.meta.guest)) {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                next({
                    path: "/profile",
                })
            } else {
                next()
            }
        })

    } else {
        next()
    }

});

export default router
