import React, { ChangeEventHandler, KeyboardEventHandler, RefObject } from "react";
import styled from "styled-components";

interface Props {
  refInput: RefObject<HTMLInputElement>;
  isDisabled: boolean;
  onChangeInput: ChangeEventHandler<HTMLInputElement>;
  onKeyDown: KeyboardEventHandler<HTMLInputElement>;
}

const TextInput = ({ refInput, isDisabled, onChangeInput, onKeyDown }: Props) => (
  <StyledInput ref={refInput} disabled={isDisabled} onChange={onChangeInput} onKeyDown={onKeyDown} />
);

const StyledInput = styled.input`
  width: 300px;
  font-size: 24px;
  text-align: center;
  padding-block: 4px;
`;

export default TextInput;
