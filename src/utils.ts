import words from "./assets/words";

import { CountProps } from "./components/HeaderCounters";

const SECONDS_IN_MINUTE = 60;

/** ref https://stackoverflow.com/a/12646864 */
function handleShuffleList<T>(list: T[]) {
  const newList = [...list];

  for (let i = newList.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [newList[i], newList[j]] = [newList[j], newList[i]];
  }

  return newList;
}

interface States {
  words: {
    list: string[];
    indexCurrent: number;
  };
  counts: {
    word: CountProps;
    char: CountProps;
  };
}

const handleInitStates = (): States => ({
  words: {
    list: handleShuffleList(words),
    indexCurrent: 0,
  },
  counts: {
    word: { completed: 0, correct: 0 },
    char: { completed: 0, correct: 0 },
  },
});

export { SECONDS_IN_MINUTE, handleInitStates, States };
