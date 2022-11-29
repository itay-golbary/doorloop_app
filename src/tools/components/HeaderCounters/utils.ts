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
  chars: CountProps;
  words: CountProps;
}

const getStringifyValues = ({ countdown, chars, words }: GetStringifyValuesProps) => {
  const secondsPassed = SECONDS_IN_MINUTE - countdown;

  return {
    words: {
      completedPerMinute: getStringCountPerMinute({ secondsPassed, count: words.completed }),
      percentageCorrect: getStringPercentage({ partial: words.correct, total: words.completed }),
    },
    chars: {
      completedPerMinute: getStringCountPerMinute({ secondsPassed, count: chars.completed }),
      percentageCorrect: getStringPercentage({ partial: chars.correct, total: chars.completed }),
    },
  };
};

export { getStringifyValues, GetStringifyValuesProps, CountProps };
