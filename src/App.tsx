import React, { KeyboardEventHandler, useCallback, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import HeaderCounters from "./components/HeaderCounters";

import TextInput from "./components/TextInput";
import useCountdown from "./hooks/useCountdown";
import { SECONDS_IN_MINUTE } from "./utils/constants";
import handleInitStates from "./utils/handleInitStates";

function App() {
  const refInput = useRef<HTMLInputElement>(null);

  const [states, setStates] = useState(handleInitStates);

  const currentWord = useMemo(
    () => (states.words.list.length === states.words.indexCurrent ? "" : states.words.list[states.words.indexCurrent]),
    [states.words.indexCurrent, states.words.list],
  );

  const { countdown, onStartCountdown, onReset } = useCountdown({
    initialCount: SECONDS_IN_MINUTE,
  });

  const handleReset = useCallback(() => {
    if (refInput.current) {
      refInput.current.value = "";
    }

    setStates(handleInitStates);

    onReset();
  }, [onReset]);

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = useCallback((event) => {
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();

      setStates((prevState) => {
        const wordPrev = prevState.words.list[prevState.words.indexCurrent];
        const valueInput = refInput.current?.value ?? "";

        const newCountsWordCorrect = prevState.counts.word.correct + (valueInput === wordPrev ? 1 : 0);

        const newCountsCharCompleted =
          prevState.counts.char.completed +
          (wordPrev.length >= valueInput.length ? wordPrev.length : valueInput.length);
        const newCountsCharCorrect =
          prevState.counts.char.correct +
          valueInput.split("").reduce((acc, current, index) => (wordPrev[index] === current ? acc + 1 : acc), 0);

        return {
          words: {
            ...prevState.words,
            indexCurrent: prevState.words.indexCurrent + 1,
          },
          counts: {
            word: {
              completed: prevState.counts.word.completed + 1,
              correct: newCountsWordCorrect,
            },
            char: {
              completed: newCountsCharCompleted,
              correct: newCountsCharCorrect,
            },
          },
        };
      });

      setTimeout(() => {
        if (refInput.current) {
          refInput.current.value = "";
        }
      }, 0);
    }
  }, []);

  return (
    <StyledContainer>
      <HeaderCounters countdown={countdown} countsState={states.counts} onReset={handleReset} />

      <div className='App__CurrentWord'>{currentWord}</div>

      <TextInput
        refInput={refInput}
        isDisabled={!countdown || !currentWord}
        onChangeInput={onStartCountdown}
        onKeyDown={handleKeyDown}
      />
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .App__CurrentWord {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-block: 16px;
    font-size: 24px;
    font-weight: bold;
    letter-spacing: 1px;
  }
`;

export default App;
