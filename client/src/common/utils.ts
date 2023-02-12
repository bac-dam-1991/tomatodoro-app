export const SECONDS_PER_MINUTE = 60;
export const MS_PER_SECONDS = 1000;

export const formatTime = (ms: number) => {
	const seconds = ms / MS_PER_SECONDS;
	const remainingTimeMin = Math.floor(seconds / SECONDS_PER_MINUTE);
	const remainingTimeSeconds = Math.floor(seconds % SECONDS_PER_MINUTE);
	const remainingTime = `${remainingTimeMin
		.toString()
		.padStart(2, '0')}:${remainingTimeSeconds.toString().padStart(2, '0')}`;
	return remainingTime;
};
