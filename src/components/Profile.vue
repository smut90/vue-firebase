<template>
    <div class="container-fluid" style="background: whitesmoke; min-height: 100vh; padding-left: 0; padding-right: 0;">
        <NavBar />
        <div class="jumbotron" style="margin-bottom: 0; background: #1d4354; box-shadow: 0 8px 6px -6px black; padding: 30px; margin-top: 50px">
            <div class="container align-self-center">
                <div class="row">
                    <div id="col-start" class="col-xs-6 col-md-4 align-self-center"></div>
                    <div id="col-info" class="col-xs-6 col-md-4" style="text-align: center">
                        <h3 class="display-5" style="color: whitesmoke">Master Details</h3>
                        <small style="color: #b4bcc3">View your Master details</small>
                    </div>
                    <div id="col-end" class="col-xs-6 col-md-4 align-self-center"></div>
                </div>

            </div>
        </div>

        <div class="card horizontal" style="max-width:80%; padding: 20px; border: none; margin: 15px auto 0;" v-if="user">
            <MasterDataList :id=getFbUserFromState.id :user-info=firebaseData.userInfo :master-data=firebaseData.masterData />
        </div>

    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import NavBar from "./NavBar.vue";
    import firebase from "firebase";
    const fb = require('../firebaseConfig.js');
    import MasterDataList from "./MasterDataList";

    export default {
        data() {
            return {
                user: null,
                firebaseData: {},
            };
        },
        computed: {
            ...mapGetters({
                getFbUserFromState: 'getFbUserFromState',
            })
        },
        components: {
            NavBar,
            MasterDataList
        },
        methods: {
            getCurrentUserFirebaseData(uid, userPayload) {

                let userDocRef = fb.usersCollection.doc(uid);
                return userDocRef.get().then(user => {
                    console.log('fetch user firebase root info: ', user.data());

                    if (user.data()){
                        let masterSubCollectionRef = userDocRef.collection('master').orderBy("seq_no", "desc").get();
                        masterSubCollectionRef.then(snapshot => {
                            let masterDataCollectionForUser = {};
                            snapshot.forEach(doc => {
                                masterDataCollectionForUser[doc.id] = doc.data();
                            });

                            const fbUserPayload = {
                                userInfo: user.data(),
                                masterData: masterDataCollectionForUser
                            };

                            this.$store.dispatch('setCurrentUserCollectionAction', fbUserPayload);
                            this.firebaseData = fbUserPayload;

                            return fbUserPayload;
                        }).catch(err => {
                            console.log(err)
                        });

                    } else {
                        console.log('newly signed in user, hence initializing firebase');
                        this.initFirebaseForUser(userPayload);

                        const fbUserPayload = {
                            userInfo: userPayload,
                            masterData: {}
                        };
                        this.firebaseData = fbUserPayload;
                        this.$store.dispatch('setCurrentUserCollectionAction', fbUserPayload);
                    }

                }).catch(err => {
                    console.log(err)
                })

            },
            initFirebaseForUser(user){
                fb.usersCollection.doc(user.uid)
                    .set(
                        {
                            uid: user.uid,
                            displayName: user.displayName,
                            email: user.email,
                            photoURL: user.photoURL
                        }
                    ).catch(err => {
                        console.log(err)
                    })
            }
        },
        created() {
            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    const userPayload = {
                        uid: user.uid,
                        displayName: user.displayName,
                        email: user.email,
                        photoURL: user.photoURL
                    };
                    this.user = userPayload;
                    console.log('setting current user to: ', userPayload);
                    this.$store.dispatch('setCurrentUserAction', userPayload);

                    this.getCurrentUserFirebaseData(user.uid, userPayload).then(() => {
                        console.log('received firebase data for user')
                    }).catch(err => {
                        console.log(err)
                    });
                }
            });
        }
    };
</script>
