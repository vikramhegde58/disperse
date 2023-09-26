import { useCallback, useState } from "react";

export const useValidator = (value: string) => {
  const [errors, setErrors] = useState<string[]>([]);
  const validateToken = useCallback((token: string) => {
    const pattern = /^0x/i;
    return pattern.test(token) && token.length === 42;
  }, []);

  const validateAmount = useCallback((amount: string) => {
    return !isNaN(+amount);
  }, []);

  const validate = useCallback(() => {
    const addresses = value.split("\n");
    if (value && addresses.length) {
      const errArray: string[] = addresses
        .map((address, i) => {
          const lineNumber = i + 1;
          const addressArray = address.trim().split(/[,= ]/);
          const token = addressArray[0];
          const amount = addressArray[1];
          const isTokenValid = validateToken(token);
          const isAmountValid = validateAmount(amount);
          if (!isTokenValid && !isAmountValid) {
            return `Line ${lineNumber} invalid Ethereum address and wrong amount`;
          } else if (!isTokenValid) {
            return `Line ${lineNumber} invalid Ethereum address`;
          } else if (!isAmountValid) {
            return `Line ${lineNumber} wrong amount`;
          }
        })
        .filter((err) => err !== undefined) as string[];
      setErrors(errArray);
    }
  }, [validateAmount, validateToken, value]);
  return [errors, validate] as const;
};
