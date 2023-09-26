import React, { useMemo, useRef } from "react";
import styled, { css } from "styled-components";

type InputProps = {
  value: string;
  numOfLines: number;
  onValueChange: (value: string) => void;
  placeholder?: string;
  name?: string;
};

const InputWrapper = styled.div`
  position: relative;
  background-color: black;
  padding: 10px 0;
  border-radius: 2px;
  width: 600px;
  height: 320px;
`;

const sharedStyle = css`
  margin: 0;
  padding: 10px 0;
  height: 300px;
  border-radius: 0;
  resize: none;
  outline: none;
  font-family: monospace;
  font-size: 16px;
  line-height: 1.2;
  &:focus-visible {
    outline: none;
  }
`;

const Textarea = styled.textarea`
  ${sharedStyle}
  padding-left: 3.5rem;
  width: calc(100% - 3.5rem);
  border: none;
  background-color: inherit;
  &::placeholder {
    color: grey;
  }
`;

const Numbers = styled.div`
  ${sharedStyle}
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
  text-align: right;
  box-shadow: none;
  position: absolute;
  color: grey;
  border-right: 1px solid #bebebe;
  background-color: inherit;
  padding: 10px;
  width: 1.5rem;
`;

const NumberItem = styled.div`
  color: #bebebe;
`;

export const Input = ({
  value,
  numOfLines,
  onValueChange,
  placeholder = "",
  name,
}: InputProps) => {
  const lineCount = useMemo(() => value.split("\n").length, [value]);
  const linesArr = useMemo(
    () =>
      Array.from({ length: Math.max(numOfLines, lineCount) }, (_, i) => i + 1),
    [lineCount, numOfLines]
  );

  const lineCounterRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    onValueChange(event.target.value);
  };

  const handleTextareaScroll = () => {
    if (lineCounterRef.current && textareaRef.current) {
      lineCounterRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  return (
    <InputWrapper>
      <Numbers ref={lineCounterRef}>
        {linesArr.map((count) => (
          <NumberItem key={count}>{count}</NumberItem>
        ))}
      </Numbers>
      <Textarea
        name={name}
        onChange={handleTextareaChange}
        onScroll={handleTextareaScroll}
        placeholder={placeholder}
        ref={textareaRef}
        value={value}
        wrap="off"
      />
    </InputWrapper>
  );
};
