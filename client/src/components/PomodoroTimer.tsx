import {ChangeEventHandler, useState} from 'react';
import {formatTime} from '../common/utils';
import {useTimer} from '../hooks/useTimer';
import './index.css';

const dateFormatter = new Intl.DateTimeFormat('default', {
  dateStyle: 'full',
});

const timeFormatter = new Intl.DateTimeFormat('default', {
  timeStyle: 'long',
});

export const PomodoroTimer = () => {
  const [durationMin, setDurationMin] = useState<number>(25);
  const {remainingTimeMs, endMs, start, stop, timerState, clock, pause} =
    useTimer(durationMin);

  const handleDurationChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const duration = parseInt(e.target.value);
    if (isNaN(duration)) {
      setDurationMin(0);
      return;
    }

    if (duration > 25) {
      alert('A pomodoro should not be more than 25 minutes long.');
    }

    setDurationMin(duration);
  };

  const started = timerState === 'started';

  return (
    <div className="flex flex-col gap-[24px]">
      <div>
        <h2 className="text-[4rem] md:text-[8rem] text-center font-semibold">
          {formatTime(remainingTimeMs)}
        </h2>
      </div>
      <div className="flex flex-row gap-2">
        <button
          onClick={start}
          disabled={started}
          className="flex-grow-[1] bg-green-700"
        >
          Start
        </button>
        <button
          onClick={pause}
          disabled={!started}
          className="flex-grow-[1] bg-amber-500"
        >
          Pause
        </button>
        <button
          onClick={stop}
          disabled={!started}
          className="flex-grow-[1] bg-red-600"
        >
          Stop
        </button>
      </div>
      <div>
        <input
          className="w-full text-center"
          type={'text'}
          inputMode="numeric"
          value={durationMin}
          onChange={handleDurationChange}
          disabled={started}
        />
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
