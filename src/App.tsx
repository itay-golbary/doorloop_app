import React, { ChangeEventHandler, useCallback, useRef, useState } from "react";

import HeaderCounters, { CountProps } from "./tools/components/HeaderCounters";
import useCountdown from "./tools/hooks/useCountdown";
import { SECONDS_IN_MINUTE } from "./tools/utils";

interface State {
  words: CountProps;
  chars: CountProps;
}

const stateInitial: State = {
  words: { completed: 0, correct: 0 },
  chars: { completed: 0, correct: 0 },
};

function App() {
  const refInput = useRef<HTMLInputElement>(null);

  const [state, setState] = useState(stateInitial);

  const { countdown, onStartCountdown, onReset } = useCountdown({
    initialCount: SECONDS_IN_MINUTE,
  });

  const handleChangeInput: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      onStartCountdown();
    },
    [onStartCountdown],
  );

  const handleReset = useCallback(() => {
    if (refInput.current) {
      refInput.current.value = "";
    }

    onReset();
  }, [onReset]);

  return (
    <div>
      <HeaderCounters countdown={countdown} words={state.words} chars={state.chars} onReset={handleReset} />

      <input ref={refInput} onChange={handleChangeInput} />
    </div>
  );
}

export default App;
