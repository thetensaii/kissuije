import { createContext, useContext, useEffect, useState } from 'react';
type UserContextType = {
  name: string,
  setName: (name: string) => void
}

const UserContext = createContext<UserContextType>({
  name: '',
  setName: () => {
    return
  }
});

export const useUser = (): UserContextType => useContext(UserContext);

interface Props {
  children: React.ReactNode
}

export function UserProvider({ children }: Props): JSX.Element {

  const [name, setName] = useState<string>('')

  useEffect(() => {
    const storedName = localStorage.getItem('name');
    setName(storedName ?? '')
  }, [])

  return <UserContext.Provider value={{ name, setName }} >
    {children}
  </UserContext.Provider>
}