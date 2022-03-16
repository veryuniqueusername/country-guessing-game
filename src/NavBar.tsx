import { Link } from 'preact-router';
import { useState, useEffect } from 'preact/hooks';
import { IoStopwatchOutline, IoTimerOutline } from 'react-icons/io5';

export default function NavBar() {
	const [dateTime, setDateTime] = useState(new Date());

	useEffect(() => {
		setInterval(() => {
			setDateTime(new Date());
		}, 1000);
	}, []);

	return (
		<>
			<div className="NavBar">
				<a href="/stopwatch" className="link">
					<IoStopwatchOutline />
				</a>
				<p className="realTime">
					{dateTime.toLocaleTimeString([], { hour12: false })}
				</p>
				<a href="/timer" className="link">
					<IoTimerOutline />
				</a>
			</div>
		</>
	);
}
