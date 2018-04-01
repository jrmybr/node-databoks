import {
  UPDATE_SIGN_FORM
} from './actions.type'

const state = {
  formType: 'signin'
}

const getters = {
  formType (state) {
    return state.formType
  }
}

const mutations = {
  [UPDATE_SIGN_FORM] (state) {
    state.formType === 'signin' ? 'signup' : 'signin'
  }
}

export default {
  state,
  getters,
  mutations
}
