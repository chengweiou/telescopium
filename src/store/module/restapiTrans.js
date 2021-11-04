import { clone } from '@/fn'

const CLEAN_STATE = {
  cache: false,
  methodList: ['POST', 'DELETE', 'PUT', 'GET'],
}

const state = clone(CLEAN_STATE)

const actions = {
}

const mutations = {
}

export default {
  namespaced: true, state, actions, mutations,
}
