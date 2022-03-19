import { useState, useRef, useEffect } from 'preact/hooks';

export default function Stopwatch() {
	const [time, setTime] = useState(
		localStorage.getItem('stopwatchActive') === 'true'
			? (Date.now() -
					parseInt(localStorage.getItem('stopwatchStartTime') || '0')) /
					10
			: parseInt(localStorage.getItem('stopwatchTime') || '0')
	);
	const [isActive, setActive] = useState(
		localStorage.getItem('stopwatchActive') === 'true'
	);
	const countRef = useRef(0);

	localStorage.setItem('stopwatchTime', time.toString());
	localStorage.setItem('stopwatchActive', isActive.toString());

	useEffect(() => {
		if (isActive) {
			countRef.current = setInterval(() => {
				setTime(
					() =>
						(Date.now() -
							parseInt(
								localStorage.getItem('stopwatchStartTime') ||
									Date.now().toString()
							)) /
						10
				);
			}, 10);
		} else if (!isActive && countRef.current) {
			clearInterval(countRef.current);
		}
		return () => {
			clearInterval(countRef.current);
		};
	}, [isActive]);

	function toggle() {
		if (isActive) pause();
		else start();
	}

	function start() {
		setActive(true);
		localStorage.setItem(
			'stopwatchStartTime',
			(Date.now() - time * 10).toString()
		);
	}

	function pause() {
		setActive(false);
	}

	function reset() {
		setActive(false);
		setTime(-1);
	}

	if (time < 0) {
		setTime(0);
	}

	return (
		<>
			<p className="time">{formatTime(time)}</p>
			<button
				onClick={toggle}
				className={`button ${isActive ? 'activeButton' : ''}`}
			>
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

function formatTime(time: number) {
	// format hundredths of a second to hh:mm:ss.ll as a string
	const hours = Math.floor(time / 100 / 3600);
	const minutes = Math.floor(((time / 100) % 3600) / 60);
	const seconds = Math.floor((time / 100) % 60);
	const hundredths = Math.floor(time % 100);
	return `${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}.${addZero(
		hundredths
	)}`;
}
