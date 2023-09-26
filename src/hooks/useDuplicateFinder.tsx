import { useCallback, useState } from "react";

export type AddressMapType = {
  [token: string]: {
    line: number;
    amount: string;
  }[];
};

export const useDuplicateFinder = (value: string) => {
  const [duplicates, setDuplicates] = useState<AddressMapType>({});
  const findDuplicates = useCallback(() => {
    const addessMap: AddressMapType = {};
    const addresses = value.split("\n");
    if (value && addresses.length) {
      addresses.forEach((address, i) => {
        const addressArray = address.trim().split(/[,= ]/);
        const token = addressArray[0];
        const amount = addressArray[1];
        if (addessMap[token]) {
          addessMap[token].push({ line: i + 1, amount });
        } else {
          addessMap[token] = [{ line: i + 1, amount }];
        }
      });
      const duplicateAddressMap: AddressMapType = {};
      for (const key in addessMap) {
        if (addessMap[key].length > 1) {
          duplicateAddressMap[key] = addessMap[key];
        }
      }
      setDuplicates(duplicateAddressMap);
    }
  }, [value]);
  return [duplicates, findDuplicates] as const;
};
