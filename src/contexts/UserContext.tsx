import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';

export type UserData = {
  email: string;
  nickname: string;
  role: string;
};

type UserContextProps = {
  userData: UserData | null;
  setUserData: Dispatch<SetStateAction<UserData | null>>;
};

export const UserContext = createContext<UserContextProps>({
  userData: null,
  setUserData: () => null,
});

export const useUserContext = () => useContext(UserContext);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }: UserProviderProps) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  useEffect(() => {
    console.log('useEffect set userData done!', userData);
  }, [userData]);

  return <UserContext.Provider value={{ userData, setUserData }}>{children}</UserContext.Provider>;
};
