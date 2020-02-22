<template>

    <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ml-auto">
<!--                <li @click.stop.prevent="setActiveTab('home')" v-bind:class="[ activeTab === 'home' ? 'nav-item active' : 'nav-item']">-->
<!--                    <router-link class="nav-link" to="/" tag="a">Home</router-link>-->
<!--                </li>-->
<!--                <li v-show="user" @click.stop.prevent="setActiveTab('profile')" v-bind:class="[ activeTab === 'profile' ? 'nav-item active' : 'nav-item']">-->
<!--                    <router-link  class="nav-link" to="/profile">Profile</router-link>-->
<!--                </li>-->
                <li v-show="!user" class="nav-item">
                    <router-link class="nav-link" to="/login">Login</router-link>
                </li>
                <li v-show="user" class="nav-item">
                    <a class="nav-link" @click="signoutButtonPressed">Logout</a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
    import firebase from "firebase";
    export default {
        data() {
            return {
                user: null,
                activeTab: null
            };
        },
        created() {
            firebase.auth().onAuthStateChanged(user => {
                this.user = user;
            });
        },
        methods: {
            setActiveTab(tab){
                this.activeTab = tab;
            },
            signoutButtonPressed(e) {
                e.stopPropagation();
                firebase.auth().signOut();
                this.$store.dispatch('cleanCurrentUserStateAction');
                this.$router.push({ name: "Login" });
            }
        }
    };
</script>
