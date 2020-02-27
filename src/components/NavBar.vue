<template>
    <div class="container-fluid">
        <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
            <a class="navbar-brand" href="#"><font-awesome-icon icon="stream" size="lg" /> Prepare Sequence</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="true" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ml-auto">
                    <li v-show="user" class="nav-item">
                        <router-link class="nav-link" to="/profile"><img :src=user.photoURL width="30" height="30"  alt="" style="border-radius:50%;"> {{user.displayName}}</router-link>
                    </li>
                    <li v-show="!user" class="nav-item">
                        <router-link class="nav-link" to="/login">Login</router-link>
                    </li>
                    <li v-show="user" class="nav-item">
                        <a class="nav-link" @click="signoutButtonPressed">Logout</a>
                    </li>
                </ul>
            </div>
        </nav>

    </div>
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
