const fb = require('../../firebaseConfig.js');

const state = {
    userProfile: {},
    firebase: {},
    activeMasterData: {}
};

const getters = {
    getFbUserFromState: (state) => {
        console.log('fetching fb user from state');
        return state.firebase;
    },
    getActiveMasterData: (state) => {
        console.log('fetching active master data from state');
        return state.activeMasterData;
    }
};

const actions = {
    fetchUserProfile({ commit, state }) {
        fb.usersCollection.doc(state.userProfile.uid).get().then(res => {
            commit('setUserProfile', res.data())
        }).catch(err => {
            console.log(err)
        })
    },
    setCurrentUserAction({commit}, payload) {
        console.log('calling setCurrentUserAction: ', payload);
        commit('setUserProfile', payload);
    },
    setCurrentUserCollectionAction({commit}, payload) {
        console.log('calling setCurrentUserCollectionAction: ', payload);
        commit('setUserCollection', payload);
    },
    setActiveMasterDataAction({commit}, payload) {
        console.log('calling setActiveMasterDataAction: ', payload);
        commit('setActiveMasterData', payload);
    },
    setLatestSeqNoAction({commit}, payload) {
        console.log('calling setLatestSeqNoAction: ', payload);
        commit('setLatestSeqNo', payload);
    },
    cleanCurrentUserStateAction({commit}) {
        console.log('calling cleanCurrentUserStateAction: ');
        commit('cleanUserState');
    },
};

const mutations = {
    setUserProfile(state, val) {
        state.userProfile = val
    },
    setUserCollection(state, val) {
        state.firebase = val
    },
    setActiveMasterData(state, val) {
        state.activeMasterData = val
    },
    setLatestSeqNo(state, val) {
        state.latest_seq_no = val
    },
    cleanUserState(state) {
        state.userProfile = {};
        state.firebase = {};
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}
