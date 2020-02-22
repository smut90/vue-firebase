<template>
    <div>
        <div v-if="user">
            <NavBar />
        </div>
        <div v-else>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav mx-auto">
                        <li class="nav-item active">
                            <a class="nav-link">Master Detail App</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
        <div class="container">
            <div class="row" style="margin-top: 100px">
                <div id="col-start" class="col-4 align-self-center"></div>
                <div id="col-info" class="col-4 align-self-center">
                    <div class="card">
                        <h5 class="card-header">Log in</h5>
                        <div class="card-body">
                            <section id="firebaseui-auth-container"></section>
                        </div>
                    </div>
                </div>
                <div id="col-end" class="col-4 align-self-center"></div>
            </div>
        </div>

    </div>
</template>

<script>
    import NavBar from "./NavBar.vue";
    import firebase from "firebase";
    import * as firebaseui from "firebaseui";
    import "firebaseui/dist/firebaseui.css";
    export default {
        name: "Login",
        data() {
            return {};
        },
        components: {
            NavBar
        },
        mounted() {
            let ui = firebaseui.auth.AuthUI.getInstance();
            if (!ui) {
                ui = new firebaseui.auth.AuthUI(firebase.auth());
            }
            let uiConfig = {
                signInSuccessUrl: "/profile", // This redirect can be achived by route using callback.
                signInFlow: "popup",
                signInOptions: [
                    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
                    firebase.auth.GoogleAuthProvider.PROVIDER_ID
                ]
            };
            ui.start("#firebaseui-auth-container", uiConfig);
        }
    };
</script>

<style>
</style>
