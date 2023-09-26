import {
  IconDefinition,
  faExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled } from "styled-components";

type ErrorProps = {
  messages: string[];
};

const ErrorWrapper = styled.div`
display: flex;
  border: 1px solid red;
  margin-bottom: 14px;
  border-radius: 5px;
`;

const ErrorList = styled.div`
  margin: 10px 0;
`;

const Message = styled.p`
  width: fit-content;
  font-size: 13px;
  color: red;
  margin: 0;
`;

const ExclamationIcon = styled(FontAwesomeIcon).attrs<{
  icon?: IconDefinition;
}>({ icon: faExclamation })`
  color: red;
  margin: 10px;
  padding: 3px;
  border: 2px solid red;
  width: 15px;
  height: 15px;
  border-radius: 50%;
`;

export const InputError = ({ messages }: ErrorProps) => {
  return (
    <ErrorWrapper>
      <ExclamationIcon />
      <ErrorList>
        {messages.map((message) => {
          return <Message key={message}>{message}</Message>;
        })}
      </ErrorList>
    </ErrorWrapper>
  );
};
