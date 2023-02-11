import {useCallback, useEffect, useState} from 'react';
import {formatTime, MS_PER_SECONDS, SECONDS_PER_MINUTE} from '../common/utils';

type TimerState = 'stopped' | 'start' | 'paused' | 'reset' | 'started';

export const useTimer = (duration: number) => {
  const now = Date.now();
  const [endMs, setEndMs] = useState<number>(now);
  const [timerState, setTimerState] = useState<TimerState>('stopped');
  const [clock, setClock] = useState<number>(now);

  useEffect(() => {
    if (timerState === 'started') {
      return;
    }
    setEndMs(duration * SECONDS_PER_MINUTE * MS_PER_SECONDS + clock);
  }, [duration, clock]);

  useEffect(() => {
    const _clock = setInterval(() => {
      setClock(Date.now());
    }, MS_PER_SECONDS);

    return () => {
      clearInterval(_clock);
    };
  }, []);

  const stop = useCallback(() => {
    setTimerState('stopped');
  }, []);

  const pause = useCallback(() => {
    setTimerState('paused');
  }, []);

  const reset = useCallback(() => {
    setTimerState('reset');
  }, []);

  const start = useCallback(() => {
    setTimerState('started');
  }, []);

  const diffMs = endMs - clock;
  const remainingTime = formatTime(diffMs);

  return {
    start,
    stop,
    reset,
    endMs,
    timerState,
    clock,
    remainingTime,
    pause,
  };
};
