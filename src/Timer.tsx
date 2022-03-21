import { useEffect, useRef, useState } from 'preact/hooks';

export default function Timer() {
	const [time, setTime] = useState(
		Math.max(
			0,
			localStorage.getItem('timerActive') === 'true'
				? (parseInt(localStorage.getItem('timerEndTime') || '0') - Date.now()) /
						10
				: parseInt(localStorage.getItem('timerTime') || '0')
		)
	);
	const [hour, setHour] = useState(Math.floor(time / 100 / 3600));
	const [minute, setMinute] = useState(Math.floor(((time / 100) % 3600) / 60));
	const [second, setSecond] = useState(Math.floor((time / 100) % 60));
	const [hundredth, setHundredth] = useState(Math.floor(time % 100));
	const [isActive, setActive] = useState(
		localStorage.getItem('timerActive') === 'true'
	);
	const countRef = useRef(0);

	const hourRef = useRef<HTMLInputElement>(null);
	const minuteRef = useRef<HTMLInputElement>(null);
	const secondRef = useRef<HTMLInputElement>(null);
	const hundredthRef = useRef<HTMLInputElement>(null);

	if (hour < 0) {
		setHour(0);
	}

	if (time <= 0) {
		setActive(false);
		setTime(0);
		localStorage.setItem('timerTime', '0');
		localStorage.setItem('timerActive', 'false');
	}

	if (!isActive) {
		setTime(hour * 360000 + minute * 6000 + second * 100 + hundredth);
		localStorage.setItem('timerActive', isActive.toString());
	} else {
		setHour(Math.floor(time / 360000));
		setMinute(Math.floor((time / 6000) % 60));
		setSecond(Math.floor((time / 100) % 60));
		setHundredth(Math.floor(time % 100));
		localStorage.setItem('timerTime', time.toString());
		localStorage.setItem('timerActive', isActive.toString());
	}

	function toggle() {
		if (isActive) pause();
		else start();
	}

	function start() {
		setActive(true);
		localStorage.setItem('timerEndTime', (Date.now() + time * 10).toString());
	}

	function pause() {
		setActive(false);
	}

	function reset() {
		setActive(false);
		hourRef.current!.style.width = '1.5ch';
		localStorage.setItem('timerTime', '0');
		setTime(0);
		setHour(0);
		setMinute(0);
		setSecond(0);
		setHundredth(0);
	}

	useEffect(() => {
		if (isActive) {
			countRef.current = setInterval(() => {
				setTime(() =>
					Math.max(
						0,
						(parseInt(
							localStorage.getItem('timerEndTime') || Date.now().toString()
						) -
							Date.now()) /
							10
					)
				);
			}, 10);
		} else if (!isActive && countRef.current) {
			clearInterval(countRef.current);
		}
		return () => {
			clearInterval(countRef.current);
		};
	}, [isActive]);

	useEffect(() => {
		hourRef.current!.style.width = `${hourRef.current!.value.length}.5ch`;
	}, []);

	function updateTimerTime() {
		let newTime =
			parseInt(hourRef.current!.value) * 360000 +
			parseInt(minuteRef.current!.value) * 6000 +
			parseInt(secondRef.current!.value) * 100 +
			parseInt(hundredthRef.current!.value);
		if (newTime < 0) {
			newTime = 0;
		}
		setTime(newTime);
		setHour(splitTime(newTime)[0]);
		setMinute(splitTime(newTime)[1]);
		setSecond(splitTime(newTime)[2]);
		setHundredth(splitTime(newTime)[3]);
		localStorage.setItem('timerTime', newTime.toString());
	}

	return (
		<>
			<p className="time">
				<input
					onChange={() => {
						parseInt(hourRef.current!.value) < 0
							? (hourRef.current!.value = '0')
							: null;
						updateTimerTime();
					}}
					max="999"
					type="number"
					value={hour}
					ref={hourRef}
					style={{
						width: `${splitTime(time)[0].toString().length}.5ch`,
					}}
				/>
				:
				<input
					onChange={() => {
						parseInt(hourRef.current!.value) <= 0 &&
						parseInt(minuteRef.current!.value) < 0
							? (minuteRef.current!.value = '00')
							: null;
						updateTimerTime();
					}}
					max="60"
					type="number"
					value={addZero(minute)}
					ref={minuteRef}
				/>
				:
				<input
					onChange={() => {
						parseInt(hourRef.current!.value) <= 0 &&
						parseInt(minuteRef.current!.value) <= 0 &&
						parseInt(secondRef.current!.value) < 0
							? (secondRef.current!.value = '00')
							: null;
						updateTimerTime();
					}}
					max="60"
					type="number"
					value={addZero(second)}
					ref={secondRef}
				/>
				.
				<input
					onChange={() => {
						parseInt(hourRef.current!.value) <= 0 &&
						parseInt(minuteRef.current!.value) <= 0 &&
						parseInt(secondRef.current!.value) <= 0 &&
						parseInt(hundredthRef.current!.value) < 0
							? (hundredthRef.current!.value = '00')
							: null;
						updateTimerTime();
					}}
					value={addZero(hundredth)}
					max="100"
					type="number"
					ref={hundredthRef}
				/>
			</p>
			<button onClick={toggle} className="button">
				{isActive ? 'Pause' : 'Start'}
			</button>
			<button onClick={reset} className="button">
				Reset
			</button>
		</>
	);
}

function addZero(num: number) {
	return num < 10 && num >= 0 ? '0' + num : num;
}

function splitTime(time: number) {
	const hours = Math.floor(time / 100 / 3600);
	const minutes = Math.floor(((time / 100) % 3600) / 60);
	const seconds = Math.floor((time / 100) % 60);
	const hundredths = Math.floor(time % 100);
	return [hours, minutes, seconds, hundredths];
}
