import { isStringEmpty } from 'lib/common/functions';
import { generateRandomName } from 'lib/common/generators/name-generator';
import { useEffect, useState } from 'react';

type StoreNewNameFn = (name: string | undefined) => string;

type UseNameReturnType = {
  name: string;
  storeNewName: StoreNewNameFn;
};

export const useName = (): UseNameReturnType => {
  const [name, setName] = useState<string>('');

  useEffect(() => {
    const storedName = localStorage.getItem('name');
    setName(storedName ?? '');
  }, []);

  const storeNewName = (name: string | undefined): string => {
    if (name && !isStringEmpty(name)) {
      localStorage.setItem('name', name);
    } else {
      name = generateRandomName();
      localStorage.removeItem('name');
    }

    setName(name);

    return name;
  };

  return { name, storeNewName };
};
