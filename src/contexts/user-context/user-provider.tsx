import { authMe } from '@/api/authMe';
import React, { ReactNode, useCallback, useEffect, useReducer } from 'react';
import { ActionType, InitializeAction, State } from '@/contexts/user-context/user-context-type';
import { SignInInputs, SignUpInputs, UserContext, initialState } from './user-context';
import { authRegister } from '@/api/authRegister';
import { authSignIn } from '@/api/authSignin';
import { CanceledError } from 'axios';
const ACCESS_KEY = 'accessToken';
const REFRESH_KEY = 'refreshToken';

const reducer = (state: State, action: any): State => {
  switch (action.type) {
    case 'INITIALIZE': {
      const { isAuthenticated, userData } = action.payload as InitializeAction['payload'];
      return {
        ...state,
        isAuthenticated,
        userData,
      };
    }
    case 'SIGN_IN': {
      const { userData } = action.payload;
      return {
        ...state,
        isAuthenticated: true,
        userData,
      };
    }
    case 'SIGN_UP': {
      return { ...state };
    }
    case 'SIGN_OUT': {
      return {
        ...state,
        isAuthenticated: false,
        userData: null,
      };
    }
    default:
      return state;
  }
};

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async () => {
    const accessToken = localStorage.getItem(ACCESS_KEY);
    if (accessToken) {
      try {
        const res = await authMe();
        if (!res) return;
        const userData = res.data;
        dispatch({
          type: ActionType.INITIALIZE,
          payload: {
            isAuthenticated: true,
            userData,
          },
        });
      } catch (err) {
        console.error('init error', err);
      }
    } else {
      dispatch({
        type: ActionType.INITIALIZE,
        payload: {
          isAuthenticated: false,
          userData: null,
        },
      });
    }
  }, [dispatch]);

  useEffect(() => {
    initialize();
  }, [dispatch, initialize]);

  const signIn = useCallback(
    async ({ email, password }: SignInInputs): Promise<void> => {
      try {
        const res = await authSignIn(email, password);

        const { accessToken, refreshToken } = res.data;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        const resMe = await authMe();
        if (!resMe) return;
        const userData = resMe.data;
        dispatch({
          type: ActionType.SIGN_IN,
          payload: {
            userData,
          },
        });
      } catch (err) {
        console.error('sign in failed', err);
        // throw err;
      }
    },
    [dispatch]
  );

  const signUp = useCallback(
    async ({ firstName, lastName, email, password }: SignUpInputs): Promise<void> => {
      try {
        const res = await authRegister(firstName, lastName, email, password);
      } catch (err) {
        console.error('sign up failed', err);
        throw err;
      }
    },

    []
  );

  const signOut = useCallback(async () => {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
    dispatch({ type: ActionType.SIGN_OUT });
  }, [dispatch]);

  return (
    <UserContext.Provider
      value={{
        ...state,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
