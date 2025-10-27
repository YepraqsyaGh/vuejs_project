import { useUsersService } from '../../common/services/users.service'
import { Params } from '@/types';
import { User } from '@/types/users';
import { UserState, RootState } from '@/types/state';
import { ActionContext } from 'vuex';

const { queryUsers, getUsers } = useUsersService();

// Initial state for users and emails
const initialState = {
  users: [],
  emails: [],
  isLoading: false,
};

export const state = { ...initialState };

export const actions = {
  // Get all users (or by slug if given)
  async fetchUsers(context: ActionContext<UserState, RootState>, slug: string = ''): Promise<void> {
    context.commit('setLoading', true);

    try {
      const data: User[] = await getUsers(slug);
      context.commit('setUsers', data);
      context.commit('setEmail', data);

    } catch (error) {
      // Reset users and emails if get error
      console.error('Error fetching users:', error);
      context.commit('setUsers', []);
      context.commit('setEmail', []);

      throw error;
    } finally {
      context.commit('setLoading', false);
    }
  },

  // Filter users based on params
  async filterUsers(context: ActionContext<UserState, RootState>, params: Params): Promise<void> {
    context.commit('setLoading', true);
    try {
      const data: User[] = await queryUsers(params);
      context.commit('setUsers', data);

    } catch (error) {
      console.error('Error fetching users:', error);
      context.commit('setUsers', []);
      throw error;
    } finally {
      context.commit('setLoading', false);
    }
  }
}

export const mutations = {
  // Save user list to state
  setUsers(state: UserState, users: User[]) {
    state.users = users || [];
  },

  // Collect unique emails from users
  setEmail(state: UserState, users: User[]) {
    const newEmails = users.map((user: User) => user.email)
    const joinEmails = [...newEmails, ...state.emails]

    // Remove repeating values using Set
    state.emails = [...new Set(joinEmails)];
  },

  // Set loading state to true/false
  setLoading(state: UserState, value: boolean) {
    state.isLoading = value;
  },
}

export const getters = {
  // Get all users
  users: (state: UserState) => state.users,

  // Get all unique emails
  emails: (state: UserState) => state.emails,

  // Get all unique emails
  isLoading: (state: UserState) => state.isLoading

}

// Export users module
export default {
  state,
  actions,
  getters,
  mutations
}
