import { clone } from '@/fn'

const CLEAN_STATE = {
  asider: '',
}

const state = clone(CLEAN_STATE)

const actions = {
  async change({ commit, dispatch, state, rootState }, payload, config = {}) {
    commit(payload.k, payload.v)
  },
  async changeAsider({ commit, dispatch, state, rootState }, payload, config = {}) {
    commit('asider', payload)
  },
  reset({ commit, dispatch, state, rootState }, payload, config = {}) {
    commit('reset', 'REMOVE')
    commit('resetFilter', 'REMOVE')
  },
}

const mutations = {
  reset(state, e) {
    state = clone(CLEAN_STATE)
  },
  asider(state, e) {
    state.asider = e
  },
}

export default {
  namespaced: true, state, actions, mutations,
}
