import { useCallback, useEffect, useRef, useState } from "react";

interface Props {
  initialCount: number;
  // onReset?: () => void;
  // onEnd?: () => void;
}

const useCountdown = ({ initialCount }: Props) => {
  const refInterval = useRef<NodeJS.Timer>();

  const [countdown, setCountdown] = useState(initialCount);

  const handleClearInterval = useCallback(() => {
    clearInterval(refInterval.current);

    refInterval.current = undefined;
  }, []);

  const handleReset = useCallback(() => {
    handleClearInterval();

    setCountdown(initialCount);
  }, [handleClearInterval, initialCount]);

  const handleStartCountdown = useCallback(() => {
    if (!refInterval.current) {
      refInterval.current = setInterval(() => {
        setCountdown((state) => state - 1);
      }, 1000);
    }
  }, []);

  useEffect(
    () => {
      if (countdown === 0) {
        handleClearInterval();

        // onEnd?.();
      }
    },
    [countdown], // eslint-disable-line react-hooks/exhaustive-deps
  );

  return {
    countdown,
    onReset: handleReset,
    onStartCountdown: handleStartCountdown,
  };
};

export default useCountdown;
