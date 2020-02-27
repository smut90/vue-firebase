<template>
    <div class="container-fluid master-data-wrapper" :id=id>
        <div v-if=!masterData>
            <p>Loading ... </p>
        </div>
        <div v-else>
            <div class="row add-master-data">
                <button type="submit" class="btn btn-secondary" @click.stop.prevent="addMasterData()" style="margin-top: 10px; margin-bottom: 10px">
                    <font-awesome-icon icon="puzzle-piece" size="lg" /> add master data
                </button>
            </div>
            <div class="row display-master-data">
                <div class="col-md-12">
                    <div class="list-group" id="list-tab" role="tablist" style="margin:10px">
                        <a :key="index" v-for="(argument, index) in masterData"
                           v-bind:class="[ activeTab === index ? 'list-group-item list-group-item-action active' : 'list-group-item list-group-item-action']"
                           id="list-home-list"
                           data-toggle="list"
                           v-bind:href="'#'+index"
                           role="tab"
                           style="margin-bottom: 10px; margin-top: 10px; border: 1px solid cadetblue"
                           @click.stop.prevent="navigateToDetails(index, argument)"
                           aria-controls="home">
                            <div class="d-flex w-100 justify-content-between">
                                <small>{{daysAgo(argument.created_at)}}</small>
                                <button v-if="enableEdit === index" type="submit" class="btn btn-secondary btn-sm" @click.stop.prevent="doneEditMasterData(index, argument)">
                                    <font-awesome-icon icon="check" size="lg" /> done
                                </button>
                                <button v-else type="submit" class="btn btn-secondary btn-sm" @click.stop.prevent="editMasterData(index)">
                                    <font-awesome-icon icon="pencil-alt" size="lg" /> edit
                                </button>
                            </div>

                            <div v-if="editSlot === index" style="padding-top: 10px">
                                <div style="margin-bottom: 10px; padding-bottom: 10px;">
                                    <label for="description" style="padding-bottom: 0; margin-bottom: 2px; font-size: 14px;">description</label>
                                    <textarea class="form-control" id="description" rows="2" maxlength="1024"
                                              style="background: none; border: none; border-bottom: 1px dashed #424242;"
                                              v-model="argument.description"
                                              :placeholder=replacePlaceholder(argument.description)></textarea>
                                </div>
                                <div style="margin-bottom: 10px; padding-bottom: 10px;">
                                    <label for="link" style="padding-bottom: 0; margin-bottom: 2px; font-size: 14px;">add url</label>
                                    <input id="link" class="form-control" type="text" maxlength="2048"
                                           style="background: none; border: none; border-bottom: 1px dashed #424242;"
                                           v-model="argument.external_file_url"
                                           :placeholder=replacePlaceholderUrl(argument.external_file_url)>
                                </div>
                            </div>
                            <div v-else style="padding-top: 10px">
                                <p style="margin-bottom: 10px">{{replaceDescPlaceholderReadView(argument.description)}}</p>
                                <li data-toggle="tooltip" data-placement="top" :title=replaceLinkPlaceholderReadView(argument.external_file_url) @click.stop.prevent="navigateTo(argument.external_file_url)" class="btn btn-dark btn-sm">
                                    <font-awesome-icon icon="link" size="sm" /> Link
                                </li>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import uuid from 'uuid/v4';
    const moment = require('moment');
    const fb = require('../firebaseConfig.js');

    export default {
        name: "MasterDataList",
        data() {
            return {
                addMasterDataRecord: false,
                activeTab: null,
                editSlot: null,
                enableEdit: null
            }
        },
        props: {
            id: String,
            userInfo: Object,
            masterData: Object
        },
        methods: {
            navigateTo(link){
                window.location.href = link;
            },
            daysAgo(createdAt) {
                return moment(createdAt).fromNow();
            },
            navigateToDetails(id, masterData) {
                if (!this.enableEdit) {
                    this.activeTab = id;
                    const payload = {
                        id: uuid(),
                        masterId: id,
                        masterData: masterData,
                        userInfo: this.userInfo
                    };
                    this.$store.dispatch('setActiveMasterDataAction', payload);
                    this.$router.push({ name: 'Details'});
                }

            },
            editMasterData(index){
                this.editSlot = index;
                this.enableEdit = index
            },
            doneEditMasterData(masterId, masterData){
                this.editSlot = null;
                this.enableEdit = null;

                const fbUserPayload = {
                    id: uuid(),
                    userInfo: this.userInfo,
                    masterData: this.masterData
                };

                fb.usersCollection.doc(this.userInfo.uid).collection('master').doc(masterId)
                    .set(masterData, {merge: true}).catch(err => {
                    console.log(err)
                });

                this.$store.dispatch('setCurrentUserCollectionAction', fbUserPayload);
            },
            replacePlaceholder(value){
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
            onDetailSave(masterId, masterData) {
                console.log('saving master data details ', masterId, masterData);
                const fbUserPayload = {
                    id: uuid(),
                    userInfo: this.userInfo,
                    masterData: this.masterData
                };

                fb.usersCollection.doc(this.userInfo.uid).collection('master').doc(masterId)
                    .set(masterData, {merge: true}).catch(err => {
                    console.log(err)
                });

                this.$store.dispatch('setCurrentUserCollectionAction', fbUserPayload);
            },
            addMasterData(){
                console.log('adding new master data');
                const id = uuid();
                let latestSeqNo = Object.keys(this.masterData).length;

                const newMasterData = {
                    created_at: moment().format(),
                    description: "",
                    external_file_url: "",
                    detail_data: [
                        {
                            duration: 0,
                            entry_name: "",
                            entry_type: 0,
                            extra_data: "",
                            repeat_count: 0,
                            value: 0,
                            seq_no: 1
                        }
                    ],
                    seq_no: (latestSeqNo + 1)
                };
                fb.usersCollection.doc(this.userInfo.uid).collection('master').doc(id)
                    .set(newMasterData, {merge: true})
                    .catch(err => {
                        console.log(err)
                    });
                this.masterData[id] = newMasterData;
                const fbUserPayload = {
                    id: uuid(),
                    userInfo: this.userInfo,
                    masterData: this.masterData
                };
                this.$store.dispatch('setCurrentUserCollectionAction', fbUserPayload);
            }
        }
    }
</script>

<style scoped>

</style>
