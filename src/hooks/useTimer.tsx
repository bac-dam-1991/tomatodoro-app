import {useCallback, useEffect, useRef, useState} from 'react';

export const SECONDS_PER_MINUTE = 60;
export const MS_PER_SECONDS = 1000;

type TimerState = 'stopped' | 'start' | 'paused' | 'reset' | 'started';

export const useTimer = (duration: number) => {
  const now = Date.now();
  const [endMs, setEndMs] = useState<number>(now);
  const intervalRef = useRef<any | null>(null);
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

  const diffSeconds = (endMs - clock) / MS_PER_SECONDS;
  const remainingTimeMin = Math.floor(diffSeconds / SECONDS_PER_MINUTE);
  const remainingTimeSeconds = Math.ceil(diffSeconds % SECONDS_PER_MINUTE);
  const remainingTime = `${remainingTimeMin
    .toString()
    .padStart(2, '0')}:${remainingTimeSeconds.toString().padStart(2, '0')}`;

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
