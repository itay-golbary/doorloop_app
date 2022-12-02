import React, { useCallback, useRef, useState } from "react";

import FormWords from "./components/FormWords";
import HeaderCounters from "./components/HeaderCounters";
import useCountdown from "./hooks/useCountdown";
import { handleInitStates, SECONDS_IN_MINUTE } from "./utils";

function App() {
  const refInput = useRef<HTMLInputElement>(null);

  const [states, setStates] = useState(handleInitStates);

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

  const handleUpdateState = useCallback(() => {
    setStates((prevState) => {
      const wordPrev = prevState.words.list[prevState.words.indexCurrent];
      const valueInput = refInput.current?.value ?? "";

      const newCountsWordCorrect = prevState.counts.word.correct + (valueInput === wordPrev ? 1 : 0);
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
            completed: prevState.counts.char.completed + wordPrev.length,
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
  }, []);

  return (
    <div>
      <HeaderCounters countdown={countdown} word={states.counts.word} char={states.counts.char} onReset={handleReset} />

      <FormWords
        refInput={refInput}
        stateWords={states.words}
        isDisabled={!countdown}
        onChangeInput={onStartCountdown}
        onUpdateState={handleUpdateState}
      />
    </div>
  );
}

export default App;
