import service from '@/sdk/restapiService'
import clone from '@/fn/util/clone'

const CLEAN_STATE = {
  formList: [{ method: 'GET', url: '', headerList: [], paramList: [] }],
  restList: [{}],
}

const state = clone(CLEAN_STATE)

const actions = {
  async add({ commit, dispatch, state, rootState }, payload, config = {}) {
    state.formList.push({...clone(CLEAN_STATE).formList[0]})
    state.restList.push({...clone(CLEAN_STATE).restList[0]})
  },
  async remove({ commit, dispatch, state, rootState }, payload, config = {}) {
    state.formList.splice(payload.reqi, 1)
    state.restList.splice(payload.reqi, 1)
    commit('formList', state.formList)
    commit('restList', state.restList)
  },
  async send({ commit, dispatch, state, rootState }, payload, config = {}) {
    let i = payload.reqi
    delete payload.reqi
    state.formList[i] = payload
    commit('formList', state.formList)
    let rest = await service.send(payload)
    state.restList[i] = rest
    commit('restList', state.restList)

    return true
  },
}

const mutations = {
  reset(state, e) {
    state = clone(CLEAN_STATE)
  },
  formList(state, e) {
    state.formList = e
  },
  restList(state, e) {
    state.restList = e
  },
}

export default {
  namespaced: true, state, actions, mutations,
}
