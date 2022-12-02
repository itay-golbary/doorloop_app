import React, { KeyboardEventHandler, RefObject, useCallback, useMemo } from "react";

import { States } from "../utils";

interface Props {
  refInput: RefObject<HTMLInputElement>;
  stateWords: States["words"];
  isDisabled: boolean;
  onChangeInput: () => void;
  onUpdateState: () => void;
}

const FormWords = ({ refInput, stateWords, isDisabled, onChangeInput, onUpdateState }: Props) => {
  const currentWord = useMemo(
    () => (stateWords.list.length === stateWords.indexCurrent ? "" : stateWords.list[stateWords.indexCurrent]),
    [stateWords.indexCurrent, stateWords.list],
  );

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      if (event.key === " ") {
        event.preventDefault();

        onUpdateState();
      }
    },
    [onUpdateState],
  );

  return (
    <div>
      <p>Current: {currentWord}</p>

      <input ref={refInput} disabled={isDisabled || !currentWord} onChange={onChangeInput} onKeyDown={handleKeyDown} />
    </div>
  );
};

export default FormWords;
