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
                <div class="row" style="align-items: center; padding: 10px;">
                    <div v-if="processing||loadingData" class="boxStyle d-flex justify-content-center" style="background-color: rgb(243, 246, 249); padding-top: 40%">
                        <div class="spinner-border" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                    <div v-else>
                        <div id ="container" style="background-color: rgb(243, 246, 249);">
                            <div id ="animate"></div>
                        </div>
                    </div>

                </div>
                <div class="row" style="margin-bottom: 15px;">
                    <div class="d-flex justify-content-center ml-auto mr-auto" >
                        <button type="submit" class="btn btn-outline-danger" :disabled="!continuePlaying" @click.stop.prevent="stopPlaying()">
                            <font-awesome-icon icon="stop"/> stop
                        </button>
                    </div>
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
                    <div v-else  class="container-fluid" style="padding-right: 0;">
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
                                <div class="list-group" id="list-tab" role="tablist" style="margin-top: 110px;">
                                    <virtual-list id="virtual-list-style" :size="40" :remain="8" style="height: 75vh; padding-right: 15px;">
                                        <div :key="index" :ref="getRefId(index)" :id="getRefId(index)"
                                             v-bind:class="[ activeTab === index ? 'active' : 'non-active']"
                                             v-for="(argument, index) of getActiveMasterData.masterData.detail_data"
                                             @click.stop.prevent="setActiveTab(index)"
                                             style="margin-bottom: 10px; margin-top: 15px; padding: 10px; border-radius: 4px; height: 140px">
                                            <div class="row" style="margin-bottom: 15px; margin-top: 15px">
                                                <div id="col-sq-start" class="col-md-1 align-self-center">
                                                    <div class="detail-duration">
                                                        <input class="form-control" id="seq_no" type="text" maxlength="10"
                                                               v-model="argument.seq_no"
                                                               style="padding-left: 5px"
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
                                    </virtual-list>
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
    import virtualList from 'vue-virtual-scroll-list';
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
                loadingData: false,
                playSequence: [],
                boxId: null,
                animationString: '',
                playNow: false,
                continuePlaying: false,
                tempDuration: '1',
                tempRC: 1,
                tempEntries: 0,
                accentColor: '#000',
                animSequence: [
                    {
                        duration: 17530,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 0,
                        seq_no: 1
                    },
                    {
                        duration: 35,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 256,
                        seq_no: 2
                    },
                    {
                        duration: 35,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 230,
                        seq_no: 3
                    },
                    {
                        duration: 35,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 205,
                        seq_no: 4
                    },
                    {
                        duration: 35,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 192,
                        seq_no: 5
                    },
                    {
                        duration: 35,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 179,
                        seq_no: 6
                    },
                    {
                        duration: 35,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 166,
                        seq_no: 7
                    },
                    {
                        duration: 35,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 154,
                        seq_no: 8
                    },
                    {
                        duration: 35,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 128,
                        seq_no: 9
                    },
                    {
                        duration: 35,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 115,
                        seq_no: 10
                    },
                    {
                        duration: 35,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 102,
                        seq_no: 11
                    },
                    {
                        duration: 35,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 90,
                        seq_no: 12
                    },
                    {
                        duration: 35,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 77,
                        seq_no: 13
                    },
                    {
                        duration: 35,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 64,
                        seq_no: 14
                    },
                    {
                        duration: 35,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 51,
                        seq_no: 15
                    },
                    {
                        duration: 35,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 38,
                        seq_no: 16
                    },
                    {
                        duration: 35,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 26,
                        seq_no: 17
                    },
                    {
                        duration: 35,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 13,
                        seq_no: 18
                    },
                    {
                        duration: 35,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 0,
                        seq_no: 19
                    },
                    {
                        duration: 35,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 0,
                        seq_no: 20
                    },
                    {
                        duration: 35,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 0,
                        seq_no: 21
                    },
                    {
                        duration: 26,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 256,
                        seq_no: 22
                    },
                    {
                        duration: 26,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 230,
                        seq_no: 23
                    },
                    {
                        duration: 26,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 205,
                        seq_no: 24
                    },
                    {
                        duration: 26,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 192,
                        seq_no: 25
                    },
                    {
                        duration: 26,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 179,
                        seq_no: 26
                    },
                    {
                        duration: 26,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 166,
                        seq_no: 27
                    },
                    {
                        duration: 26,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 154,
                        seq_no: 28
                    },
                    {
                        duration: 26,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 128,
                        seq_no: 29
                    },
                    {
                        duration: 26,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 115,
                        seq_no: 30
                    },
                    {
                        duration: 26,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 102,
                        seq_no: 31
                    },
                    {
                        duration: 26,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 90,
                        seq_no: 32
                    },
                    {
                        duration: 26,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 77,
                        seq_no: 33
                    },
                    {
                        duration: 26,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 64,
                        seq_no: 34
                    },
                    {
                        duration: 26,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 51,
                        seq_no: 35
                    },
                    {
                        duration: 26,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 38,
                        seq_no: 36
                    },
                    {
                        duration: 26,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 26,
                        seq_no: 37
                    },
                    {
                        duration: 26,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 13,
                        seq_no: 38
                    },
                    {
                        duration: 26,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 0,
                        seq_no: 39
                    },
                    {
                        duration: 26,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 0,
                        seq_no: 40
                    },
                    {
                        duration: 36,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 0,
                        seq_no: 41
                    },
                    {
                        duration: 180,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 128,
                        seq_no: 42
                    },
                    {
                        duration: 180,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 192,
                        seq_no: 43
                    },
                    {
                        duration: 340,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 256,
                        seq_no: 44
                    },
                    {
                        duration: 350,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 38,
                        seq_no: 45
                    },
                    {
                        duration: 530,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 128,
                        seq_no: 46
                    },
                    {
                        duration: 35,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 256,
                        seq_no: 47
                    },
                    {
                        duration: 35,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 230,
                        seq_no: 48
                    },
                    {
                        duration: 35,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 205,
                        seq_no: 49
                    },
                    {
                        duration: 35,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 192,
                        seq_no: 50
                    },
                    {
                        duration: 35,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 179,
                        seq_no: 51
                    },
                    {
                        duration: 35,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 166,
                        seq_no: 52
                    },
                    {
                        duration: 35,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 154,
                        seq_no: 53
                    },
                    {
                        duration: 35,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 128,
                        seq_no: 54
                    },
                    {
                        duration: 35,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 115,
                        seq_no: 55
                    },
                    {
                        duration: 35,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 102,
                        seq_no: 56
                    },
                    {
                        duration: 35,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 90,
                        seq_no: 57
                    },
                    {
                        duration: 35,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 77,
                        seq_no: 58
                    },
                    {
                        duration: 35,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 64,
                        seq_no: 59
                    },
                    {
                        duration: 35,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 51,
                        seq_no: 60
                    },
                    {
                        duration: 35,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 38,
                        seq_no: 61
                    },
                    {
                        duration: 35,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 26,
                        seq_no: 62
                    },
                    {
                        duration: 35,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 13,
                        seq_no: 63
                    },
                    {
                        duration: 35,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 0,
                        seq_no: 64
                    },
                    {
                        duration: 35,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 0,
                        seq_no: 65
                    },
                    {
                        duration: 35,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 0,
                        seq_no: 66
                    },
                    {
                        duration: 26,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 256,
                        seq_no: 67
                    },
                    {
                        duration: 26,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 230,
                        seq_no: 68
                    },
                    {
                        duration: 26,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 205,
                        seq_no: 69
                    },
                    {
                        duration: 26,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 192,
                        seq_no: 70
                    },
                    {
                        duration: 26,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 179,
                        seq_no: 71
                    },
                    {
                        duration: 26,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 166,
                        seq_no: 72
                    },
                    {
                        duration: 26,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 154,
                        seq_no: 73
                    },
                    {
                        duration: 26,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 128,
                        seq_no: 74
                    },
                    {
                        duration: 26,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 115,
                        seq_no: 75
                    },
                    {
                        duration: 26,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 102,
                        seq_no: 76
                    },
                    {
                        duration: 26,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 90,
                        seq_no: 77
                    },
                    {
                        duration: 26,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 77,
                        seq_no: 78
                    },
                    {
                        duration: 26,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 64,
                        seq_no: 79
                    },
                    {
                        duration: 26,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 51,
                        seq_no: 80
                    },
                    {
                        duration: 26,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 38,
                        seq_no: 81
                    },
                    {
                        duration: 26,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 26,
                        seq_no: 82
                    },
                    {
                        duration: 26,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 13,
                        seq_no: 83
                    },
                    {
                        duration: 26,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 0,
                        seq_no: 84
                    },
                    {
                        duration: 26,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 0,
                        seq_no: 84
                    },
                    {
                        duration: 36,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 0,
                        seq_no: 85
                    },
                    {
                        duration: 180,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 128,
                        seq_no: 86
                    },
                    {
                        duration: 180,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 192,
                        seq_no: 87
                    },
                    {
                        duration: 340,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 256,
                        seq_no: 88
                    },
                    {
                        duration: 350,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 38,
                        seq_no: 89
                    },
                    {
                        duration: 530,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 128,
                        seq_no: 90
                    },
                    {
                        duration: 180,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 256,
                        seq_no: 91
                    },
                    {
                        duration: 340,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 192,
                        seq_no: 92
                    },
                    {
                        duration: 360,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 128,
                        seq_no: 93
                    },
                    {
                        duration: 520,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 26,
                        seq_no: 93
                    },
                    {
                        duration: 180,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 256,
                        seq_no: 93
                    },
                    {
                        duration: 340,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 26,
                        seq_no: 94
                    },
                    {
                        duration: 360,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 128,
                        seq_no: 94
                    },
                    {
                        duration: 340,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 26,
                        seq_no: 94
                    },
                    {
                        duration: 111,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 256,
                        seq_no: 95
                    },
                    {
                        duration: 111,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 230,
                        seq_no: 96
                    },
                    {
                        duration: 111,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 205,
                        seq_no: 97
                    },
                    {
                        duration: 111,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 192,
                        seq_no: 98
                    },
                    {
                        duration: 111,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 179,
                        seq_no: 99
                    },
                    {
                        duration: 111,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 166,
                        seq_no: 100
                    },
                    {
                        duration: 111,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 154,
                        seq_no: 101
                    },
                    {
                        duration: 111,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 128,
                        seq_no: 102
                    },
                    {
                        duration: 111,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 115,
                        seq_no: 103
                    },
                    {
                        duration: 111,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 102,
                        seq_no: 104
                    },
                    {
                        duration: 111,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 90,
                        seq_no: 105
                    },
                    {
                        duration: 111,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 77,
                        seq_no: 106
                    },
                    {
                        duration: 111,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 64,
                        seq_no: 107
                    },
                    {
                        duration: 111,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 51,
                        seq_no: 108
                    },
                    {
                        duration: 111,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 38,
                        seq_no: 109
                    },
                    {
                        duration: 111,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 26,
                        seq_no: 110
                    },
                    {
                        duration: 111,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 13,
                        seq_no: 111
                    },
                    {
                        duration: 111,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 0,
                        seq_no: 112
                    },
                    {
                        duration: 111,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 0,
                        seq_no: 113
                    },
                    {
                        duration: 121,
                        entry_name: "",
                        entry_type: 0,
                        extra_data: "",
                        repeat_count: 1,
                        value: 0,
                        seq_no: 114
                    }
                ]
            }
        },
        components: {
            'virtual-list': virtualList,
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
            async boxStyle() {
                if (this.playSequence && this.playSequence.length > 0) {
                    console.log('START', new Date().getTime());
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
                if ((counter < this.playSequence.length) && this.continuePlaying) {
                    if (this.playSequence[counter].time > 0) {

                        document.querySelector('.boxStyle').style.backgroundColor = this.playSequence[counter].color;
                        await this.wait((this.playSequence[counter].time));
                    }
                    this.start(counter + 1);

                } else {
                    document.querySelector('.boxStyle').style.backgroundColor = 'rgb(243, 246, 249)';
                }
            },
            wait(ms) {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve()
                    }, ms)
                })
            },
            setActiveTab(tab) {
                this.activeTab = tab;
            },
            enableUpdateButton(index) {
                this.enableUpdate[index] = true;
            },
            signoutButtonPressed(e) {
                e.stopPropagation();
                firebase.auth().signOut();
                this.$store.dispatch('cleanCurrentUserStateAction');
                this.$router.push({name: "Login"});
            },
            daysAgo(createdAt) {
                return moment(createdAt).fromNow();
            },
            navigateToMaster() {
                this.$router.push({name: 'Profile'});
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
            editMasterData(index) {
                this.editSlot = index;
                this.enableEdit = index
            },
            replacePlaceholder(value) {
                return value ? value : 'Start typing something ...'
            },
            replacePlaceholderUrl(value) {
                return value ? value : 'http://...'
            },
            replaceDescPlaceholderReadView(value) {
                return value ? value : 'description section is empty';
            },
            replaceLinkPlaceholderReadView(value) {
                return value ? value : 'no external url added';
            },
            navigateTo(link) {
                window.location.href = link;
            },
            onDetailSave(index, detail) {
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
                    repeat_count: 1,
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
            async addTestData() {
                // console.log('start setting up test data');
                this.getActiveMasterData.masterData.detail_data = [];

                this.loadingData = true;
                // const tempData = [];
                // const testEntries = parseInt(this.tempEntries);
                // if (testEntries > 0) {
                //     for(let i=0; i < testEntries; i++) {
                //         const payload = {
                //             duration: parseInt(this.tempDuration),
                //             entry_name: "",
                //             entry_type: 0,
                //             extra_data: "",
                //             repeat_count: parseInt(this.tempRC),
                //             value: 0,
                //             seq_no: i
                //         };
                //         tempData.push(payload);
                //     }

                // this.getActiveMasterData.masterData.detail_data = tempData;
                this.getActiveMasterData.masterData.detail_data = this.animSequence;

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
                await this.wait(1500);
                this.loadingData = false;
                // }

            },
            async startProcessing() {
                this.processing = true;
                this.playNow = false;
                const playbackSequence = [];
                let timeout;

                if (this.getActiveMasterData.masterData.detail_data && this.getActiveMasterData.masterData.detail_data.length > 0) {
                    this.getActiveMasterData.masterData.detail_data.forEach((detail, i) => {
                        const durationInMillis = parseInt(detail.duration) * parseInt(detail.repeat_count);

                        if (i === 0)  {
                            timeout = durationInMillis;
                        } else {
                            timeout += durationInMillis;
                        }

                        const color_level = parseInt(detail.value);
                        const color = 'rgb(0, 0, ' + (255 / 100) * color_level + ')';
                        const payload = {
                            timeout: timeout,
                            color: color
                        };
                        playbackSequence.push(payload);
                    })
                }

                const endTime = (timeout + 10);
                const endPayload = {
                    timeout: endTime,
                    color: 'rgb(243, 246, 249)'
                };
                playbackSequence.push(endPayload);

                this.playSequence = playbackSequence;
                await this.wait(20);
                this.processing = false;
                this.playNow = true;
            },
            playAll() {
                if (!this.processing && this.playSequence.length > 0) {
                    this.playNow = true;
                    this.continuePlaying = true;
                    this.myMove()
                }
            },
            playSelected() {
                if (this.activeTab !== null) {
                    this.playSequence = [];
                    const activeRow = this.getActiveMasterData.masterData.detail_data[this.activeTab];
                    const durationInMillis = parseInt(activeRow.duration) * parseInt(activeRow.repeat_count);
                    const color_level = parseInt(activeRow.value);
                    const color = 'rgb(0, 0, ' + (255 / 100) * color_level + ')';
                    const payload = {
                        timeout: durationInMillis,
                        color: color
                    };

                    const endTime = (durationInMillis + 10);
                    const endPayload = {
                        timeout: endTime,
                        color: 'rgb(243, 246, 249)'
                    };

                    this.playSequence.push(payload);
                    this.playSequence.push(endPayload);
                    this.continuePlaying = true;
                    this.myMove();
                }
            },
            async playFrom() {
                this.processing = true;
                this.playNow = false;
                this.playSequence = [];
                const playbackSequence = [];
                let timeout;

                if (this.getActiveMasterData.masterData.detail_data && this.getActiveMasterData.masterData.detail_data.length > 0 && this.activeTab !== null) {

                    for (let i = this.activeTab; i < this.getActiveMasterData.masterData.detail_data.length; i++) {
                        const detail = this.getActiveMasterData.masterData.detail_data[i];
                        const durationInMillis = parseInt(detail.duration) * parseInt(detail.repeat_count);

                        if (i === this.activeTab)  {
                            timeout = durationInMillis;
                        } else {
                            timeout += durationInMillis;
                        }

                        const color_level = parseInt(detail.value);
                        const color = 'rgb(0, 0, ' + (255 / 100) * color_level + ')';
                        const payload = {
                            timeout: timeout,
                            color: color
                        };
                        playbackSequence.push(payload);
                    }

                    const endTime = (timeout + 10);
                    const endPayload = {
                        timeout: endTime,
                        color: 'rgb(243, 246, 249)'
                    };
                    playbackSequence.push(endPayload);

                    await this.wait(20);
                    this.playSequence = playbackSequence;
                    this.processing = false;
                    this.continuePlaying = true;
                    this.myMove();
                }
            },
            removeSelected() {
                // console.log('remove selected button pressed');
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
            stopPlaying() {
                this.continuePlaying = false;
            },
            getRefId(index) {
                return 'seq_' + index;
            },
            myMove() {
                const sequenceList = this.playSequence;
                let playBackIndex = 0;
                const numEntries = sequenceList.length;
                let startTime = new Date();
                let endMillis = 0;
                let color;
                let currentColor;

                if (numEntries > 0) {
                    endMillis = sequenceList[playBackIndex].timeout;
                    color = sequenceList[playBackIndex].color;
                }

                let id = setInterval(() => {
                    if (this.continuePlaying) {
                        frame();
                    }
                }, 1);

                function frame() {
                    let elem = document.getElementById("container");
                    let currentTime = new Date();
                    if ((playBackIndex < numEntries)) {
                        while (((currentTime - startTime) > endMillis) &&
                        (playBackIndex < numEntries)) {
                            endMillis = sequenceList[playBackIndex].timeout;
                            color = sequenceList[playBackIndex].color;
                            playBackIndex++;
                        }
                        if (color !== currentColor) {
                            elem.style.background = color;
                            currentColor = color;
                        }
                    } else {
                        clearInterval(id);
                    }
                }
            }
        }
    }
</script>


<style scoped>
    #virtual-list-style::-webkit-scrollbar {
        background-color: rgb(243, 246, 249);
        border-radius: 10px;
        width: 15px;
    }
    #virtual-list-style::-webkit-scrollbar-thumb {
        background-color: #4f566b;
        border-radius: 10px;
    }
    #container {
        width: 75vh;
        height: 68vh;
        background: rgb(243, 246, 249);
    }
    .scroller {
        height: 100%;
    }
    .boxStyle {
        /*margin-top: 10px; padding: 10px; width: 80vh; height: 68vh; background-color: #343a40;*/
        /*margin-top: 10px; padding: 10px; width: 200px; height: 200px;*/
        margin-top: 10px; padding: 10px; width: 80vh; height: 68vh;
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
    .box-again {
        animation: toBlack 10ms ease-in;
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
