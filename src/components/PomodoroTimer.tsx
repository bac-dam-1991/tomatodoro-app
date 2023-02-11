import {ChangeEventHandler, useState} from 'react';
import {useTimer} from '../hooks/useTimer';

const dateFormatter = new Intl.DateTimeFormat('default', {
  dateStyle: 'full',
});

const timeFormatter = new Intl.DateTimeFormat('default', {
  timeStyle: 'long',
});

export const PomodoroTimer = () => {
  const [durationMin, setDurationMin] = useState<number>(25);
  const {remainingTime, endMs, start, stop, reset, timerState, clock, pause} =
    useTimer(durationMin);

  const handleDurationChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const duration = parseInt(e.target.value);
    if (isNaN(duration)) {
      setDurationMin(0);
      return;
    }
    setDurationMin(duration);
  };

  return (
    <div>
      <input
        value={durationMin}
        onChange={handleDurationChange}
        disabled={timerState === 'started'}
      />
      <button onClick={start} disabled={timerState === 'started'}>
        Start
      </button>
      <button onClick={pause} disabled={['paused'].includes(timerState)}>
        Pause
      </button>
      <button onClick={stop} disabled={timerState === 'stopped'}>
        Stop
      </button>
      <button onClick={reset} disabled={timerState === 'reset'}>
        Reset
      </button>
      <div>
        <div>Countdown: {remainingTime} minutes</div>
      </div>
      <div>
        <div>End date: {dateFormatter.format(endMs)}</div>
        <div>End time: {timeFormatter.format(endMs)}</div>
      </div>
      <div>
        <div>Current date: {dateFormatter.format(clock)}</div>
        <div>Current time: {timeFormatter.format(clock)}</div>
      </div>
    </div>
  );
};
