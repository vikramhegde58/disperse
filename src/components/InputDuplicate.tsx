import { styled } from "styled-components";
import { InputError } from "./InputError";
import { AddressMapType } from "../hooks/useDuplicateFinder";
import { useMemo } from "react";

type InputDuplicateProps = {
  duplicates: AddressMapType;
  onKeepFirstOne: () => void;
  onCombineBalance: () => void;
};

const InputDuplicateWrapper = styled.div``;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.p`
  margin: 6px 0;
`;

const Button = styled.button`
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  color: red;
`;

const ActionButtons = styled.div`
  display: flex;
`;

const Devider = styled.div`
  border: 0.5px solid red;
  margin: 0 18px;
`;

export const InputDuplicate = ({
  duplicates,
  onCombineBalance,
  onKeepFirstOne,
}: InputDuplicateProps) => {
  const duplicateMessages = useMemo(() => {
    const messages = [];
    for (const key in duplicates) {
      messages.push(
        `${key} duplicate in Line: ${duplicates[key]
          .map((item) => item.line)
          .join(",")}`
      );
    }
    return messages;
  }, [duplicates]);
  return (
    <InputDuplicateWrapper>
      <Header>
        <Title>Duplicated</Title>
        <ActionButtons>
          <Button onClick={onKeepFirstOne}>Keep the first one</Button>
          <Devider />
          <Button onClick={onCombineBalance}>Combine balance</Button>
        </ActionButtons>
      </Header>
      <InputError messages={duplicateMessages} />
    </InputDuplicateWrapper>
  );
};
