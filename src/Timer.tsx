import { useEffect, useRef, useState } from 'preact/hooks';

export default function Timer() {
	const [time, setTime] = useState(461);
	const [hour, setHour] = useState(1);
	const [minute, setMinute] = useState(23);
	const [second, setSecond] = useState(45);
	const [hundredth, setHundredth] = useState(67);
	const [isActive, setActive] = useState(false);
	const countRef = useRef(0);

	// setTime(hour * 360000 + minute * 6000 + second * 100 + hundredth);

	function toggle() {
		setActive(!isActive);
	}

	useEffect(() => {
		if (isActive) {
			countRef.current = setInterval(() => {
				setTime((time) => time - 1);
			}, 10);
		} else if (!isActive && countRef.current) {
			clearInterval(countRef.current);
		}
	}, [isActive]);

	if (time < 0) {
		setActive(false);
		setTime(0);
	}

	return (
		<>
			<p className="time">{formatTime(time)}</p>
			<button onClick={toggle} className="button">
				{isActive ? 'Pause' : 'Start'}
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
