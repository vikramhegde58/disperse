import { useCallback, useState } from "react";
import "./App.css";
import { Input } from "./components/Input";
import { styled } from "styled-components";
import { InputHelper } from "./components/InputHelper";
import { useValidator } from "./hooks/useValidator";
import { InputError } from "./components/InputError";
import { useDuplicateFinder } from "./hooks/useDuplicateFinder";
import { isEmpty } from "./utils";
import { InputDuplicate } from "./components/InputDuplicate";

const InputLabel = styled.p`
  width: fit-content;
`;

const SubmitButton = styled.button`
  cursor: pointer;
  width: 100%;
  font-size: 20px;
  border-radius: 25px;
  padding: 10px;
  outline: none;
  border: none;
  background: rgb(111, 6, 166);
  background: linear-gradient(
    143deg,
    rgba(111, 6, 166, 1) 16%,
    rgba(62, 90, 235, 1) 94%
  );
`;

function App() {
  const [value, setValue] = useState("");
  const [errors, validate] = useValidator(value);
  const [duplicates, findDuplicates] = useDuplicateFinder(value);

  const handleSubmit = useCallback(() => {
    validate();
    if (!errors.length) {
      findDuplicates();
    }
  }, [errors.length, findDuplicates, validate]);

  const handleKeepFirstOne = useCallback(() => {
    const addresses = value.split("\n");
    const newAddresses: string[] = [];
    addresses.forEach((address) => {
      if (!newAddresses.includes(address)) {
        newAddresses.push(address);
      }
    });
    setValue(newAddresses.join("\n"));
  }, [value]);

  const handleCombineBalance = () => {};

  return (
    <>
      <InputLabel>Addresses with Amounts</InputLabel>
      <Input
        value={value}
        numOfLines={1}
        onValueChange={(value: string) => {
          setValue(value);
        }}
      />
      <InputHelper />
      {!!errors.length && <InputError messages={errors} />}
      {!errors.length && !isEmpty(duplicates) && (
        <InputDuplicate
          duplicates={duplicates}
          onKeepFirstOne={handleKeepFirstOne}
          onCombineBalance={handleCombineBalance}
        />
      )}
      <SubmitButton onClick={handleSubmit}>Next</SubmitButton>
    </>
  );
}

export default App;
