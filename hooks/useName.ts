import { useEffect, useState } from 'react';

export type SetNewNameFn = (name: string, toStore: boolean) => string;

type UseNameReturnType = {
  name: string;
  setNewName: SetNewNameFn;
};

export const useName = (): UseNameReturnType => {
  const [name, setName] = useState<string>('');

  useEffect(() => {
    const storedName = localStorage.getItem('name');
    setName(storedName ?? '');
  }, []);

  const setNewName: SetNewNameFn = (name: string, toStore = false): string => {
    setName(name);

    if (toStore) {
      localStorage.setItem('name', name);
    } else {
      localStorage.removeItem('name');
    }

    return name;
  };

  return { name, setNewName };
};
