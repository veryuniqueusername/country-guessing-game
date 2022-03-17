import { useState, useEffect } from 'preact/hooks';
import StopwatchIcon from 'mdi-preact/TimerOutlineIcon';
import TimerIcon from 'mdi-preact/AvTimerIcon';

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
					<StopwatchIcon size="1em" />
				</a>
				<p className="realTime">
					{dateTime.toLocaleTimeString([], { hour12: false })}
				</p>
				<a href="/timer" className="link">
					<TimerIcon size="1em" />
				</a>
			</div>
		</>
	);
}
