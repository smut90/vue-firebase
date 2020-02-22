<template>
    <div class="master-data-wrapper" :id=id>
<!--        <p style="visibility: hidden">ID: {{id}}</p>-->
        <div v-if=!masterData>
            <p>Loading ... </p>
        </div>
        <div v-else>
            <div class="add-master-data">
                <button type="submit" class="btn btn-secondary" @click.stop.prevent="addMasterData()" style="margin-top: 10px; margin-bottom: 10px">
                    <font-awesome-icon icon="puzzle-piece" size="lg" /> add master data
                </button>
            </div>
            <div class="display-master-data">
                <div class="row">
                    <div class="col-4">
                        <div class="list-group" id="list-tab" role="tablist" style="margin:10px">
                            <a :key="index" v-for="(argument, index) in masterData"
                               v-bind:class="[ activeTab === index ? 'list-group-item list-group-item-action active' : 'list-group-item list-group-item-action']"
                               id="list-home-list"
                               data-toggle="list"
                               v-bind:href="'#'+index"
                               role="tab"
                               style="margin-bottom: 10px; margin-top: 10px; border: 1px solid cadetblue"
                               @click.stop.prevent="setActiveTab(index)"
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
                                                  style="background: none; border: none; border-bottom: 1px dashed #424242; color: #c1c9d2"
                                                  v-model="argument.description"
                                                  :placeholder=replacePlaceholder(argument.description)></textarea>
                                    </div>
                                    <div style="margin-bottom: 10px; padding-bottom: 10px;">
                                        <label for="link" style="padding-bottom: 0; margin-bottom: 2px; font-size: 14px;">add url</label>
                                        <input id="link" class="form-control" type="text" maxlength="2048"
                                               style="background: none; border: none; border-bottom: 1px dashed #424242; color: #c1c9d2"
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
                    <div class="col-8">
                        <p class="lead">Master Data Details</p>
                        <div class="tab-content" id="nav-tabContent" style="border: 1px dashed cadetblue; padding: 15px">
                            <div v-if="!activeTab">
                                <small>click on a master data item to get details ...</small>
                            </div>
                            <div v-else :key="index" v-for="(argument, index) in masterData" v-bind:class="[ activeTab === index ? 'tab-pane fade show active' : 'tab-pane fade']" :id=index role="tabpanel" aria-labelledby="list-home-list">
                                <div class="detail-wrapper">
                                    <div class="detail-duration">
                                        <label class="detail-duration" for="duration">duration</label>
                                        <input class="form-control" id="duration" type="text" maxlength="10"
                                               v-model="argument.detail_data.duration"
                                               :placeholder=argument.detail_data.duration>
                                    </div>
                                    <div class="detail-duration">
                                        <label class="detail-duration" for="entry_name">entry name</label>
                                        <input class="form-control" id="entry_name" type="text" maxlength="10"
                                               v-model="argument.detail_data.entry_name"
                                               :placeholder=argument.detail_data.entry_name>
                                    </div>
                                    <div class="detail-entry-type">
                                        <label class="detail-duration" for="entry_type">entry type</label>
                                        <input class="form-control" id="entry_type" type="text" maxlength="10"
                                               v-model="argument.detail_data.entry_type"
                                               :placeholder=argument.detail_data.entry_type>
                                    </div>
                                    <div class="detail-extra-data">
                                        <label class="detail-duration" for="extra_data">extra data</label>
                                        <input class="form-control" id="extra_data" type="text" maxlength="10"
                                               v-model="argument.detail_data.extra_data"
                                               :placeholder=argument.detail_data.extra_data>
                                    </div>
                                    <div class="detail-repeat-count">
                                        <label class="detail-duration" for="repeat_count">repeat count</label>
                                        <input class="form-control" id="repeat_count" type="text" maxlength="10"
                                               v-model="argument.detail_data.repeat_count"
                                               :placeholder=argument.detail_data.repeat_count>
                                    </div>
                                    <div class="detail-value">
                                        <label class="detail-duration" for="value">value</label>
                                        <input class="form-control" id="value" type="text" maxlength="10"
                                               v-model="argument.detail_data.value"
                                               :placeholder=argument.detail_data.value>
                                    </div>

                                    <button type="submit" class="btn btn-outline-secondary" style="margin-top: 10px" @click.stop.prevent="onDetailSave(index, argument)">
                                        <font-awesome-icon icon="check" size="sm" /> done
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
            daysAgo(createdAt){
                return moment(createdAt).fromNow();
            },
            setActiveTab(id){
                this.activeTab = id;
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
            displayContents(id){
                return this.activeTab === id;
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
                    detail_data: {
                        duration: 0,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 0,
                        value: 0
                    },
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
