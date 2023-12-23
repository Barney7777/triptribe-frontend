import { createContext } from 'react';
import { State } from './user-context-type';

export const initialState: State = {
  isAuthenticated: false,
  userData: null,
};
export interface SigninInputs {
  email: string;
  password: string;
}

export type UserContextProps = State & {
  signIn: ({ email, password }: SigninInputs) => Promise<void>;
  signUp: ({ email, password }: SigninInputs) => Promise<void>;
  signOut: () => Promise<void>;
};

export const UserContext = createContext<UserContextProps>({
  ...initialState,
  signIn: () => Promise.resolve(),
  signUp: () => Promise.resolve(),
  signOut: () => Promise.resolve(),
});
