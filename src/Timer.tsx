import { useEffect, useRef, useState } from 'preact/hooks';

export default function Timer() {
	const [time, setTime] = useState(461);
	const [hour, setHour] = useState(1);
	const [minute, setMinute] = useState(23);
	const [second, setSecond] = useState(45);
	const [hundredth, setHundredth] = useState(67);
	const [isActive, setActive] = useState(false);
	const countRef = useRef(0);

	const hourRef = useRef<HTMLInputElement>(null);
	const minuteRef = useRef<HTMLInputElement>(null);
	const secondRef = useRef<HTMLInputElement>(null);
	const hundredthRef = useRef<HTMLInputElement>(null);

	if (!isActive) {
		setTime(hour * 360000 + minute * 6000 + second * 100 + hundredth);
	} else {
		setHour(Math.floor(time / 360000));
		setMinute(Math.floor((time / 6000) % 60));
		setSecond(Math.floor((time / 100) % 60));
		setHundredth(Math.floor(time % 100));
	}

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
			<p className="time">
				<input
					onChange={() =>
						setHour(hourRef.current ? parseInt(hourRef.current.value) : 0)
					}
					max="99"
					type="number"
					value={hour}
				/>
				:
				<input
					onChange={() => setMinute(minuteRef.current.value)}
					max="59"
					type="number"
					value={minute}
				/>
				:
				<input
					onChange={() => setSecond(secondRef.current.value)}
					max="59"
					type="number"
					value={second}
				/>
				.
				<input
					onChange={() => setHundredth(hundredthRef.current.value)}
					value={hundredth}
					max="99"
					maxLength={2}
					type="number"
					ref={hundredthRef}
				/>
			</p>
			<button onClick={toggle} className="button">
				{isActive ? 'Pause' : 'Start'}
			</button>
		</>
	);
}
