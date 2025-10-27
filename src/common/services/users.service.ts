import { callApi } from '../api.service'
import { USERS_ENDPOINT } from '../config';
import { Params } from '../../types';
import { User } from '@/types/users';

// Define the structure of the UsersService
type UsersService = {
  queryUsers: (params: Params) => Promise<User[]>,
  getUsers: (slug: string) => Promise<User[]>
};

// Service that provides methods to interact with the Users API
export function useUsersService(): UsersService {
  // Get users based on provided filters
  const queryUsers = (params: Params): Promise<User[]> => {
    return callApi.query(USERS_ENDPOINT, { params });
  };

  // Get users by slug (or all users if slug is empty)
  const getUsers = (slug: string): Promise<User[]> => {
    return callApi.get(USERS_ENDPOINT, slug);
  };

  // Return all available service methods
  return {
    queryUsers,
    getUsers,
  };
}
