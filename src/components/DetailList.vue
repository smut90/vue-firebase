<template>
    <div class="container-fluid" style="background: whitesmoke; min-height: 100vh; padding-left: 0; padding-right: 0;">
        <NavBar />
        <div class="jumbotron" style="margin-bottom: 0; background: #1d4354; box-shadow: 0 8px 6px -6px black; padding: 30px; margin-top: 50px">
            <div class="container align-self-center">
                <div class="row">
                    <div id="col-start" class="col-xs-6 col-md-4 align-self-center"></div>
                    <div id="col-info" class="col-xs-6 col-md-4" style="text-align: center">
                        <h4 class="display-5" style="color: whitesmoke">{{replaceDescPlaceholderReadView(getActiveMasterData.masterData.description)}}</h4>
                        <small style="color: #b4bcc3">{{daysAgo(getActiveMasterData.masterData.created_at)}}</small>
                    </div>
                    <div id="col-end" class="col-xs-6 col-md-4 align-self-center"></div>
                </div>

            </div>
        </div>

        <div class="card horizontal" style="max-width:80%; padding: 20px; border: none; margin: 15px auto 0;" >

            <div class="container-fluid master-data-wrapper" :id=getActiveMasterData.id>
                <div v-if=!getActiveMasterData.masterData>
                    <p>Loading ... </p>
                </div>
                <div v-else>
                    <div class="row">
                        <div class="col-md-6" style="align-items: center">
                            <button type="submit" class="btn btn-light" @click.stop.prevent="navigateToMaster()" style="margin-top: 10px; margin-bottom: 10px">
                                <font-awesome-icon icon="hand-point-left" size="lg" /> return to master data
                            </button>
                        </div>
                        <div class="col-md-6">
                            <button type="submit" class="btn btn-secondary" @click.stop.prevent="runSequence()" style="margin-top: 10px; margin-bottom: 10px">
                                <font-awesome-icon icon="puzzle-piece" size="lg" /> Run Sequence
                            </button>
                            <button type="submit" class="btn btn-secondary float-right" @click.stop.prevent="addDetailData()" style="margin-top: 10px; margin-bottom: 10px">
                                <font-awesome-icon icon="puzzle-piece" size="lg" /> add detail
                            </button>
                        </div>
                    </div>
                    <div class="row display-master-data">

                        <div class="col-md-12">
                            <div class="list-group" id="list-tab" role="tablist">
                                <div :key="index" v-for="(argument, index) of getActiveMasterData.masterData.detail_data" style="margin-bottom: 10px; margin-top: 10px; border: 1px solid cadetblue; padding: 10px">
                                    <div class="detail-wrapper">
                                        <div class="row" style="margin-bottom: 15px; margin-top: 10px">
                                            <div id="col-sq-start" class="col-md-1 align-self-center">
                                                <div class="detail-duration">
                                                    <input class="form-control" id="seq_no" type="text" maxlength="10" style="max-width: 100px"
                                                           v-model="argument.seq_no"
                                                           :placeholder=argument.seq_no>
                                                    <small class="form-text text-muted">sequence #</small>
                                                </div>
                                            </div>
                                            <div id="col-detail-start" class="col-md-4 align-self-center">
                                                <div class="detail-duration">
                                                    <input class="form-control" id="entry_name" type="text" maxlength="25"
                                                           v-model="argument.entry_name"
                                                           :placeholder=argument.entry_name>
                                                    <small class="form-text text-muted">entry name</small>
                                                </div>
                                            </div>
                                            <div id="col-detail-mid" class="col-md-1 align-self-center">
                                                <div class="detail-duration">
                                                    <input class="form-control" id="duration" type="text" maxlength="10"
                                                           v-model="argument.duration"
                                                           :placeholder=argument.duration>
                                                    <small class="form-text text-muted">duration</small>
                                                </div>
                                            </div>
                                            <div id="col-detail-end" class="col-md-1 align-self-center">
                                                <div class="detail-repeat-count">
                                                    <input class="form-control" id="repeat_count" type="text" maxlength="10"
                                                           v-model="argument.repeat_count"
                                                           :placeholder=argument.repeat_count>
                                                    <small class="form-text text-muted">repeat count</small>
                                                </div>
                                            </div>
                                            <div id="col-detail-down-start" class="col-md-2 align-self-center">
                                                <div class="detail-entry-type">
                                                    <input class="form-control" id="entry_type" type="text" maxlength="25"
                                                           v-model="argument.entry_type"
                                                           :placeholder=argument.entry_type>
                                                    <small class="form-text text-muted">entry type</small>
                                                </div>
                                            </div>
                                            <div id="col-detail-down-mid" class="col-md-2 align-self-center">
                                                <div class="detail-extra-data">
                                                    <input class="form-control" id="extra_data" type="text" maxlength="64"
                                                           v-model="argument.extra_data"
                                                           :placeholder=argument.extra_data>
                                                    <small class="form-text text-muted">extra data</small>
                                                </div>
                                            </div>
                                            <div id="col-detail-down-end" class="col-md-1 align-self-center">
                                                <div class="detail-value">
                                                    <input class="form-control" id="value" type="text" maxlength="25"
                                                           v-model="argument.value"
                                                           :placeholder=argument.value>
                                                    <small class="form-text text-muted">value</small>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-md-12">
                                                <button type="submit" class="btn btn-outline-secondary float-right" style="margin-top: 10px" @click.stop.prevent="onDetailSave(index, argument)">
                                                    <font-awesome-icon icon="check" size="sm" /> update
                                                </button>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import {mapGetters} from 'vuex'
    const moment = require('moment');
    import uuid from 'uuid/v4';
    import NavBar from "./NavBar.vue";
    const fb = require('../firebaseConfig.js');

    export default {
        name: "MasterDataList",
        data() {
            return {
                addMasterDataRecord: false,
                activeSeqNo: null,
                editSlot: null,
                enableEdit: null
            }
        },
        components:{
            NavBar
        },
        computed: {
            ...mapGetters({
                getActiveMasterData: 'getActiveMasterData',
            })
        },
        methods: {
            daysAgo(createdAt) {
                return moment(createdAt).fromNow();
            },
            runSequence(){
                this.$router.push({ name: 'RunSequence'});
            },
            navigateToMaster(){
                this.$router.push({ name: 'Profile'});
            },
            seqNoChange(seqNo) {
                console.log("changing seq no to ", seqNo);
                this.getActiveMasterData.masterData.detail_data.sort(function (a, b) {
                    return a.seq_no - b.seq_no;
                });

                fb.usersCollection.doc(this.getActiveMasterData.userInfo.uid).collection('master').doc(this.getActiveMasterData.masterId)
                    .set(this.getActiveMasterData.masterData, {merge: true}).catch(err => {
                    console.log(err)
                });

                const payload = {
                    id: uuid(),
                    masterId: this.getActiveMasterData.masterId,
                    masterData: this.getActiveMasterData.masterData,
                    userInfo: this.getActiveMasterData.userInfo
                };
                this.$store.dispatch('setActiveMasterDataAction', payload);
            },
            editMasterData(index){
                this.editSlot = index;
                this.enableEdit = index
            },
            replacePlaceholder(value) {
                return value ? value : 'Start typing something ...'
            },
            replacePlaceholderUrl(value){
                return value ? value : 'http://...'
            },
            replaceDescPlaceholderReadView(value){
                return value ? value : 'description section is empty';
            },
            replaceLinkPlaceholderReadView(value){
                return value ? value : 'no external url added, press edit to add';
            },
            onDetailSave(index, detail) {
                console.log('saving data details ', index, detail);

                this.getActiveMasterData.masterData.detail_data[index] = detail;

                this.getActiveMasterData.masterData.detail_data.sort(function (a, b) {
                    return a.seq_no - b.seq_no;
                });

                fb.usersCollection.doc(this.getActiveMasterData.userInfo.uid).collection('master').doc(this.getActiveMasterData.masterId)
                    .set(this.getActiveMasterData.masterData, {merge: true}).catch(err => {
                    console.log(err)
                });

                const payload = {
                    id: uuid(),
                    masterId: this.getActiveMasterData.masterId,
                    masterData: this.getActiveMasterData.masterData,
                    userInfo: this.getActiveMasterData.userInfo
                };
                this.$store.dispatch('setActiveMasterDataAction', payload);
            },
            addDetailData() {
                console.log('adding new detail data');

                this.getActiveMasterData.masterData.detail_data.sort(function (a, b) {
                    return a.seq_no - b.seq_no;
                });
                const len = this.getActiveMasterData.masterData.detail_data.length;
                const lastIndex = len > 0 ? (len - 1) : 0;
                const highestExtSeqNo = lastIndex > 0 ? parseInt(this.getActiveMasterData.masterData.detail_data[lastIndex].seq_no) : 0;
                const newHighestSeqNo = highestExtSeqNo + 1;

                this.getActiveMasterData.masterData.detail_data.push({
                    duration: 0,
                    entry_name: "",
                    entry_type: 0,
                    extra_data: "",
                    repeat_count: 0,
                    value: 0,
                    seq_no: newHighestSeqNo
                });

                fb.usersCollection.doc(this.getActiveMasterData.userInfo.uid).collection('master').doc(this.getActiveMasterData.masterId)
                    .set(this.getActiveMasterData.masterData, {merge: true}).catch(err => {
                    console.log(err)
                });

                const payload = {
                    id: uuid(),
                    masterId: this.getActiveMasterData.masterId,
                    masterData: this.getActiveMasterData.masterData,
                    userInfo: this.getActiveMasterData.userInfo
                };
                this.$store.dispatch('setActiveMasterDataAction', payload);
            }
        }
    }
</script>

<style scoped>

</style>
