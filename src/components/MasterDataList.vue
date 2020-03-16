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
<!--                    <div v-if="loading">-->
<!--                        <p>Loading...</p>-->
<!--                    </div>-->
                    <div class="list-group" id="list-tab" role="tablist" style="margin:10px">
                        <a :key="index" v-for="(argument, index) of getSortedMasterData()"
                           class="list-group-item list-group-item-action"
                           id="list-home-list"
                           data-toggle="list"
                           v-bind:href="'#'+index"
                           role="tab"
                           style="margin-bottom: 10px; margin-top: 10px; border: 1px solid cadetblue"
                           @click.stop.prevent="navigateToDetails(argument.id, argument.data)"
                           aria-controls="home">
                            <div class="d-flex w-100 justify-content-between">
                                <small>{{daysAgo(argument.data.created_at)}}</small>
                                <button v-if="enableEdit === argument.id" type="submit" class="btn btn-secondary btn-sm" @click.stop.prevent="doneEditMasterData(argument.id, argument.data)">
                                    <font-awesome-icon icon="check" size="lg" /> done
                                </button>
                                <button v-else type="submit" class="btn btn-secondary btn-sm" @click.stop.prevent="editMasterData(argument.id)">
                                    <font-awesome-icon icon="pencil-alt" size="lg" /> edit
                                </button>
                            </div>

                            <div v-if="editSlot === argument.id" style="padding-top: 10px">
                                <div style="margin-bottom: 10px; padding-bottom: 10px;">
                                    <label for="description" style="padding-bottom: 0; margin-bottom: 2px; font-size: 14px;">description</label>
                                    <textarea class="form-control" id="description" rows="2" maxlength="1024"
                                              style="background: none; border: none; border-bottom: 1px dashed #424242;"
                                              v-model="argument.data.description"
                                              :placeholder=replacePlaceholder(argument.data.description)></textarea>
                                </div>
                                <div style="margin-bottom: 10px; padding-bottom: 10px;">
                                    <label for="link" style="padding-bottom: 0; margin-bottom: 2px; font-size: 14px;">add url</label>
                                    <input id="link" class="form-control" type="text" maxlength="2048"
                                           style="background: none; border: none; border-bottom: 1px dashed #424242;"
                                           v-model="argument.data.external_file_url"
                                           :placeholder=replacePlaceholderUrl(argument.data.external_file_url)>
                                </div>
                            </div>
                            <div v-else style="padding-top: 10px">
                                <p style="margin-bottom: 10px">{{replaceDescPlaceholderReadView(argument.data.description)}}</p>
                                <div class="row">
                                    <div class="col-md-6">
                                        <li data-toggle="tooltip" data-placement="top" :title=replaceLinkPlaceholderReadView(argument.data.external_file_url) @click.stop.prevent="navigateTo(argument.data.external_file_url)" class="btn btn-dark btn-sm">
                                            <font-awesome-icon icon="link" size="sm" /> Link
                                        </li>
                                    </div>
                                    <div class="col-md-6 d-flex" style="justify-content: flex-end">
                                        <button type="submit" class="btn btn-danger btn-sm" @click.stop.prevent="removeSelected(argument.id)" style="margin-right: 5px;">
                                            <font-awesome-icon icon="trash-alt"/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
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
                enableEdit: false,
                loading: false
            }
        },
        computed: {
            ...mapGetters({
                getFbUserFromState: 'getFbUserFromState',
            })
        },
        props: {
            id: String,
            userInfo: Object,
            masterData: Object
        },
        methods: {
            removeSelected(id) {
                console.log('remove button clicked', id, this.masterData[id]);
                if (this.masterData[id]) {
                    delete this.masterData[id];

                    const fbUserPayload = {
                        id: uuid(),
                        userInfo: this.userInfo,
                        masterData: this.masterData
                    };

                    fb.usersCollection.doc(this.userInfo.uid).collection('master').doc(id)
                        .delete()
                        .catch(err => {
                            console.log(err)
                        });

                    this.$store.dispatch('setCurrentUserCollectionAction', fbUserPayload);
                }
            },
            navigateTo(link){
                window.location.href = link;
            },
            daysAgo(createdAt) {
                return moment(createdAt).fromNow();
            },
            navigateToDetails(id, masterData) {
                console.log('NAV,', id, this.enableEdit);
                if (this.enableEdit !== id) {
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
                console.log('EDIT', index);
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
            getSortedMasterData(){
                this.masterData = this.getFbUserFromState.masterData;
                const sortedMasterDataArray = Object.keys(this.masterData).map(id => {
                    return { id: id, data: this.masterData[id]};
                });

                sortedMasterDataArray
                    .sort(function(a,b) {
                        return b.data.seq_no - a.data.seq_no
                    });

                console.log('HERE 1 ==> ', sortedMasterDataArray);

                return sortedMasterDataArray
            },
            addMasterData(){
                console.log('adding new master data');
                this.loading = true;
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
                            repeat_count: 1,
                            value: 0,
                            seq_no: 1
                        }
                    ],
                    seq_no: (latestSeqNo + 1)
                };

                this.masterData[id] = newMasterData;

                const fbUserPayload = {
                    id: uuid(),
                    userInfo: this.userInfo,
                    masterData: this.masterData
                };

                this.$store.dispatch('setCurrentUserCollectionAction', fbUserPayload);

                fb.usersCollection.doc(this.userInfo.uid).collection('master').doc(id)
                    .set(newMasterData, {merge: true})
                    .catch(err => {
                        console.log(err)
                    });
            }
        }
    }
</script>

<style scoped>

</style>
