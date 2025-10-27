import { Users } from "./users"

// User state interface
export interface UserState {
  users: Users[],
  emails: string[],
  isLoading: boolean,
}

// Root state interface
export interface RootState {
  users: UserState
}
