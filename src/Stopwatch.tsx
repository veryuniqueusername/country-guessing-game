import { useState, useRef, useEffect } from 'preact/hooks';

export default function Stopwatch() {
	const [time, setTime] = useState(0);
	const [isActive, setActive] = useState(false);
	const countRef = useRef(0);

	useEffect(() => {
		if (isActive) {
			countRef.current = setInterval(() => {
				setTime((time) => time + 1);
			}, 10);
		} else if (!isActive && countRef.current) {
			clearInterval(countRef.current);
		}
	}, [isActive]);

	function toggle() {
		setActive(!isActive);
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

function formatTime(time: number) {
	// format hundredths of a second to hh:mm:ss.ll as a string
	const hours = Math.floor(time / 100 / 3600);
	const minutes = Math.floor(((time / 100) % 3600) / 60);
	const seconds = Math.floor((time / 100) % 60);
	const hundredths = Math.floor(time % 100);
	return `${hours < 10 ? `0${hours}` : hours}:${
		minutes < 10 ? `0${minutes}` : minutes
	}:${seconds < 10 ? `0${seconds}` : seconds}.${
		hundredths < 10 ? `0${hundredths}` : hundredths
	}`;
}
