import { styled } from "styled-components";

const InputHelperWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HelperText = styled.p`
  width: fit-content;
`;

const ExampleButton = styled.button`
  background-color: transparent;
  color: #ffffff75;
  border: none;
  outline: none;
  height: 45px;
  padding: 5px;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: color 0.25s;
  &:hover {
    color: #ffffffcf;
  }
`;

export const InputHelper = () => {
  return (
    <InputHelperWrapper>
      <HelperText>Separated by ',' or ' ' or '='</HelperText>
      <ExampleButton>Show Example</ExampleButton>
    </InputHelperWrapper>
  );
};
