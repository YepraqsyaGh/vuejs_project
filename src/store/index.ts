import { createStore } from "vuex"
import users from './modules/users'
import type { RootState } from "../types/state"

// store creation
export default createStore<RootState>({
  modules: {
    users
  }
})
