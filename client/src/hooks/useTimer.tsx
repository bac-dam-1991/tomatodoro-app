import {useCallback, useEffect, useRef, useState} from 'react';
import {MS_PER_SECONDS, SECONDS_PER_MINUTE} from '../common/utils';

type TimerState = 'stopped' | 'paused' | 'started' | 'finished';

export const useTimer = (duration: number) => {
  const now = Date.now();
  const [endMs, setEndMs] = useState<number>(now);
  const [timerState, setTimerState] = useState<TimerState>('stopped');
  const [clock, setClock] = useState<number>(now);
  const clockRef = useRef<any>();
  const [remainingMs, setRemainingMs] = useState<number>(0);

  useEffect(() => {
    if (timerState !== 'started') {
      return;
    }
    const diffMs = endMs - clock;
    setRemainingMs(diffMs);
  }, [endMs, clock, timerState]);

  useEffect(() => {
    if (timerState === 'started') {
      return;
    }
    const _duration =
      timerState === 'paused'
        ? remainingMs
        : duration * SECONDS_PER_MINUTE * MS_PER_SECONDS;
    setEndMs(_duration + clock);
  }, [duration, clock, timerState]);

  useEffect(() => {
    if (clock < endMs) {
      return;
    }
    setTimerState('finished');
  }, [clockRef.current, clock, endMs]);

  useEffect(() => {
    clockRef.current = setInterval(() => {
      setClock(Date.now());
    }, MS_PER_SECONDS);

    return () => {
      clearInterval(clockRef.current);
    };
  }, [clockRef.current]);

  const stop = useCallback(() => {
    setTimerState('stopped');
  }, []);

  const pause = useCallback(() => {
    setTimerState('paused');
    setRemainingMs(endMs - Date.now());
  }, [endMs]);

  const start = useCallback(() => {
    setTimerState('started');
  }, []);

  return {
    start,
    stop,
    endMs,
    timerState,
    clock,
    remainingTimeMs: endMs - clock,
    pause,
  };
};
