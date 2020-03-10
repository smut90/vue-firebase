<template>
    <div>
        <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
            <a class="navbar-brand" href="#" style="font-size: 20px" @click="navigateToMaster()"><font-awesome-icon icon="arrow-circle-left" /> Back</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="true" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ml-auto">
                    <li v-show="user" class="nav-item">
                        <router-link class="nav-link" to="/profile"><img :src=user.photoURL width="30" height="30"  alt="" style="border-radius:50%;"> {{user.displayName}}</router-link>
                    </li>
                    <li v-show="user" class="nav-item">
                        <a class="nav-link" @click="signoutButtonPressed">Logout</a>
                    </li>
                </ul>
            </div>
        </nav>
        <div class="right-sidebar">
            <div class="container-fluid">
                <div class="row" style="padding-top: 15px;">
                    <div class="col-md-12">
                        <span>Preview Sequence</span>
                    </div>
                </div>
                <div class="row" style="margin-top: 10px;">
                    <div class="col-md-6 d-flex" style="justify-content: flex-start">
                        <button type="submit" class="btn btn-dark btn-sm" :disabled="processing" @click.stop.prevent="startProcessing()">
                            <p style="margin-bottom: 0"><font-awesome-icon icon="spinner" /><span style="padding-left: 5px">process</span></p>
                        </button>
                    </div>
                    <div class="col-md-6 d-flex" style="justify-content: flex-end">
                        <button type="submit" class="btn btn-dark btn-sm" :disabled="!playNow" @click.stop.prevent="playAll()" style="margin-right: 5px">
                            <p style="margin-bottom: 0"><font-awesome-icon icon="reply-all" /><span style="padding-left: 5px;">all</span></p>
                        </button>
                        <button type="submit" class="btn btn-dark btn-sm" :disabled="activeTab === null" @click.stop.prevent="playFrom()" style="margin-right: 5px">
                            <p style="margin-bottom: 0"><font-awesome-icon icon="reply" /><span style="padding-left: 5px">from</span></p>
                        </button>
                        <button type="submit" class="btn btn-dark btn-sm" :disabled="activeTab === null" @click.stop.prevent="playSelected()">
                            <p style="margin-bottom: 0"><font-awesome-icon icon="play-circle" /><span style="padding-left: 5px">selected</span></p>
                        </button>
                    </div>
                </div>
                <div class="row" style="align-items: center; margin-left: auto; margin-right: auto; width: 75vh; height: 75vh; margin-bottom: 10px; padding: 10px;">
                    <div v-if="processing">
                        <p>Processing...</p>
                    </div>
                    <div class="boxStyle" :style="box"></div>
                </div>

                <div class="row fixed-bottom" style="padding-left: 10px; padding-top: 10px; padding-bottom: 5px; margin-left: 60%; border-top: 1px dashed #1d4354">
                    <div id="col-duration" class="col-md-3">
                        <div class="detail-duration">
                            <input class="form-control"  type="text" maxlength="10"
                                   v-model="tempDuration"
                                   :placeholder=tempDuration>
                            <small class="form-text text-muted">duration</small>
                        </div>
                    </div>
                    <div id="col-re_count" class="col-md-2">
                        <div class="detail-repeat-count">
                            <input class="form-control" type="text" maxlength="10"
                                   v-model="tempRC"
                                   :placeholder=tempRC>
                            <small class="form-text text-muted">repeat count</small>
                        </div>
                    </div>
                    <div id="col-entries" class="col-md-3">
                        <div class="detail-duration">
                            <input class="form-control"  type="text" maxlength="10"
                                   v-model="tempEntries"
                                   :placeholder=tempEntries>
                            <small class="form-text text-muted">No of entries</small>
                        </div>
                    </div>
                    <div id="col-setup" class="col-md-4">
                        <button type="submit" class="btn btn-dark float-right btn-lg" style="font-size: 12px; border-radius: 0" @click.stop.prevent="addTestData()">
                            <font-awesome-icon icon="vial" /> setup data
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="container-fluid">
                <div class="row" style="padding: 10px">
                    <div v-if=!getActiveMasterData.masterData>
                        <p>Loading ... </p>
                    </div>
                    <div class="container-fluid" v-else>
                        <div class="row display-master-data">
                            <div class="col-md-12" style="margin-bottom: 40px">
                                <div class="fixed-top" style="color: rgba(255, 255, 255, 0.75); box-shadow: black 0 8px 6px -6px; margin-top: 61px; margin-right: 40%; background-color: rgb(29, 67, 84)">
                                    <div class="row" style="padding-top: 10px;">
                                        <div id="col-start" class="col-xs-6 col-md-4 align-self-center"></div>
                                        <div id="col-info" class="col-xs-6 col-md-4" style="text-align: center">
                                            <h5 style="color: whitesmoke; margin-bottom: 1px">
                                                {{replaceDescPlaceholderReadView(getActiveMasterData.masterData.description)}}
                                                <li data-toggle="tooltip" data-placement="top" :title=replaceLinkPlaceholderReadView(getActiveMasterData.masterData.external_file_url) @click.stop.prevent="navigateTo(getActiveMasterData.masterData.external_file_url)" class="btn btn-dark btn-sm">
                                                    <font-awesome-icon icon="link" size="sm" /> Link
                                                </li>
                                            </h5>
                                        </div>
                                        <div id="col-end" class="col-xs-6 col-md-4 align-self-center"></div>
                                    </div>
                                    <div class="row pointer" style="padding-left: 10px;" @click.stop.prevent="addDetailData()">
                                        <div class="col-md-10">
                                            <p style=" font-size: 18px; margin-bottom: 2px;">Sequence List</p>
                                        </div>
                                        <div class="col-md-2 d-flex" style="justify-content: flex-end; padding-right: 35px; margin-top: 10px">
                                            <p style="font-size: 14px; margin-bottom: 2px;"><font-awesome-icon icon="plus-circle"/> <span>Add</span></p>
                                        </div>
                                    </div>
                                    <div style="padding-left: 35px; padding-right: 25px">
                                        <div class="row detail-wrapper">
                                            <div id="col-sq-start-top" class="col-md-1 align-self-center">
                                                <div class="detail-duration">
                                                    <p class="form-text" style="color: rgb(173, 176, 179); font-size: 14px">Seq#</p>
                                                </div>
                                            </div>
                                            <div id="col-detail-start-top" class="col-md-6 align-self-center">
                                                <div class="detail-duration">
                                                    <p class="form-text" style="color: rgb(173, 176, 179); font-size: 14px">Descriptive Name</p>
                                                </div>
                                            </div>
                                            <div id="col-detail-mid-top" class="col-md-3 align-self-center">
                                                <div class="detail-duration">
                                                    <p class="form-text" style="color: rgb(173, 176, 179); font-size: 14px">Duration (ms)</p>
                                                </div>
                                            </div>
                                            <div id="col-detail-end-top" class="col-md-2 align-self-center">
                                                <div class="detail-repeat-count">
                                                    <p class="form-text" style="color: rgb(173, 176, 179); font-size: 14px">Repeat</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="list-group" id="list-tab" role="tablist" style="margin-top: 110px">
                                    <div :key="index"
                                         v-bind:class="[ activeTab === index ? 'active' : 'non-active']"
                                         v-for="(argument, index) of getActiveMasterData.masterData.detail_data"
                                         @click.stop.prevent="setActiveTab(index)"
                                         style="margin-bottom: 10px; margin-top: 15px; padding: 10px; border-radius: 4px">
                                        <div :ref="getRefId(index)" :id="getRefId(index)" class="detail-wrapper">
                                            <div class="row" style="margin-bottom: 15px; margin-top: 15px">
                                                <div id="col-sq-start" class="col-md-1 align-self-center">
                                                    <div class="detail-duration">
                                                        <input class="form-control" id="seq_no" type="text" maxlength="10"
                                                               v-model="argument.seq_no"
                                                               @change.prevent="enableUpdateButton(index)"
                                                               :placeholder=argument.seq_no>
                                                    </div>
                                                </div>
                                                <div id="col-detail-start" class="col-md-6 align-self-center">
                                                    <div class="detail-duration">
                                                        <input :id="'entry_name_' + getRefId(index)" class="form-control" type="text" maxlength="25"
                                                               v-model="argument.entry_name"
                                                               @change.prevent="enableUpdateButton(index)"
                                                               :placeholder=argument.entry_name>
                                                    </div>
                                                </div>
                                                <div id="col-detail-mid" class="col-md-3 align-self-center">
                                                    <div class="detail-duration">
                                                        <input class="form-control" id="duration" type="text" maxlength="10"
                                                               v-model="argument.duration"
                                                               @change.prevent="enableUpdateButton(index)"
                                                               :placeholder=argument.duration>
                                                    </div>
                                                </div>
                                                <div id="col-detail-end" class="col-md-2 align-self-center">
                                                    <div class="detail-repeat-count">
                                                        <input class="form-control" id="repeat_count" type="text" maxlength="10"
                                                               v-model="argument.repeat_count"
                                                               @change.prevent="enableUpdateButton(index)"
                                                               :placeholder=argument.repeat_count>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div id="col-placeholder" class="col-md-1 align-self-center"></div>
                                                <div id="col-detail-down-start" class="col-md-2 align-self-center">
                                                    <div class="detail-entry-type">
                                                        <select class="form-control" id="entry_type"
                                                                @change.prevent="enableUpdateButton(index)"
                                                                v-model="argument.entry_type">
                                                            <option value="0">off</option>
                                                            <option value="1">on</option>
                                                            <option value="2">blink</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div id="col-detail-down-mid" class="col-md-4 align-self-center">
                                                    <div class="detail-extra-data">
                                                        <input class="form-control" id="extra_data" type="text" maxlength="64"
                                                               v-model="argument.extra_data"
                                                               @change.prevent="enableUpdateButton(index)"
                                                               :placeholder=argument.extra_data>
                                                    </div>
                                                </div>
                                                <div id="col-detail-down-end" class="col-md-3 align-self-center">
                                                    <div class="detail-value">
                                                        <input class="form-control" id="value" type="text" maxlength="25"
                                                               v-model="argument.value"
                                                               @change.prevent="enableUpdateButton(index)"
                                                               :placeholder=argument.value>
                                                    </div>
                                                </div>
                                                <div id="col-detail-down-update" class="col-md-2 align-self-center">
                                                    <button type="submit" class="btn btn-dark float-right btn-lg" style="margin-top: 10px; font-size: 12px; border-radius: 0" @click.stop.prevent="onDetailSave(index, argument)" :disabled="!enableUpdate[index]">
                                                        <font-awesome-icon icon="wrench" /> update
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="fixed-bottom" style="background-color: white; padding-left: 10px; padding-top: 5px; padding-bottom: 5px; margin-right: 40%; border-top: 1px solid rgba(0, 0, 0, 0.06)">
                                    <button type="submit" class="btn btn-danger btn-sm" :disabled="activeTab === null" @click.stop.prevent="removeSelected()" style="margin-right: 5px;">
                                        <font-awesome-icon icon="trash-alt"/> remove
                                    </button>
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
    import firebase from "firebase";
    const fb = require('../firebaseConfig.js');

    export default {
        name: "MasterDataList",
        data() {
            return {
                user: null,
                activeTab: null,
                addMasterDataRecord: false,
                activeSeqNo: null,
                editSlot: null,
                enableEdit: null,
                enableUpdate: [],
                processing: false,
                playSequence: [],
                drawBox: null,
                boxId: null,
                animationString: '',
                playNow: false,
                enterClass: 'box',
                tempDuration: '1',
                tempRC: 1,
                tempEntries: 0,
                box: 'background-color: rgb(243, 246, 249);'
            }
        },
        created() {
            firebase.auth().onAuthStateChanged(user => {
                this.user = user;
            });
        },
        computed: {
            ...mapGetters({
                getActiveMasterData: 'getActiveMasterData',
            })
        },
        methods: {
            async boxStyle(){
                if (this.playSequence && this.playSequence.length > 0) {
                    this.start(0);
                }
            },
            blackBox() {
                this.box = 'background-color: #000';
            },
            whiteBox() {
                this.box = 'background-color: #fff';
            },
            originalBox() {
                this.box = 'background-color: rgb(243, 246, 249)';
            },
            async start(counter) {
                if(counter < this.playSequence.length) {
                    if (this.playSequence[counter].time > 0) {
                        if (this.playSequence[counter].color === '0xFFFFFF') {
                            this.whiteBox();
                            await this.wait(this.playSequence[counter].time);

                        } else {
                            this.blackBox();
                            await this.wait(this.playSequence[counter].time);

                        }
                    }
                    const next = counter + 1;
                    this.start(next);

                } else {
                    this.originalBox();
                }
            },
            wait(ms) {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(ms)
                    },ms)
                })
            },
            setActiveTab(tab){
                this.activeTab = tab;
            },
            enableUpdateButton(index) {
                this.enableUpdate[index] = true;
            },
            signoutButtonPressed(e) {
                e.stopPropagation();
                firebase.auth().signOut();
                this.$store.dispatch('cleanCurrentUserStateAction');
                this.$router.push({ name: "Login" });
            },
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
            replaceLinkPlaceholderReadView(value) {
                return value ? value : 'no external url added';
            },
            navigateTo(link){
                window.location.href = link;
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

                this.enableUpdate[index] = false;

                const payload = {
                    id: uuid(),
                    masterId: this.getActiveMasterData.masterId,
                    masterData: this.getActiveMasterData.masterData,
                    userInfo: this.getActiveMasterData.userInfo
                };
                this.$store.dispatch('setActiveMasterDataAction', payload);
            },
            async addDetailData() {
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

                await this.wait(1000);
                const index = this.getActiveMasterData.masterData.detail_data.length > 0 ? (this.getActiveMasterData.masterData.detail_data.length - 1) : 0;
                document.getElementById("entry_name_seq_" + index).focus();
            },
            addTestData(){
                console.log('start setting up test data');
                this.getActiveMasterData.masterData.detail_data = [];

                const tempData = [];
                const testEntries = parseInt(this.tempEntries);
                if (testEntries > 0) {
                    for(let i=0; i < testEntries; i++) {
                        const payload = {
                            duration: parseInt(this.tempDuration),
                            entry_name: "",
                            entry_type: 0,
                            extra_data: "",
                            repeat_count: parseInt(this.tempRC),
                            value: 0,
                            seq_no: i
                        };
                        tempData.push(payload);
                    }

                    this.getActiveMasterData.masterData.detail_data = tempData;

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

            },
            startProcessing() {
                console.log('start processing data');

                this.processing = true;
                this.playNow = false;
                const playbackSequence = [];

                if (this.getActiveMasterData.masterData.detail_data && this.getActiveMasterData.masterData.detail_data.length > 0) {
                    this.getActiveMasterData.masterData.detail_data.forEach((detail, i) => {
                        const durationInMillis = parseInt(detail.duration) * parseInt(detail.repeat_count);
                        const color = i%2 === 0 ? '0x000000': '0xFFFFFF';
                        const payload = {
                            time: durationInMillis,
                            color: color
                        };
                        playbackSequence.push(payload);
                    })
                }

                this.playSequence = playbackSequence;
                this.processing = false;
                this.playNow = true;
                this.enterClass = 'newBox'
            },
            playAll() {
                console.log('play button pressed');
                if (!this.processing && this.playSequence.length > 0) {
                    this.playNow = true;
                    this.boxStyle();
                }
            },
            playSelected() {
                console.log('play selected button pressed');
                if (this.activeTab !== null) {
                    const activeRow = this.getActiveMasterData.masterData.detail_data[this.activeTab];
                    const durationInMillis = parseInt(activeRow.duration) * parseInt(activeRow.repeat_count);
                    const color = this.activeTab % 2 === 0 ? '0x000000': '0xFFFFFF';
                    const payload = {
                        time: durationInMillis,
                        color: color
                    };
                    this.playSequence = [];
                    this.playSequence.push(payload);

                    this.boxStyle();
                }
            },
            playFrom() {
                console.log('play from button pressed');

                this.processing = true;
                this.playNow = false;
                const playbackSequence = [];

                if (this.getActiveMasterData.masterData.detail_data && this.getActiveMasterData.masterData.detail_data.length > 0 && this.activeTab !== null) {

                    for(let i = this.activeTab; i < this.getActiveMasterData.masterData.detail_data.length; i++) {
                        const detail = this.getActiveMasterData.masterData.detail_data[i];
                        const durationInMillis = parseInt(detail.duration) * parseInt(detail.repeat_count);
                        const color = i%2 === 0 ? '0x000000': '0xFFFFFF';
                        const payload = {
                            time: durationInMillis,
                            color: color
                        };
                        playbackSequence.push(payload);
                    }

                    this.playSequence = playbackSequence;
                    this.enterClass = 'newBox';
                    this.processing = false;

                    this.boxStyle();
                }
            },
            removeSelected() {
                console.log('remove selected button pressed');
                if (this.getActiveMasterData.masterData.detail_data && this.getActiveMasterData.masterData.detail_data.length > 0) {
                    this.getActiveMasterData.masterData.detail_data.splice(this.activeTab, 1);

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
            },
            focusInput(index) {
                const id = "entry_name_seq_" + index;
                console.log(id);
                document.getElementById("\""+ id +"\"").focus();
            },
            getRefId(index) {
                return 'seq_' + index;
            }
        }
    }
</script>


<style scoped>
    .boxStyle {
        margin-top: 10px; padding: 10px; width: 80vh; height: 75vh; background-color: #343a40;
    }
    .left-sidebar {
        position: fixed; top:60px; left: 0; width: 10%; height: 100%; background-color: rgb(29, 67, 84); border-right: 1px solid rgba(0,0,0,.07)
    }
    .right-sidebar {
        position: fixed; top:60px; right: 0; width: 40%; height: 100%; background-color: #fff; border-left: 1px solid rgba(0,0,0,.06)
    }
    .content {
        position: relative; top:60px; margin-right: 40%; height: 100%;
    }
    .active{
        background-color: #8c9298;
    }
    .non-active {
        background-color: whitesmoke;
    }
    .static-top {
        position: fixed; top:60px; height: 70px;
    }
    .pointer {
        cursor: pointer;
    }
    @keyframes fadeIn {
        from { opacity: 0; }
        to   { opacity: 1; }
    }
    @keyframes toWhite {
        from {background-color: #000000;}
        to {background-color: #ffffff;}
    }
    @keyframes toBlack {
        from {background-color: #ffffff;}
        to {background-color: #000000;}
    }
</style>
