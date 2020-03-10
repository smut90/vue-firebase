<template>
    <div class="container-fluid" style="background: whitesmoke; min-height: 100vh; padding-left: 0; padding-right: 0;">
        <NavBar />
        <div class="jumbotron" style="margin-bottom: 0; background: #1d4354; box-shadow: 0 8px 6px -6px black; padding: 30px; margin-top: 50px">
            <div class="container align-self-center">
                <div class="row">
                    <div id="col-start" class="col-xs-6 col-md-4 align-self-center"></div>
                    <div id="col-info" class="col-xs-6 col-md-4" style="text-align: center">
                        <h4 class="display-5" style="color: whitesmoke">{{replaceDescPlaceholderReadView(getActiveMasterData.masterData.description)}}</h4>
                        <small style="color: #b4bcc3">Run Sequence</small>
                    </div>
                    <div id="col-end" class="col-xs-6 col-md-4 align-self-center"></div>
                </div>

            </div>
        </div>

        <div class="card horizontal" style="max-width:80%; padding: 20px; border: none; margin: 15px auto 0;" >

            <div class="container-fluid master-data-wrapper">
                <div class="row">
                    <div class="col-md-6" style="align-items: center">
                        <button type="submit" class="btn btn-light" @click.stop.prevent="navigateToDetails()" style="margin-top: 10px; margin-bottom: 10px">
                            <font-awesome-icon icon="hand-point-left" size="lg" /> return to details data
                        </button>
                    </div>
                </div>
<!--                <div class="row animation-1">-->

<!--                    <div class="col-md-12">-->
<!--                        <div class="element-1"></div>-->
<!--                    </div>-->
<!--                </div>-->
                <div class="row animation-2">
                    <div class="col-md-12">
                        <div class="element-2"></div>
<!--                        <div :key="index"  v-for="(argument, index) of getActiveMasterData.masterData.detail_data"></div>-->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import NavBar from "./NavBar.vue";

    export default {
        name: "RunSequence",
        components:{
            NavBar
        },
        computed: {
            ...mapGetters({
                getActiveMasterData: 'getActiveMasterData',
            })
        },
        methods: {
            navigateToDetails(){
                this.$router.push({ name: 'Details'});
            },
            replaceDescPlaceholderReadView(value){
                return value ? value : 'description section is empty';
            },
        }
    }
</script>

<style scoped>
    /*.element-1 {*/
    /*    height: 400px;*/
    /*    width: 400px;*/
    /*    background-color: red;*/
    /*    animation:*/
    /*            move 3s ease infinite alternate,*/
    /*            nudge 5s linear infinite alternate;*/
    /*    margin-right: auto;*/
    /*    margin-left: auto;*/
    /*}*/

    /*@keyframes nudge {*/
    /*    0%, 100% {*/
    /*        transform: translate(0, 0);*/
    /*    }*/

    /*    50% {*/
    /*        transform: translate(150px, 0);*/
    /*    }*/

    /*    80% {*/
    /*        transform: translate(-150px, 0);*/
    /*    }*/
    /*}*/

    /*animation-name: pulse;                    -> entry name   */
    /*animation-duration: 5s;                   -> duration     */
    /*animation-timing-function: ease-out;      */
    /*animation-delay: 0s;                      */
    /*animation-direction: alternate;           */
    /*animation-iteration-count: 5;             -> repeat count */
    /*animation-fill-mode: none;                */
    /*animation-play-state: running;            */
    .element-2 {
        margin-top: 10px;
        height: 400px;
        width: 400px;
        animation:
                pulse 2s ease-in 0s 5 none running,
                pulse2 1s ease-out 0s 5 none running;
        margin-right: auto;
        margin-left: auto;
    }

    @keyframes pulse {
        0% {
            background-color: #ffffff;
        }
        100% {
            background-color: #FF4136;
        }
    }

    @keyframes pulse2 {
        0% {
            background-color: #000000;
        }
        100% {
            background-color: #FF4136;
        }
    }
</style>
