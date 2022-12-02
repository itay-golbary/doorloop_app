import { SECONDS_IN_MINUTE } from "../../utils";

const DEFAULT_VALUE = "?";

interface GetStringCountPerMinuteProps {
  secondsPassed: number;
  count: number;
}

const getStringCountPerMinute = ({ secondsPassed, count }: GetStringCountPerMinuteProps) =>
  secondsPassed ? Math.floor((count / secondsPassed) * 60).toString() : DEFAULT_VALUE;

interface GetStringPercentageProps {
  partial: number;
  total: number;
}

const getStringPercentage = ({ partial, total }: GetStringPercentageProps) =>
  total ? ((partial / total) * 100).toFixed(2) + "%" : DEFAULT_VALUE;

interface CountProps {
  correct: number;
  completed: number;
}

interface GetStringifyValuesProps {
  countdown: number;
  char: CountProps;
  word: CountProps;
}

const getStringifyValues = ({ countdown, char, word }: GetStringifyValuesProps) => {
  const secondsPassed = SECONDS_IN_MINUTE - countdown;

  return {
    words: {
      completedPerMinute: getStringCountPerMinute({ secondsPassed, count: word.completed }),
      percentageCorrect: getStringPercentage({ partial: word.correct, total: word.completed }),
    },
    chars: {
      completedPerMinute: getStringCountPerMinute({ secondsPassed, count: char.completed }),
      percentageCorrect: getStringPercentage({ partial: char.correct, total: char.completed }),
    },
  };
};

export { getStringifyValues, GetStringifyValuesProps, CountProps };
