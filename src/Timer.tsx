import { useEffect, useRef, useState } from 'preact/hooks';

export default function Timer() {
	const [time, setTime] = useState(
		Math.max(
			0,
			localStorage.getItem('timerActive') === 'true'
				? parseInt(localStorage.getItem('timerTime') || '0') -
						(Date.now() -
							parseInt(localStorage.getItem('timerDateTime') || '0')) /
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
	if (minute < 0) {
		setMinute(0);
	}
	if (second < 0) {
		setSecond(0);
	}
	if (hundredth < 0) {
		setHundredth(0);
	}

	if (time < 0) {
		setActive(false);
		setTime(0);
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
		localStorage.setItem('timerDateTime', Date.now().toString());
		localStorage.setItem('timerActive', isActive.toString());
	}

	function toggle() {
		setActive(!isActive);
	}

	function reset() {
		setActive(false);
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
				setTime(
					(time) =>
						time -
						(Date.now() - parseInt(localStorage.getItem('timerDateTime')!)) / 10
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
		setTime(hour * 360000 + minute * 6000 + second * 100 + hundredth);
		localStorage.setItem('timerTime', time.toString());
	}

	return (
		<>
			<p className="time">
				<input
					onChange={() => {
						setHour(
							hourRef.current
								? parseInt(hourRef.current.value)
									? parseInt(hourRef.current.value)
									: 0
								: 0
						);
						updateTimerTime();
					}}
					max="999"
					type="number"
					value={hour}
					ref={hourRef}
					size={53}
					style={{
						width: `${hourRef.current?.value.length || 1}.5ch`,
					}}
				/>
				:
				<input
					onChange={() => {
						setMinute(
							minuteRef.current
								? parseInt(minuteRef.current.value)
									? parseInt(minuteRef.current.value)
									: 0
								: 0
						);
						updateTimerTime();
					}}
					max="59"
					type="number"
					value={addZero(minute) || '00'}
					ref={minuteRef}
				/>
				:
				<input
					onChange={() => {
						setSecond(
							secondRef.current
								? parseInt(secondRef.current.value)
									? parseInt(secondRef.current.value)
									: 0
								: 0
						);
						updateTimerTime();
					}}
					max="59"
					type="number"
					value={addZero(second)}
					ref={secondRef}
				/>
				.
				<input
					onChange={() => {
						setHundredth(
							hundredthRef.current
								? parseInt(hundredthRef.current.value)
									? parseInt(hundredthRef.current.value)
									: 0
								: 0
						);
						updateTimerTime();
					}}
					value={addZero(hundredth)}
					max="99"
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
	return num < 10 ? '0' + num : num;
}
